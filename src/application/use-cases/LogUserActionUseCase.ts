import { ILogService } from '../../domain/services/ILogService';
import { CreateLogData } from '../../domain/entities/Log';

export class LogUserActionUseCase {
  constructor(private logService: ILogService) {}

  async execute(logData: CreateLogData): Promise<void> {
    await this.logService.logUserAction(logData);
  }
}
