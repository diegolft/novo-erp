import { CreateLogData } from '../entities/Log';

export interface ILogService {
  logUserAction(logData: CreateLogData): Promise<void>;
}
