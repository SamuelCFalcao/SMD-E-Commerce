const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /api/cart - Obter carrinho
router.get('/', cartController.get);

// POST /api/cart/items - Adicionar item
router.post('/items', cartController.addItem);

// DELETE /api/cart/items/:productId - Remover item
router.delete('/items/:productId', cartController.removeItem);

// PUT /api/cart/items/:productId - Atualizar quantidade
router.put('/items/:productId', cartController.updateQuantity);

// DELETE /api/cart - Limpar carrinho
router.delete('/', cartController.clear);

module.exports = router;

