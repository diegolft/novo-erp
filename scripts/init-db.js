const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Inicializando banco de dados...');

// Verificar se o arquivo .env existe
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('📝 Copie o arquivo env.example para .env e configure as variáveis:');
  console.log('   cp env.example .env');
  process.exit(1);
}

// Carregar variáveis de ambiente
require('dotenv').config();

// Verificar se DATABASE_URL está configurada
if (!process.env.DATABASE_URL) {
  console.log('❌ DATABASE_URL não configurada no arquivo .env');
  process.exit(1);
}

console.log('✅ Variáveis de ambiente carregadas');

try {
  // Executar migrações
  console.log('📊 Executando migrações...');
  execSync('npm run db:migrate', { stdio: 'inherit' });
  
  console.log('✅ Banco de dados inicializado com sucesso!');
  console.log('🎉 Você pode agora executar: npm run dev');
} catch (error) {
  console.error('❌ Erro ao inicializar banco de dados:', error.message);
  console.log('💡 Dica: Certifique-se de que o PostgreSQL está rodando e a DATABASE_URL está correta');
  process.exit(1);
}
