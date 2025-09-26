const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔒 Executando migração segura...');

// Carregar variáveis de ambiente
const envPath = path.join(__dirname, '..', '.env');
require('dotenv').config({ path: envPath });

// Verificar se DATABASE_URL está definida
if (!process.env.DATABASE_URL) {
  console.log('❌ DATABASE_URL não encontrada no arquivo .env');
  console.log('📝 Certifique-se de que o arquivo .env existe e contém DATABASE_URL');
  console.log('💡 Exemplo: DATABASE_URL=postgresql://usuario:senha@localhost:5432/banco');
  process.exit(1);
}

console.log('✅ Variáveis de ambiente carregadas');
console.log('🔗 Conectando ao banco:', process.env.DATABASE_URL.replace(/\/\/.*@/, '//***@'));

// Criar arquivo de configuração temporário com as credenciais
const tempConfig = {
  driver: "pg",
  out: "./drizzle",
  schema: "./src/infrastructure/database/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL
  }
};

const tempConfigPath = path.join(__dirname, '..', 'drizzle.temp.json');

try {
  // Escrever arquivo temporário
  fs.writeFileSync(tempConfigPath, JSON.stringify(tempConfig, null, 2));
  
  // Executar migração com arquivo temporário
  console.log('📊 Executando migração...');
  execSync(`npx drizzle-kit push:pg --config=${tempConfigPath}`, { 
    stdio: 'inherit'
  });
  
  console.log('✅ Migração executada com sucesso!');
} catch (error) {
  console.error('❌ Erro ao executar migração:', error.message);
  process.exit(1);
} finally {
  // Remover arquivo temporário (importante para segurança!)
  if (fs.existsSync(tempConfigPath)) {
    fs.unlinkSync(tempConfigPath);
    console.log('🗑️ Arquivo temporário removido');
  }
}
