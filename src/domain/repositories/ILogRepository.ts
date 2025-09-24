import { Log, CreateLogData } from '../entities/Log';

export interface ILogRepository {
  create(logData: CreateLogData): Promise<Log>;
  findByUsuarioId(usuarioId: string): Promise<Log[]>;
  findById(id: string): Promise<Log | null>;
  findAll(limit?: number, offset?: number): Promise<Log[]>;
}
