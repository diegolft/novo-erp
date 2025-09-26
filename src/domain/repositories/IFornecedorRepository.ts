import { Fornecedor, CreateFornecedorData, UpdateFornecedorData } from '../entities/Fornecedor';

export interface IFornecedorRepository {
  create(fornecedorData: CreateFornecedorData): Promise<Fornecedor>;
  findAll(): Promise<Fornecedor[]>;
  findById(id: number): Promise<Fornecedor | null>;
  findByEmpresa(empresa: string): Promise<Fornecedor[]>;
  findByFornecedor(fornecedor: string): Promise<Fornecedor[]>;
  findByComprador(comprador: string): Promise<Fornecedor[]>;
  update(id: number, fornecedorData: UpdateFornecedorData): Promise<Fornecedor>;
  delete(id: number): Promise<void>;
}
