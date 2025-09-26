export interface Fornecedor {
  id: number;
  empresa: string;
  fornecedor: string;
  origem: string;
  comprador: string;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CreateFornecedorData {
  empresa: string;
  fornecedor: string;
  origem: string;
  comprador: string;
}

export interface UpdateFornecedorData {
  empresa?: string;
  fornecedor?: string;
  origem?: string;
  comprador?: string;
}
