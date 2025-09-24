import { ILogService } from '../../domain/services/ILogService';
import { ILogRepository } from '../../domain/repositories/ILogRepository';
import { CreateLogData } from '../../domain/entities/Log';

export class LogService implements ILogService {
  constructor(private logRepository: ILogRepository) {}

  async logUserAction(logData: CreateLogData): Promise<void> {
    await this.logRepository.create(logData);
  }
}
