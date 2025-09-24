# Novo ERP - Backend

Sistema ERP backend desenvolvido com TypeScript seguindo os princípios de Clean Architecture.

## 🏗️ Arquitetura

O projeto segue rigorosamente os princípios de Clean Architecture:

- **Domain**: Entidades, regras de negócio e interfaces
- **Application**: Casos de uso e orquestração da lógica
- **Infrastructure**: Banco de dados, serviços externos e logging
- **Interface**: Controllers HTTP e adapters

## 🚀 Tecnologias

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL com Drizzle ORM
- **Autenticação**: JWT
- **Segurança**: bcrypt, API Key, ACL
- **Logging**: Sistema completo de logs de usuários

## 📋 Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório:

```bash
git clone <repository-url>
cd novo-erp
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp env.example .env
```

4. Configure o arquivo `.env`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/novo_erp
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
API_KEY=your-api-key-here
PORT=3000
NODE_ENV=development
```

5. Inicialize o banco de dados:

```bash
npm run init-db
```

**OU** execute as migrações manualmente:

```bash
npm run db:migrate
```

## 🚀 Executando

### Desenvolvimento

```bash
npm run dev
```

### Produção

```bash
npm run build
npm start
```

## 📊 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Executa em produção
- `npm run db:generate` - Gera migrações do banco
- `npm run db:migrate` - Executa migrações
- `npm run db:studio` - Abre Drizzle Studio

## 🔐 Segurança

### API Key

Todas as rotas requerem uma API Key no header:

```
X-API-Key: your-api-key-here
```

### Autenticação JWT

Para rotas protegidas, inclua o token no header:

```
Authorization: Bearer your-jwt-token
```

### ACL (Access Control Lists)

Sistema de permissões baseado em roles:

- `ADMIN` - Acesso total ao sistema
- Outras permissões customizáveis

## 📡 Endpoints

### Autenticação

#### POST /api/auth/register

Registra novo usuário.

**Headers:**

- `X-API-Key`: API Key obrigatória

**Body:**

```json
{
  "usuario": "joao.silva",
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123"
}
```

#### POST /api/auth/login

Realiza login do usuário.

**Headers:**

- `X-API-Key`: API Key obrigatória

**Body:**

```json
{
  "usuario": "joao.silva",
  "senha": "senha123"
}
```

**Response:**

```json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": "uuid",
    "usuario": "joao.silva",
    "nome": "João Silva",
    "email": "joao@email.com"
  },
  "token": "jwt-token",
  "expiresIn": "24h"
}
```

### Permissões

#### GET /api/permissions

Lista todas as permissões (requer permissão ADMIN).

#### POST /api/permissions

Cria nova permissão (requer permissão ADMIN).

#### POST /api/permissions/assign

Atribui permissão a usuário (requer permissão ADMIN).

#### GET /api/permissions/my

Lista permissões do usuário autenticado.

### Health Check

#### GET /api/health

Verifica status da API.

## 🗄️ Banco de Dados

### Tabelas

- **users**: Usuários do sistema
- **permissions**: Permissões disponíveis
- **user_permissions**: Relacionamento usuário-permissão
- **logs**: Logs de ações dos usuários

### Migrações

As migrações são gerenciadas pelo Drizzle ORM:

```bash
# Gerar nova migração
npm run db:generate

# Executar migrações
npm run db:migrate
```

## 📝 Logging

Todas as ações dos usuários são registradas automaticamente:

- Registro de usuário
- Login
- Acessos a rotas protegidas
- Ações administrativas

## 🧪 Testes

```bash
npm test
```

## 📁 Estrutura do Projeto

```
src/
├── domain/                 # Camada de domínio
│   ├── entities/          # Entidades de negócio
│   ├── repositories/       # Interfaces dos repositórios
│   └── services/          # Interfaces dos serviços
├── application/           # Camada de aplicação
│   └── use-cases/         # Casos de uso
├── infrastructure/        # Camada de infraestrutura
│   ├── database/          # Schema e conexão
│   ├── repositories/       # Implementação dos repositórios
│   └── services/          # Implementação dos serviços
└── interface/             # Camada de interface
    ├── controllers/       # Controllers HTTP
    ├── middlewares/       # Middlewares
    └── routes/            # Definição das rotas
```

## 🔄 Clean Architecture

O projeto segue rigorosamente os princípios de Clean Architecture:

1. **Independência de frameworks**: O código de negócio não depende de bibliotecas externas
2. **Testabilidade**: Fácil de testar com mocks e stubs
3. **Independência de UI**: A lógica de negócio não conhece a interface
4. **Independência de banco**: A lógica não depende do banco de dados
5. **Independência de agentes externos**: A lógica não conhece o mundo exterior

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.
