import { Request, Response, NextFunction } from 'express';
import { LogUserActionUseCase } from '../../application/use-cases/LogUserActionUseCase';
import { LogService } from '../../infrastructure/services/LogService';
import { LogRepository } from '../../infrastructure/repositories/LogRepository';

export class LoggingMiddleware {
  private logUserActionUseCase: LogUserActionUseCase;

  constructor() {
    const logRepository = new LogRepository();
    const logService = new LogService(logRepository);
    this.logUserActionUseCase = new LogUserActionUseCase(logService);
  }

  logRequest = (action: string) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const originalSend = res.send;
      const startTime = Date.now();

      res.send = function(body: any) {
        const duration = Date.now() - startTime;
        
        // Log da requisição (assíncrono, não bloqueia a resposta)
        setImmediate(async () => {
          try {
            const userId = (req as any).user?.userId;
            if (userId) {
              await new LoggingMiddleware().logUserActionUseCase.execute({
                usuarioId: userId,
                acao: action,
                detalhes: JSON.stringify({
                  method: req.method,
                  url: req.url,
                  statusCode: res.statusCode,
                  duration: `${duration}ms`,
                  body: req.body ? Object.keys(req.body) : undefined
                }),
                ip: req.ip || req.connection.remoteAddress || null,
                userAgent: req.get('User-Agent') || null
              });
            }
          } catch (error) {
            console.error('Erro ao registrar log:', error);
          }
        });

        return originalSend.call(this, body);
      };

      next();
    };
  };
}
