import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase';
import { CreateUserData, UserLoginData } from '../../domain/entities/User';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { LogRepository } from '../../infrastructure/repositories/LogRepository';
import { HashService } from '../../infrastructure/services/HashService';
import { TokenService } from '../../infrastructure/services/TokenService';
import { LogService } from '../../infrastructure/services/LogService';

export class AuthController {
  private registerUserUseCase: RegisterUserUseCase;
  private loginUserUseCase: LoginUserUseCase;

  constructor() {
    // Inicializar dependências
    const userRepository = new UserRepository();
    const logRepository = new LogRepository();
    const hashService = new HashService();
    const tokenService = new TokenService();
    const logService = new LogService(logRepository);

    // Inicializar use cases
    this.registerUserUseCase = new RegisterUserUseCase(
      userRepository,
      hashService,
      logService
    );

    this.loginUserUseCase = new LoginUserUseCase(
      userRepository,
      hashService,
      tokenService,
      logService
    );
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario, nome, email, senha }: CreateUserData = req.body;

      // Validação básica
      if (!usuario || !nome || !email || !senha) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
      }

      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');

      const user = await this.registerUserUseCase.execute(
        { usuario, nome, email, senha },
        ip,
        userAgent
      );

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          usuario: user.usuario,
          nome: user.nome,
          email: user.email
        }
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(400).json({ error: message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { usuario, senha }: UserLoginData = req.body;

      // Validação básica
      if (!usuario || !senha) {
        res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
        return;
      }

      const ip = req.ip || req.connection.remoteAddress;
      const userAgent = req.get('User-Agent');

      const result = await this.loginUserUseCase.execute(
        { usuario, senha },
        ip,
        userAgent
      );

      res.status(200).json({
        message: 'Login realizado com sucesso',
        ...result
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro interno do servidor';
      res.status(401).json({ error: message });
    }
  };
}
