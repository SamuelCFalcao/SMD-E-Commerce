// Controller de Carrinho
const cartModel = require('../models/Cart');
const productModel = require('../models/Product');

class CartController {
  // Obter carrinho do usuário
  get(req, res) {
    try {
      // Usar userId da sessão se autenticado, caso contrário usar 'guest'
      const userId = req.userId || 'guest';
      const cart = cartModel.getByUserId(userId);
      
      // Enriquecer com dados dos produtos
      const enrichedCart = {
        items: cart.items.map(item => {
          const product = productModel.getById(item.productId);
          return {
            ...item,
            product: product || null
          };
        }),
        total: this.calculateTotal(cart.items)
      };
      
      res.json({
        success: true,
        data: enrichedCart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Adicionar item ao carrinho
  addItem(req, res) {
    try {
      const userId = req.userId || 'guest';
      const { productId, quantity } = req.body;
      
      if (!productId) {
        return res.status(400).json({
          success: false,
          error: 'productId é obrigatório'
        });
      }
      
      const product = productModel.getById(productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }
      
      const cart = cartModel.addItem(userId, productId, quantity || 1);
      const enrichedCart = {
        items: cart.items.map(item => {
          const prod = productModel.getById(item.productId);
          return {
            ...item,
            product: prod || null
          };
        }),
        total: this.calculateTotal(cart.items)
      };
      
      res.json({
        success: true,
        data: enrichedCart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Remover item do carrinho
  removeItem(req, res) {
    try {
      const userId = req.userId || 'guest';
      const { productId } = req.params;
      
      const cart = cartModel.removeItem(userId, productId);
      const enrichedCart = {
        items: cart.items.map(item => {
          const product = productModel.getById(item.productId);
          return {
            ...item,
            product: product || null
          };
        }),
        total: this.calculateTotal(cart.items)
      };
      
      res.json({
        success: true,
        data: enrichedCart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Atualizar quantidade
  updateQuantity(req, res) {
    try {
      const userId = req.userId || 'guest';
      const { productId } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          error: 'Quantidade deve ser maior que zero'
        });
      }
      
      const cart = cartModel.updateQuantity(userId, productId, quantity);
      const enrichedCart = {
        items: cart.items.map(item => {
          const product = productModel.getById(item.productId);
          return {
            ...item,
            product: product || null
          };
        }),
        total: this.calculateTotal(cart.items)
      };
      
      res.json({
        success: true,
        data: enrichedCart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Limpar carrinho
  clear(req, res) {
    try {
      const userId = req.userId || 'guest';
      const cart = cartModel.clear(userId);
      res.json({
        success: true,
        data: cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Calcular total
  calculateTotal(items) {
    return items.reduce((total, item) => {
      const product = productModel.getById(item.productId);
      if (product) {
        return total + (product.price * item.quantity);
      }
      return total;
    }, 0);
  }
}

module.exports = new CartController();

