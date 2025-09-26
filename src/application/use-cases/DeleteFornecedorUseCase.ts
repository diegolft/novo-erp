import { IFornecedorRepository } from '../../domain/repositories/IFornecedorRepository';
import { ILogService } from '../../domain/services/ILogService';
import { CreateLogData } from '../../domain/entities/Log';

export class DeleteFornecedorUseCase {
  constructor(
    private fornecedorRepository: IFornecedorRepository,
    private logService: ILogService
  ) {}

  async execute(id: number, usuarioId: string, ip?: string, userAgent?: string): Promise<void> {
    // Verificar se fornecedor existe
    const existingFornecedor = await this.fornecedorRepository.findById(id);
    if (!existingFornecedor) {
      throw new Error('Fornecedor não encontrado');
    }

    // Deletar fornecedor
    await this.fornecedorRepository.delete(id);

    // Log da ação
    const logData: CreateLogData = {
      usuarioId,
      acao: 'FORNECEDOR_DELETED',
      detalhes: `Fornecedor ${existingFornecedor.fornecedor} (ID: ${id}) foi deletado`,
      ip: ip || null,
      userAgent: userAgent || null
    };

    await this.logService.logUserAction(logData);
  }
}
