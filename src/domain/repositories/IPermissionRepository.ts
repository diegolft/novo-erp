import { Permission, UserPermission, CreatePermissionData, AssignPermissionData } from '../entities/Permission';

export interface IPermissionRepository {
  create(permissionData: CreatePermissionData): Promise<Permission>;
  findById(id: string): Promise<Permission | null>;
  findByName(nome: string): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
  
  assignToUser(assignData: AssignPermissionData): Promise<UserPermission>;
  removeFromUser(usuarioId: string, permissaoId: string): Promise<void>;
  getUserPermissions(usuarioId: string): Promise<Permission[]>;
  hasPermission(usuarioId: string, permissionName: string): Promise<boolean>;
}
