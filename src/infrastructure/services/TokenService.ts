import jwt from 'jsonwebtoken';
import { ITokenService } from '../../domain/services/ITokenService';
import { AuthToken } from '../../domain/entities/Auth';

export class TokenService implements ITokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET!;
    this.expiresIn = process.env.JWT_EXPIRES_IN || '24h';

    if (!this.secret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
  }

  generateToken(payload: { userId: string; usuario: string }): AuthToken {
    const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn } as jwt.SignOptions);
    
    return {
      token,
      expiresIn: this.expiresIn
    };
  }

  verifyToken(token: string): { userId: string; usuario: string } | null {
    try {
      const decoded = jwt.verify(token, this.secret) as { userId: string; usuario: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }
}
