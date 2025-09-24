import { eq, desc } from 'drizzle-orm';
import { db } from '../database/connection';
import { logs } from '../database/schema';
import { ILogRepository } from '../../domain/repositories/ILogRepository';
import { Log, CreateLogData } from '../../domain/entities/Log';

export class LogRepository implements ILogRepository {
  async create(logData: CreateLogData): Promise<Log> {
    const [log] = await db.insert(logs).values({
      usuarioId: logData.usuarioId,
      acao: logData.acao,
      detalhes: logData.detalhes,
      ip: logData.ip,
      userAgent: logData.userAgent
    }).returning();

    if (!log) {
      throw new Error('Falha ao criar log');
    }

    return {
      id: log.id,
      usuarioId: log.usuarioId,
      acao: log.acao,
      detalhes: log.detalhes,
      ip: log.ip,
      userAgent: log.userAgent,
      criadoEm: log.criadoEm
    };
  }

  async findByUsuarioId(usuarioId: string): Promise<Log[]> {
    const logsList = await db.select()
      .from(logs)
      .where(eq(logs.usuarioId, usuarioId))
      .orderBy(desc(logs.criadoEm));

    return logsList.map(log => ({
      id: log.id,
      usuarioId: log.usuarioId,
      acao: log.acao,
      detalhes: log.detalhes,
      ip: log.ip,
      userAgent: log.userAgent,
      criadoEm: log.criadoEm
    }));
  }

  async findById(id: string): Promise<Log | null> {
    const [log] = await db.select().from(logs).where(eq(logs.id, id));
    
    if (!log) return null;

    return {
      id: log.id,
      usuarioId: log.usuarioId,
      acao: log.acao,
      detalhes: log.detalhes,
      ip: log.ip,
      userAgent: log.userAgent,
      criadoEm: log.criadoEm
    };
  }

  async findAll(limit = 100, offset = 0): Promise<Log[]> {
    const logsList = await db.select()
      .from(logs)
      .orderBy(desc(logs.criadoEm))
      .limit(limit)
      .offset(offset);

    return logsList.map(log => ({
      id: log.id,
      usuarioId: log.usuarioId,
      acao: log.acao,
      detalhes: log.detalhes,
      ip: log.ip,
      userAgent: log.userAgent,
      criadoEm: log.criadoEm
    }));
  }
}
