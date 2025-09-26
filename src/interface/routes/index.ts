import { Router } from 'express';
import authRoutes from './authRoutes';
import fornecedorRoutes from './fornecedorRoutes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de fornecedores
router.use('/fornecedores', fornecedorRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Novo ERP API'
  });
});

export default router;
