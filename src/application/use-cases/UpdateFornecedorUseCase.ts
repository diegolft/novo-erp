import { IFornecedorRepository } from '../../domain/repositories/IFornecedorRepository';
import { ILogService } from '../../domain/services/ILogService';
import { UpdateFornecedorData, Fornecedor } from '../../domain/entities/Fornecedor';
import { CreateLogData } from '../../domain/entities/Log';

export class UpdateFornecedorUseCase {
  constructor(
    private fornecedorRepository: IFornecedorRepository,
    private logService: ILogService
  ) {}

  async execute(id: number, fornecedorData: UpdateFornecedorData, usuarioId: string, ip?: string, userAgent?: string): Promise<Fornecedor> {
    // Verificar se fornecedor existe
    const existingFornecedor = await this.fornecedorRepository.findById(id);
    if (!existingFornecedor) {
      throw new Error('Fornecedor não encontrado');
    }

    // Atualizar fornecedor
    const fornecedor = await this.fornecedorRepository.update(id, fornecedorData);

    // Log da ação
    const logData: CreateLogData = {
      usuarioId,
      acao: 'FORNECEDOR_UPDATED',
      detalhes: `Fornecedor ${fornecedor.fornecedor} (ID: ${id}) foi atualizado`,
      ip: ip || null,
      userAgent: userAgent || null
    };

    await this.logService.logUserAction(logData);

    return fornecedor;
  }
}
