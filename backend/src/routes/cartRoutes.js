const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { optionalAuth } = require('../middleware/auth');

// Usar autenticação opcional para carrinho (permite visitantes)
// GET /api/cart - Obter carrinho
router.get('/', optionalAuth, cartController.get);

// POST /api/cart/items - Adicionar item
router.post('/items', optionalAuth, cartController.addItem);

// DELETE /api/cart/items/:productId - Remover item
router.delete('/items/:productId', optionalAuth, cartController.removeItem);

// PUT /api/cart/items/:productId - Atualizar quantidade
router.put('/items/:productId', optionalAuth, cartController.updateQuantity);

// DELETE /api/cart - Limpar carrinho
router.delete('/', optionalAuth, cartController.clear);

module.exports = router;

