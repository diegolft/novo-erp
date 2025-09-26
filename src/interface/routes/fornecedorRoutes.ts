import { Router } from 'express';
import { FornecedorController } from '../controllers/FornecedorController';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const fornecedorController = new FornecedorController();

// Aplicar middleware de autenticação em todas as rotas
const authMiddleware = new AuthMiddleware();
router.use(authMiddleware.authenticate);

// GET /fornecedores - Listar todos os fornecedores
router.get('/', fornecedorController.getAll);

// GET /fornecedores/:id - Buscar fornecedor por ID
router.get('/:id', fornecedorController.getById);

// POST /fornecedores - Criar novo fornecedor
router.post('/', fornecedorController.create);

// PUT /fornecedores/:id - Atualizar fornecedor
router.put('/:id', fornecedorController.update);

// DELETE /fornecedores/:id - Deletar fornecedor
router.delete('/:id', fornecedorController.delete);

export default router;
