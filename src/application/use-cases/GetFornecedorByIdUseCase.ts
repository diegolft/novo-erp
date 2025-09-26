import { IFornecedorRepository } from '../../domain/repositories/IFornecedorRepository';
import { Fornecedor } from '../../domain/entities/Fornecedor';

export class GetFornecedorByIdUseCase {
  constructor(
    private fornecedorRepository: IFornecedorRepository
  ) {}

  async execute(id: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findById(id);
    
    if (!fornecedor) {
      throw new Error('Fornecedor não encontrado');
    }

    return fornecedor;
  }
}
