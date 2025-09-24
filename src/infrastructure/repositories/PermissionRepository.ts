import { eq, and } from 'drizzle-orm';
import { db } from '../database/connection';
import { permissions, userPermissions } from '../database/schema';
import { IPermissionRepository } from '../../domain/repositories/IPermissionRepository';
import { Permission, UserPermission, CreatePermissionData, AssignPermissionData } from '../../domain/entities/Permission';

export class PermissionRepository implements IPermissionRepository {
  async create(permissionData: CreatePermissionData): Promise<Permission> {
    const [permission] = await db.insert(permissions).values({
      nome: permissionData.nome,
      descricao: permissionData.descricao
    }).returning();

    if (!permission) {
      throw new Error('Falha ao criar permissão');
    }

    return {
      id: permission.id,
      nome: permission.nome,
      descricao: permission.descricao,
      ativo: permission.ativo,
      criadoEm: permission.criadoEm
    };
  }

  async findById(id: string): Promise<Permission | null> {
    const [permission] = await db.select().from(permissions).where(eq(permissions.id, id));
    
    if (!permission) return null;

    return {
      id: permission.id,
      nome: permission.nome,
      descricao: permission.descricao,
      ativo: permission.ativo,
      criadoEm: permission.criadoEm
    };
  }

  async findByName(nome: string): Promise<Permission | null> {
    const [permission] = await db.select().from(permissions).where(eq(permissions.nome, nome));
    
    if (!permission) return null;

    return {
      id: permission.id,
      nome: permission.nome,
      descricao: permission.descricao,
      ativo: permission.ativo,
      criadoEm: permission.criadoEm
    };
  }

  async findAll(): Promise<Permission[]> {
    const permissionsList = await db.select().from(permissions);

    return permissionsList.map(permission => ({
      id: permission.id,
      nome: permission.nome,
      descricao: permission.descricao,
      ativo: permission.ativo,
      criadoEm: permission.criadoEm
    }));
  }

  async assignToUser(assignData: AssignPermissionData): Promise<UserPermission> {
    const [userPermission] = await db.insert(userPermissions).values({
      usuarioId: assignData.usuarioId,
      permissaoId: assignData.permissaoId
    }).returning();

    if (!userPermission) {
      throw new Error('Falha ao atribuir permissão');
    }

    return {
      id: userPermission.id,
      usuarioId: userPermission.usuarioId,
      permissaoId: userPermission.permissaoId,
      ativo: userPermission.ativo,
      criadoEm: userPermission.criadoEm
    };
  }

  async removeFromUser(usuarioId: string, permissaoId: string): Promise<void> {
    await db.delete(userPermissions).where(
      and(
        eq(userPermissions.usuarioId, usuarioId),
        eq(userPermissions.permissaoId, permissaoId)
      )
    );
  }

  async getUserPermissions(usuarioId: string): Promise<Permission[]> {
    const result = await db.select({
      id: permissions.id,
      nome: permissions.nome,
      descricao: permissions.descricao,
      ativo: permissions.ativo,
      criadoEm: permissions.criadoEm
    })
    .from(permissions)
    .innerJoin(userPermissions, eq(permissions.id, userPermissions.permissaoId))
    .where(
      and(
        eq(userPermissions.usuarioId, usuarioId),
        eq(userPermissions.ativo, true),
        eq(permissions.ativo, true)
      )
    );

    return result.map(permission => ({
      id: permission.id,
      nome: permission.nome,
      descricao: permission.descricao,
      ativo: permission.ativo,
      criadoEm: permission.criadoEm
    }));
  }

  async hasPermission(usuarioId: string, permissionName: string): Promise<boolean> {
    const result = await db.select()
      .from(permissions)
      .innerJoin(userPermissions, eq(permissions.id, userPermissions.permissaoId))
      .where(
        and(
          eq(userPermissions.usuarioId, usuarioId),
          eq(permissions.nome, permissionName),
          eq(userPermissions.ativo, true),
          eq(permissions.ativo, true)
        )
      )
      .limit(1);

    return result.length > 0;
  }
}
