const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET /api/orders - Listar pedidos do usuário
router.get('/', orderController.listByUser);

// GET /api/orders/:id - Obter pedido por ID
router.get('/:id', orderController.getById);

// POST /api/orders - Criar pedido
router.post('/', orderController.create);

// PUT /api/orders/:id/status - Atualizar status
router.put('/:id/status', orderController.updateStatus);

module.exports = router;

