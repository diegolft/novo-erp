import { eq, and } from 'drizzle-orm';
import { db } from '../database/connection';
import { users } from '../database/schema';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, CreateUserData } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
  async create(userData: CreateUserData): Promise<User> {
    const [user] = await db.insert(users).values({
      usuario: userData.usuario,
      nome: userData.nome,
      email: userData.email,
      senhaHash: userData.senha
    }).returning();

    if (!user) {
      throw new Error('Falha ao criar usuário');
    }

    return {
      id: user.id,
      usuario: user.usuario,
      nome: user.nome,
      email: user.email,
      senhaHash: user.senhaHash,
      ativo: user.ativo,
      criadoEm: user.criadoEm,
      atualizadoEm: user.atualizadoEm
    };
  }

  async findByUsuario(usuario: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.usuario, usuario));
    
    if (!user) return null;

    return {
      id: user.id,
      usuario: user.usuario,
      nome: user.nome,
      email: user.email,
      senhaHash: user.senhaHash,
      ativo: user.ativo,
      criadoEm: user.criadoEm,
      atualizadoEm: user.atualizadoEm
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) return null;

    return {
      id: user.id,
      usuario: user.usuario,
      nome: user.nome,
      email: user.email,
      senhaHash: user.senhaHash,
      ativo: user.ativo,
      criadoEm: user.criadoEm,
      atualizadoEm: user.atualizadoEm
    };
  }

  async findById(id: string): Promise<User | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    
    if (!user) return null;

    return {
      id: user.id,
      usuario: user.usuario,
      nome: user.nome,
      email: user.email,
      senhaHash: user.senhaHash,
      ativo: user.ativo,
      criadoEm: user.criadoEm,
      atualizadoEm: user.atualizadoEm
    };
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const [user] = await db.update(users)
      .set({
        ...userData,
        atualizadoEm: new Date()
      })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return {
      id: user.id,
      usuario: user.usuario,
      nome: user.nome,
      email: user.email,
      senhaHash: user.senhaHash,
      ativo: user.ativo,
      criadoEm: user.criadoEm,
      atualizadoEm: user.atualizadoEm
    };
  }

  async delete(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }
}
