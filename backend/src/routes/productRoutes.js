const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/products - Listar todos os produtos
router.get('/', productController.listAll);

// GET /api/products/:id - Obter produto por ID
router.get('/:id', productController.getById);

module.exports = router;

