const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, isAdmin } = require('../middleware/auth');

// GET /api/orders - Listar pedidos do usuário (requer autenticação)
router.get('/', auth, orderController.listByUser);

// GET /api/orders/:id - Obter pedido por ID (requer autenticação)
router.get('/:id', auth, orderController.getById);

// POST /api/orders - Criar pedido (requer autenticação)
router.post('/', auth, orderController.create);

// PUT /api/orders/:id/status - Atualizar status (apenas admin)
router.put('/:id/status', auth, isAdmin, orderController.updateStatus);

module.exports = router;

