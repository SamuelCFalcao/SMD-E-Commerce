const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /api/users - Listar todos os usuários
router.get('/', userController.listAll);

// GET /api/users/:id - Obter usuário por ID
router.get('/:id', userController.getById);

// POST /api/users - Criar novo usuário
router.post('/', userController.create);

// POST /api/users/login - Login
router.post('/login', userController.login);

module.exports = router;

