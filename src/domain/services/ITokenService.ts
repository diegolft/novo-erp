import { AuthToken } from '../entities/Auth';

export interface ITokenService {
  generateToken(payload: { userId: string; usuario: string }): AuthToken;
  verifyToken(token: string): { userId: string; usuario: string } | null;
}
