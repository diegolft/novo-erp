import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './AuthMiddleware';
import { IPermissionRepository } from '../../domain/repositories/IPermissionRepository';
import { PermissionRepository } from '../../infrastructure/repositories/PermissionRepository';

export class AclMiddleware {
  private permissionRepository: IPermissionRepository;

  constructor() {
    this.permissionRepository = new PermissionRepository();
  }

  requirePermission = (permissionName: string) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      try {
        const hasPermission = await this.permissionRepository.hasPermission(
          req.user.userId,
          permissionName
        );

        if (!hasPermission) {
          res.status(403).json({ 
            error: 'Acesso negado',
            message: `Permissão '${permissionName}' é necessária`
          });
          return;
        }

        next();
      } catch (error) {
        console.error('Erro ao verificar permissão:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
      }
    };
  };
}
