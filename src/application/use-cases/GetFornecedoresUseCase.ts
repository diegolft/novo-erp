import { IFornecedorRepository } from '../../domain/repositories/IFornecedorRepository';
import { Fornecedor } from '../../domain/entities/Fornecedor';

export class GetFornecedoresUseCase {
  constructor(
    private fornecedorRepository: IFornecedorRepository
  ) {}

  async execute(): Promise<Fornecedor[]> {
    return await this.fornecedorRepository.findAll();
  }
}
