import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { IHashService } from '../../domain/services/IHashService';
import { ILogService } from '../../domain/services/ILogService';
import { CreateUserData, User } from '../../domain/entities/User';
import { CreateLogData } from '../../domain/entities/Log';

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: IHashService,
    private logService: ILogService
  ) {}

  async execute(userData: CreateUserData, ip?: string, userAgent?: string): Promise<User> {
    // Verificar se usuário já existe
    const existingUser = await this.userRepository.findByUsuario(userData.usuario);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    // Verificar se email já existe
    const existingEmail = await this.userRepository.findByEmail(userData.email);
    if (existingEmail) {
      throw new Error('Email já cadastrado');
    }

    // Hash da senha
    const senhaHash = await this.hashService.hash(userData.senha);

    // Criar usuário
    const user = await this.userRepository.create({
      ...userData,
      senha: senhaHash
    });

    // Log da ação
    const logData: CreateLogData = {
      usuarioId: user.id,
      acao: 'USER_REGISTERED',
      detalhes: `Usuário ${userData.usuario} foi registrado`,
      ip: ip || null,
      userAgent: userAgent || null
    };

    await this.logService.logUserAction(logData);

    return user;
  }
}
