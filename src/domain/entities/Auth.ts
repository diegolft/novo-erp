export interface AuthToken {
  token: string;
  expiresIn: string;
}

export interface AuthResult {
  user: {
    id: string;
    usuario: string;
    nome: string;
    email: string;
  };
  token: string;
  expiresIn: string;
}
