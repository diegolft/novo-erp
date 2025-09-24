export interface Log {
  id: string;
  usuarioId: string;
  acao: string;
  detalhes?: string | null;
  ip?: string | null;
  userAgent?: string | null;
  criadoEm: Date;
}

export interface CreateLogData {
  usuarioId: string;
  acao: string;
  detalhes?: string | null;
  ip?: string | null;
  userAgent?: string | null;
}
