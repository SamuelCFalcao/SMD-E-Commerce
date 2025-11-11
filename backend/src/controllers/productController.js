// Controller de Produtos
const productModel = require('../models/Product');

class ProductController {
  // Listar todos os produtos
  listAll(req, res) {
    try {
      const { category } = req.query;
      let products = productModel.getAll();
      
      if (category) {
        products = productModel.getByCategory(category);
      }
      
      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Obter produto por ID
  getById(req, res) {
    try {
      const { id } = req.params;
      const product = productModel.getById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new ProductController();

