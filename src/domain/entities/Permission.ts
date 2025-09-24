export interface Permission {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
  criadoEm: Date;
}

export interface UserPermission {
  id: string;
  usuarioId: string;
  permissaoId: string;
  ativo: boolean;
  criadoEm: Date;
}

export interface CreatePermissionData {
  nome: string;
  descricao: string;
}

export interface AssignPermissionData {
  usuarioId: string;
  permissaoId: string;
}
