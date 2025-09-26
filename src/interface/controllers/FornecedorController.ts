import { Request, Response } from 'express';
import { CreateFornecedorUseCase } from '../../application/use-cases/CreateFornecedorUseCase';
import { GetFornecedoresUseCase } from '../../application/use-cases/GetFornecedoresUseCase';
import { GetFornecedorByIdUseCase } from '../../application/use-cases/GetFornecedorByIdUseCase';
import { UpdateFornecedorUseCase } from '../../application/use-cases/UpdateFornecedorUseCase';
import { DeleteFornecedorUseCase } from '../../application/use-cases/DeleteFornecedorUseCase';
import { CreateFornecedorData, UpdateFornecedorData } from '../../domain/entities/Fornecedor';
import { FornecedorRepository } from '../../infrastructure/repositories/FornecedorRepository';
import { LogRepository } from '../../infrastructure/repositories/LogRepository';
import { LogService } from '../../infrastructure/services/LogService';

export class FornecedorController {
  private createFornecedorUseCase: CreateFornecedorUseCase;
  private getFornecedoresUseCase: GetFornecedoresUseCase;
  private getFornecedorByIdUseCase: GetFornecedorByIdUseCase;
  private updateFornecedorUseCase: UpdateFornecedorUseCase;
  private deleteFornecedorUseCase: DeleteFornecedorUseCase;

  constructor() {
    // Inicializar dependências
    const fornecedorRepository = new FornecedorRepository();
    const logRepository = new LogRepository();
    const logService = new LogService(logRepository);

    // Inicializar use cases
    this.createFornecedorUseCase = new CreateFornecedorUseCase(
      fornecedorRepository,
      logService
    );

    this.getFornecedoresUseCase = new GetFornecedoresUseCase(
      fornecedorRepository
    );

    this.getFornecedorByIdUseCase = new GetFornecedorByIdUseCase(
      fornecedorRepository
    );

    this.updateFornecedorUseCase = new UpdateFornecedorUseCase(
      fornecedorRepository,
      logService
    );

    this.deleteFornecedorUseCase = new DeleteFornecedorUseCase(
      fornecedorRepository,
      logService
    );
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { empresa, fornecedor, origem, comprador }: CreateFornecedorData = req.body;

      // Validação básica
      if (!empresa || !fornecedor || !origem || !comprador) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');
      const usuarioId = (req as any).user?.id;

      if (!usuarioId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const fornecedorCreated = await this.createFornecedorUseCase.execute(
        { empresa, fornecedor, origem, comprador },
        usuarioId,
        ip,
        userAgent
      );

      res.status(201).json({
        message: 'Fornecedor criado com sucesso',
        fornecedor: fornecedorCreated
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const fornecedores = await this.getFornecedoresUseCase.execute();

      res.status(200).json({
        message: 'Fornecedores listados com sucesso',
        fornecedores
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(500).json({ error: message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'ID é obrigatório' });
        return;
      }

      const fornecedorId = parseInt(id);

      if (isNaN(fornecedorId)) {
        res.status(400).json({ error: 'ID deve ser um número válido' });
        return;
      }

      const fornecedor = await this.getFornecedorByIdUseCase.execute(fornecedorId);

      res.status(200).json({
        message: 'Fornecedor encontrado com sucesso',
        fornecedor
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(404).json({ error: message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'ID é obrigatório' });
        return;
      }

      const fornecedorId = parseInt(id);

      if (isNaN(fornecedorId)) {
        res.status(400).json({ error: 'ID deve ser um número válido' });
        return;
      }


      // Construir objeto de atualização apenas com campos presentes
      const updateData: UpdateFornecedorData = {};
      
      if (req.body.empresa !== undefined) {
        updateData.empresa = req.body.empresa;
      }
      if (req.body.fornecedor !== undefined) {
        updateData.fornecedor = req.body.fornecedor;
      }
      if (req.body.origem !== undefined) {
        updateData.origem = req.body.origem;
      }
      if (req.body.comprador !== undefined) {
        updateData.comprador = req.body.comprador;
      }


      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');
      const usuarioId = (req as any).user?.id;

      if (!usuarioId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const fornecedorUpdated = await this.updateFornecedorUseCase.execute(
        fornecedorId,
        updateData,
        usuarioId,
        ip,
        userAgent
      );


      res.status(200).json({
        message: 'Fornecedor atualizado com sucesso',
        fornecedor: fornecedorUpdated
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      
      if (!id) {
        res.status(400).json({ error: 'ID é obrigatório' });
        return;
      }

      const fornecedorId = parseInt(id);

      if (isNaN(fornecedorId)) {
        res.status(400).json({ error: 'ID deve ser um número válido' });
        return;
      }

      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');
      const usuarioId = (req as any).user?.id;

      if (!usuarioId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      await this.deleteFornecedorUseCase.execute(
        fornecedorId,
        usuarioId,
        ip,
        userAgent
      );

      res.status(200).json({
        message: 'Fornecedor deletado com sucesso'
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  };
}
