import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/AuthMiddleware';
import { PermissionRepository } from '../../infrastructure/repositories/PermissionRepository';
import { CreatePermissionData, AssignPermissionData } from '../../domain/entities/Permission';

export class PermissionController {
  private permissionRepository: PermissionRepository;

  constructor() {
    this.permissionRepository = new PermissionRepository();
  }

  createPermission = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, descricao }: CreatePermissionData = req.body;

      if (!nome || !descricao) {
        res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
        return;
      }

      const permission = await this.permissionRepository.create({ nome, descricao });

      res.status(201).json({
        message: 'Permissão criada com sucesso',
        permission
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  };

  assignPermission = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuarioId, permissaoId }: AssignPermissionData = req.body;

      if (!usuarioId || !permissaoId) {
        res.status(400).json({ error: 'ID do usuário e ID da permissão são obrigatórios' });
        return;
      }

      const userPermission = await this.permissionRepository.assignToUser({
        usuarioId,
        permissaoId
      });

      res.status(201).json({
        message: 'Permissão atribuída com sucesso',
        userPermission
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  };

  getUserPermissions = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const permissions = await this.permissionRepository.getUserPermissions(userId);

      res.status(200).json({
        permissions
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ error: message });
    }
  };

  getAllPermissions = async (req: Request, res: Response): Promise<void> => {
    try {
      const permissions = await this.permissionRepository.findAll();

      res.status(200).json({
        permissions
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ error: message });
    }
  };
}
