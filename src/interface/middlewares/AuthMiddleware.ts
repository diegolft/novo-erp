import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../../infrastructure/services/TokenService';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    userId: string;
    usuario: string;
  };
}

export class AuthMiddleware {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token de acesso é obrigatório' });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = this.tokenService.verifyToken(token);

    if (!decoded) {
      res.status(401).json({ error: 'Token inválido ou expirado' });
      return;
    }

    req.user = {
      id: decoded.userId,
      userId: decoded.userId,
      usuario: decoded.usuario
    };
    next();
  };
}
