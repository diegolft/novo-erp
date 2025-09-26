const https = require('https');
const http = require('http');

console.log('🧪 Testando API do Novo ERP...\n');

// Configurações
const API_KEY = 'your-api-key-here'; // Substitua pela sua API key
const BASE_URL = 'http://localhost:3000/api';

// Função para fazer requisições
function makeRequest(method, path, data = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    if (data) {
      const jsonData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(jsonData);
    }

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Testes
async function runTests() {
  try {
    console.log('1️⃣ Testando Health Check...');
    const health = await makeRequest('GET', '/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Response: ${JSON.stringify(health.data)}\n`);

    console.log('2️⃣ Testando Login...');
    const login = await makeRequest('POST', '/auth/login', {
      usuario: 'admin',
      senha: 'admin123'
    });
    console.log(`   Status: ${login.status}`);
    
    if (login.status === 200) {
      const token = login.data.token;
      console.log(`   Token obtido: ${token.substring(0, 20)}...\n`);

      console.log('3️⃣ Testando Listar Fornecedores...');
      const fornecedores = await makeRequest('GET', '/fornecedores', null, token);
      console.log(`   Status: ${fornecedores.status}`);
      console.log(`   Fornecedores encontrados: ${fornecedores.data.fornecedores?.length || 0}\n`);

      console.log('4️⃣ Testando Criar Fornecedor...');
      const novoFornecedor = await makeRequest('POST', '/fornecedores', {
        empresa: 'Empresa Teste API',
        fornecedor: 'Fornecedor Teste',
        origem: 'nacional',
        comprador: 'Comprador Teste'
      }, token);
      console.log(`   Status: ${novoFornecedor.status}`);
      
      if (novoFornecedor.status === 201) {
        const fornecedorId = novoFornecedor.data.fornecedor.id;
        console.log(`   Fornecedor criado com ID: ${fornecedorId}\n`);

        console.log('5️⃣ Testando Buscar Fornecedor por ID...');
        const fornecedor = await makeRequest('GET', `/fornecedores/${fornecedorId}`, null, token);
        console.log(`   Status: ${fornecedor.status}`);
        console.log(`   Fornecedor encontrado: ${fornecedor.data.fornecedor?.empresa}\n`);

        console.log('6️⃣ Testando Atualizar Fornecedor...');
        const atualizacao = await makeRequest('PUT', `/fornecedores/${fornecedorId}`, {
          empresa: 'Empresa Teste API Atualizada'
        }, token);
        console.log(`   Status: ${atualizacao.status}`);
        console.log(`   Empresa atualizada: ${atualizacao.data.fornecedor?.empresa}\n`);

        console.log('7️⃣ Testando Deletar Fornecedor...');
        const delecao = await makeRequest('DELETE', `/fornecedores/${fornecedorId}`, null, token);
        console.log(`   Status: ${delecao.status}`);
        console.log(`   Mensagem: ${delecao.data.message}\n`);
      }
    } else {
      console.log(`   Erro no login: ${login.data.error}\n`);
    }

    console.log('✅ Testes concluídos!');
  } catch (error) {
    console.error('❌ Erro nos testes:', error.message);
  }
}

runTests();
