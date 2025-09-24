import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IHashService } from '../../domain/services/IHashService';
import { ITokenService } from '../../domain/services/ITokenService';
import { ILogService } from '../../domain/services/ILogService';
import { UserLoginData, User } from '../../domain/entities/User';
import { AuthResult } from '../../domain/entities/Auth';
import { CreateLogData } from '../../domain/entities/Log';

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private tokenService: ITokenService,
    private logService: ILogService
  ) {}

  async execute(loginData: UserLoginData, ip?: string, userAgent?: string): Promise<AuthResult> {
    // Buscar usuário
    const user = await this.userRepository.findByUsuario(loginData.usuario);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    if (!user.ativo) {
      throw new Error('Usuário inativo');
    }

    // Verificar senha
    const isValidPassword = await this.hashService.compare(loginData.senha, user.senhaHash);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token
    const tokenData = this.tokenService.generateToken({
      userId: user.id,
      usuario: user.usuario
    });

    // Log da ação
    const logData: CreateLogData = {
      usuarioId: user.id,
      acao: 'USER_LOGIN',
      detalhes: `Usuário ${user.usuario} fez login`,
      ip: ip || null,
      userAgent: userAgent || null
    };

    await this.logService.logUserAction(logData);

    return {
      user: {
        id: user.id,
        usuario: user.usuario,
        nome: user.nome,
        email: user.email
      },
      token: tokenData.token,
      expiresIn: tokenData.expiresIn
    };
  }
}
