import { eq, and, like, sql } from 'drizzle-orm';
import { db } from '../database/connection';
import { fornecedores } from '../database/schema';
import { IFornecedorRepository } from '../../domain/repositories/IFornecedorRepository';
import { Fornecedor, CreateFornecedorData, UpdateFornecedorData } from '../../domain/entities/Fornecedor';

export class FornecedorRepository implements IFornecedorRepository {
  async create(fornecedorData: CreateFornecedorData): Promise<Fornecedor> {
    const [fornecedor] = await db.insert(fornecedores).values({
      empresa: fornecedorData.empresa,
      fornecedor: fornecedorData.fornecedor,
      origem: fornecedorData.origem,
      comprador: fornecedorData.comprador
    }).returning();

    if (!fornecedor) {
      throw new Error('Falha ao criar fornecedor');
    }

    return {
      id: fornecedor.id,
      empresa: fornecedor.empresa,
      fornecedor: fornecedor.fornecedor,
      origem: fornecedor.origem,
      comprador: fornecedor.comprador,
      criadoEm: fornecedor.criadoEm,
      atualizadoEm: fornecedor.atualizadoEm
    };
  }

  async findAll(): Promise<Fornecedor[]> {
    const result = await db.select().from(fornecedores);
    
    return result.map(fornecedor => ({
      id: fornecedor.id,
      empresa: fornecedor.empresa,
      fornecedor: fornecedor.fornecedor,
      origem: fornecedor.origem,
      comprador: fornecedor.comprador,
      criadoEm: fornecedor.criadoEm,
      atualizadoEm: fornecedor.atualizadoEm
    }));
  }

  async findById(id: number): Promise<Fornecedor | null> {
    const [fornecedor] = await db.select().from(fornecedores).where(eq(fornecedores.id, id));
    
    if (!fornecedor) return null;

    return {
      id: fornecedor.id,
      empresa: fornecedor.empresa,
      fornecedor: fornecedor.fornecedor,
      origem: fornecedor.origem,
      comprador: fornecedor.comprador,
      criadoEm: fornecedor.criadoEm,
      atualizadoEm: fornecedor.atualizadoEm
    };
  }

  async findByEmpresa(empresa: string): Promise<Fornecedor[]> {
    const result = await db.select()
      .from(fornecedores)
      .where(like(fornecedores.empresa, `%${empresa}%`));
    
    return result.map(fornecedor => ({
      id: fornecedor.id,
      empresa: fornecedor.empresa,
      fornecedor: fornecedor.fornecedor,
      origem: fornecedor.origem,
      comprador: fornecedor.comprador,
      criadoEm: fornecedor.criadoEm,
      atualizadoEm: fornecedor.atualizadoEm
    }));
  }

  async findByFornecedor(fornecedor: string): Promise<Fornecedor[]> {
    const result = await db.select()
      .from(fornecedores)
      .where(like(fornecedores.fornecedor, `%${fornecedor}%`));
    
    return result.map(fornecedor => ({
      id: fornecedor.id,
      empresa: fornecedor.empresa,
      fornecedor: fornecedor.fornecedor,
      origem: fornecedor.origem,
      comprador: fornecedor.comprador,
      criadoEm: fornecedor.criadoEm,
      atualizadoEm: fornecedor.atualizadoEm
    }));
  }

  async findByComprador(comprador: string): Promise<Fornecedor[]> {
    const result = await db.select()
      .from(fornecedores)
      .where(like(fornecedores.comprador, `%${comprador}%`));
    
    return result.map(fornecedor => ({
      id: fornecedor.id,
      empresa: fornecedor.empresa,
      fornecedor: fornecedor.fornecedor,
      origem: fornecedor.origem,
      comprador: fornecedor.comprador,
      criadoEm: fornecedor.criadoEm,
      atualizadoEm: fornecedor.atualizadoEm
    }));
  }

  async update(id: number, fornecedorData: UpdateFornecedorData): Promise<Fornecedor> {
    // Verificar se o fornecedor existe primeiro
    const existingFornecedor = await db.select().from(fornecedores).where(eq(fornecedores.id, id));

    if (existingFornecedor.length === 0) {
      throw new Error('Fornecedor não encontrado');
    }

    // Construir objeto de atualização apenas com campos definidos
    const updateData: any = {};

    if (fornecedorData.empresa !== undefined && fornecedorData.empresa !== null) {
      updateData.empresa = fornecedorData.empresa;
    }
    if (fornecedorData.fornecedor !== undefined && fornecedorData.fornecedor !== null) {
      updateData.fornecedor = fornecedorData.fornecedor;
    }
    if (fornecedorData.origem !== undefined && fornecedorData.origem !== null) {
      updateData.origem = fornecedorData.origem;
    }
    if (fornecedorData.comprador !== undefined && fornecedorData.comprador !== null) {
      updateData.comprador = fornecedorData.comprador;
    }

    // Sempre atualizar o timestamp
    updateData.atualizadoEm = new Date();

    // Se não há campos para atualizar além do timestamp, retornar o existente
    if (Object.keys(updateData).length === 1 && updateData.atualizadoEm) {
      const existing = existingFornecedor[0];
      if (!existing) {
        throw new Error('Fornecedor não encontrado');
      }
      return {
        id: existing.id,
        empresa: existing.empresa,
        fornecedor: existing.fornecedor,
        origem: existing.origem,
        comprador: existing.comprador,
        criadoEm: existing.criadoEm,
        atualizadoEm: new Date()
      };
    }

    try {
      const [fornecedor] = await db.update(fornecedores)
        .set(updateData)
        .where(eq(fornecedores.id, id))
        .returning();

      if (!fornecedor) {
        throw new Error('Fornecedor não encontrado');
      }

      return {
        id: fornecedor.id,
        empresa: fornecedor.empresa,
        fornecedor: fornecedor.fornecedor,
        origem: fornecedor.origem,
        comprador: fornecedor.comprador,
        criadoEm: fornecedor.criadoEm,
        atualizadoEm: fornecedor.atualizadoEm
      };
    } catch (error) {
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    await db.delete(fornecedores).where(eq(fornecedores.id, id));
  }
}
