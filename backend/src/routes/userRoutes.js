const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, isAdmin } = require('../middleware/auth');

// POST /api/users/login - Login (público)
router.post('/login', userController.login);

// POST /api/users/logout - Logout (requer autenticação)
router.post('/logout', auth, userController.logout);

// GET /api/users/me - Obter usuário atual (requer autenticação)
router.get('/me', auth, userController.getCurrentUser);

// POST /api/users - Criar novo usuário (público - registro)
router.post('/', userController.create);

// GET /api/users - Listar todos os usuários (apenas admin)
router.get('/', auth, isAdmin, userController.listAll);

// GET /api/users/:id - Obter usuário por ID (requer autenticação)
router.get('/:id', auth, userController.getById);

// PUT /api/users/:id - Atualizar usuário (requer autenticação)
router.put('/:id', auth, userController.update);

// DELETE /api/users/:id - Deletar usuário (requer autenticação)
router.delete('/:id', auth, userController.delete);

module.exports = router;

