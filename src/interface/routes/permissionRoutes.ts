import { Router } from 'express';
import { PermissionController } from '../controllers/PermissionController';
import { ApiKeyMiddleware } from '../middlewares/ApiKeyMiddleware';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import { AclMiddleware } from '../middlewares/AclMiddleware';
import { LoggingMiddleware } from '../middlewares/LoggingMiddleware';

const router = Router();
const permissionController = new PermissionController();
const apiKeyMiddleware = new ApiKeyMiddleware();
const authMiddleware = new AuthMiddleware();
const aclMiddleware = new AclMiddleware();
const loggingMiddleware = new LoggingMiddleware();

// Aplicar middleware de API Key em todas as rotas
router.use(apiKeyMiddleware.validate);

// Aplicar middleware de autenticação em todas as rotas
router.use(authMiddleware.authenticate);

// Aplicar middleware de logging
router.use(loggingMiddleware.logRequest('PERMISSION_ACCESS'));

// GET /permissions - Listar todas as permissões (requer permissão ADMIN)
router.get('/', 
  aclMiddleware.requirePermission('ADMIN'),
  permissionController.getAllPermissions
);

// POST /permissions - Criar nova permissão (requer permissão ADMIN)
router.post('/', 
  aclMiddleware.requirePermission('ADMIN'),
  permissionController.createPermission
);

// POST /permissions/assign - Atribuir permissão a usuário (requer permissão ADMIN)
router.post('/assign', 
  aclMiddleware.requirePermission('ADMIN'),
  permissionController.assignPermission
);

// GET /permissions/my - Minhas permissões
router.get('/my', permissionController.getUserPermissions);

export default router;
