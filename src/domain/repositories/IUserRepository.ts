import { User, CreateUserData } from '../entities/User';

export interface IUserRepository {
  create(userData: CreateUserData): Promise<User>;
  findByUsuario(usuario: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, userData: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
