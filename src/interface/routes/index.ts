import { Router } from 'express';
import authRoutes from './authRoutes';
import permissionRoutes from './permissionRoutes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de permissões
router.use('/permissions', permissionRoutes);

// Rota de health check
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Novo ERP API'
  });
});

export default router;
