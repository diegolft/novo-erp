# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Autenticação

### API Key

Todas as rotas requerem uma API Key no header:

```
X-API-Key: your-api-key-here
```

### JWT Token

Para rotas protegidas, inclua o token JWT no header:

```
Authorization: Bearer your-jwt-token
```

## Endpoints

### 1. Health Check

#### GET /health

Verifica o status da API.

**Headers:**

- Nenhum

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Novo ERP API"
}
```

### 2. Autenticação

#### POST /auth/register

Registra um novo usuário no sistema.

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

**Response (201):**

```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": "uuid",
    "usuario": "joao.silva",
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

**Errors:**

- `400`: Dados inválidos ou usuário já existe
- `401`: API Key inválida

#### POST /auth/login

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

**Response (200):**

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

**Errors:**

- `400`: Dados inválidos
- `401`: Credenciais inválidas ou API Key inválida

### 3. Fornecedores

#### GET /fornecedores

Lista todos os fornecedores cadastrados.

**Headers:**

- `X-API-Key`: API Key obrigatória
- `Authorization`: JWT Token obrigatório

**Response (200):**

```json
{
  "message": "Fornecedores listados com sucesso",
  "fornecedores": [
    {
      "id": 1,
      "empresa": "Empresa ABC Ltda",
      "fornecedor": "João Silva",
      "origem": "nacional",
      "comprador": "Maria Santos",
      "criadoEm": "2024-01-01T00:00:00.000Z",
      "atualizadoEm": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Errors:**

- `401`: Não autenticado ou API Key inválida
- `500`: Erro interno do servidor

#### GET /fornecedores/:id

Busca um fornecedor específico por ID.

**Headers:**

- `X-API-Key`: API Key obrigatória
- `Authorization`: JWT Token obrigatório

**Parameters:**

- `id` (number): ID do fornecedor

**Response (200):**

```json
{
  "message": "Fornecedor encontrado com sucesso",
  "fornecedor": {
    "id": 1,
    "empresa": "Empresa ABC Ltda",
    "fornecedor": "João Silva",
    "origem": "nacional",
    "comprador": "Maria Santos",
    "criadoEm": "2024-01-01T00:00:00.000Z",
    "atualizadoEm": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `400`: ID inválido
- `401`: Não autenticado ou API Key inválida
- `404`: Fornecedor não encontrado

#### POST /fornecedores

Cria um novo fornecedor.

**Headers:**

- `X-API-Key`: API Key obrigatória
- `Authorization`: JWT Token obrigatório

**Body:**

```json
{
  "empresa": "Empresa ABC Ltda",
  "fornecedor": "João Silva",
  "origem": "nacional",
  "comprador": "Maria Santos"
}
```

**Response (201):**

```json
{
  "message": "Fornecedor criado com sucesso",
  "fornecedor": {
    "id": 1,
    "empresa": "Empresa ABC Ltda",
    "fornecedor": "João Silva",
    "origem": "nacional",
    "comprador": "Maria Santos",
    "criadoEm": "2024-01-01T00:00:00.000Z",
    "atualizadoEm": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**

- `400`: Dados inválidos ou campos obrigatórios ausentes
- `401`: Não autenticado ou API Key inválida

#### PUT /fornecedores/:id

Atualiza um fornecedor existente.

**Headers:**

- `X-API-Key`: API Key obrigatória
- `Authorization`: JWT Token obrigatório

**Parameters:**

- `id` (number): ID do fornecedor

**Body:**

```json
{
  "empresa": "Empresa ABC Ltda",
  "fornecedor": "João Silva",
  "origem": "importado",
  "comprador": "Pedro Oliveira"
}
```

**Response (200):**

```json
{
  "message": "Fornecedor atualizado com sucesso",
  "fornecedor": {
    "id": 1,
    "empresa": "Empresa ABC Ltda",
    "fornecedor": "João Silva",
    "origem": "importado",
    "comprador": "Pedro Oliveira",
    "criadoEm": "2024-01-01T00:00:00.000Z",
    "atualizadoEm": "2024-01-01T12:00:00.000Z"
  }
}
```

**Errors:**

- `400`: Dados inválidos ou ID inválido
- `401`: Não autenticado ou API Key inválida
- `404`: Fornecedor não encontrado

#### DELETE /fornecedores/:id

Remove um fornecedor do sistema.

**Headers:**

- `X-API-Key`: API Key obrigatória
- `Authorization`: JWT Token obrigatório

**Parameters:**

- `id` (number): ID do fornecedor

**Response (200):**

```json
{
  "message": "Fornecedor deletado com sucesso"
}
```

**Errors:**

- `400`: ID inválido
- `401`: Não autenticado ou API Key inválida
- `404`: Fornecedor não encontrado

## Códigos de Status

- `200`: Sucesso
- `201`: Criado com sucesso
- `400`: Dados inválidos
- `401`: Não autenticado ou API Key inválida
- `403`: Sem permissão
- `404`: Recurso não encontrado
- `500`: Erro interno do servidor

## Logs

Todas as ações dos usuários são registradas automaticamente:

- Registro de usuário
- Login
- Acessos a rotas protegidas
- Ações administrativas

Os logs incluem:

- ID do usuário
- Ação realizada
- Detalhes da ação
- IP do usuário
- User Agent
- Timestamp

## Segurança

### API Key

- Todas as rotas requerem uma API Key válida
- Configure a API Key no arquivo `.env`

### JWT Token

- Tokens têm expiração configurável (padrão: 24h)
- Tokens são verificados em todas as rotas protegidas

### Hash de Senhas

- Senhas são hasheadas com bcrypt (12 rounds)
- Senhas nunca são armazenadas em texto plano

### Logging

- Todas as ações são registradas
- Logs incluem informações de auditoria
- Rastreamento de IP e User Agent
