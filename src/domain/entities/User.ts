export interface User {
  id: string;
  usuario: string;
  nome: string;
  email: string;
  senhaHash: string;
  ativo: boolean;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CreateUserData {
  usuario: string;
  nome: string;
  email: string;
  senha: string;
}

export interface UserLoginData {
  usuario: string;
  senha: string;
}
