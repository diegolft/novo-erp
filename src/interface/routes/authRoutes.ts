import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// POST /register
router.post('/register', authController.register);

// POST /login
router.post('/login', authController.login);

export default router;
