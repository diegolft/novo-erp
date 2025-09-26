import { IFornecedorRepository } from '../../domain/repositories/IFornecedorRepository';
import { ILogService } from '../../domain/services/ILogService';
import { CreateFornecedorData, Fornecedor } from '../../domain/entities/Fornecedor';
import { CreateLogData } from '../../domain/entities/Log';

export class CreateFornecedorUseCase {
  constructor(
    private fornecedorRepository: IFornecedorRepository,
    private logService: ILogService
  ) {}

  async execute(fornecedorData: CreateFornecedorData, usuarioId: string, ip?: string, userAgent?: string): Promise<Fornecedor> {
    // Criar fornecedor
    const fornecedor = await this.fornecedorRepository.create(fornecedorData);

    // Log da ação
    const logData: CreateLogData = {
      usuarioId,
      acao: 'FORNECEDOR_CREATED',
      detalhes: `Fornecedor ${fornecedorData.fornecedor} da empresa ${fornecedorData.empresa} foi criado`,
      ip: ip || null,
      userAgent: userAgent || null
    };

    await this.logService.logUserAction(logData);

    return fornecedor;
  }
}
