import { pgTable, uuid, varchar, text, boolean, timestamp, json, integer, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  usuario: varchar('usuario', { length: 100 }).notNull().unique(),
  nome: varchar('nome', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  senhaHash: text('senha_hash').notNull(),
  ativo: boolean('ativo').notNull().default(true),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow()
});

export const logs = pgTable('logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  usuarioId: uuid('usuario_id').notNull().references(() => users.id),
  acao: varchar('acao', { length: 100 }).notNull(),
  detalhes: text('detalhes'),
  ip: varchar('ip', { length: 45 }),
  userAgent: text('user_agent'),
  criadoEm: timestamp('criado_em').notNull().defaultNow()
});

export const fornecedores = pgTable('fornecedores', {
  id: serial('id').primaryKey(),
  empresa: varchar('empresa', { length: 255 }).notNull(),
  fornecedor: varchar('fornecedor', { length: 255 }).notNull(),
  origem: varchar('origem', { length: 100 }).notNull(),
  comprador: varchar('comprador', { length: 255 }).notNull(),
  criadoEm: timestamp('criado_em').notNull().defaultNow(),
  atualizadoEm: timestamp('atualizado_em').notNull().defaultNow()
});

