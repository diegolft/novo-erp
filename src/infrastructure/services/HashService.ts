import bcrypt from 'bcrypt';
import { IHashService } from '../../domain/services/IHashService';

export class HashService implements IHashService {
  private readonly saltRounds = 12;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
