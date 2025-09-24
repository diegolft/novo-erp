import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { ApiKeyMiddleware } from '../middlewares/ApiKeyMiddleware';

const router = Router();
const authController = new AuthController();
const apiKeyMiddleware = new ApiKeyMiddleware();

// Aplicar middleware de API Key em todas as rotas
router.use(apiKeyMiddleware.validate);

// POST /register
router.post('/register', authController.register);

// POST /login
router.post('/login', authController.login);

export default router;
