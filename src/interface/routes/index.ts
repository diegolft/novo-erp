import { Router } from 'express';
import authRoutes from './authRoutes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Novo ERP API'
  });
});

export default router;
