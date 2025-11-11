// Controller de Pedidos
const orderModel = require('../models/Order');
const cartModel = require('../models/Cart');
const productModel = require('../models/Product');

class OrderController {
  // Calcular total do pedido
  calculateTotal(items) {
    return items.reduce((total, item) => {
      const product = productModel.getById(item.productId);
      if (product) {
        return total + (product.price * item.quantity);
      }
      return total;
    }, 0);
  }

  // Enriquecer pedido com dados dos produtos
  enrichOrder(order) {
    return {
      ...order,
      items: order.items.map(item => {
        const product = productModel.getById(item.productId);
        return {
          ...item,
          product: product || null
        };
      })
    };
  }

  // Listar pedidos do usuário
  listByUser(req, res) {
    try {
      // Pedidos requerem autenticação, então userId deve vir da sessão
      const userId = req.userId;
      const orders = orderModel.getByUserId(userId);
      const enrichedOrders = orders.map(order => this.enrichOrder(order));
      res.json({
        success: true,
        data: enrichedOrders
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Obter pedido por ID
  getById(req, res) {
    try {
      const { id } = req.params;
      const order = orderModel.getById(id);
      
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado'
        });
      }
      
      const enrichedOrder = this.enrichOrder(order);
      res.json({
        success: true,
        data: enrichedOrder
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Criar pedido
  create(req, res) {
    try {
      // Pedidos requerem autenticação, então userId deve vir da sessão
      const userId = req.userId;
      const { shippingAddress, paymentMethod } = req.body;
      
      if (!shippingAddress || !paymentMethod) {
        return res.status(400).json({
          success: false,
          error: 'Endereço de entrega e método de pagamento são obrigatórios'
        });
      }
      
      // Obter carrinho atual
      const cart = cartModel.getByUserId(userId);
      if (!cart.items || cart.items.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Carrinho vazio'
        });
      }
      
      // Calcular total
      const total = this.calculateTotal(cart.items);
      
      // Criar pedido
      const order = orderModel.create({
        userId: userId,
        items: cart.items,
        total,
        shippingAddress,
        paymentMethod
      });
      
      // Limpar carrinho
      cartModel.clear(userId);
      
      // Enriquecer pedido com dados dos produtos
      const enrichedOrder = this.enrichOrder(order);
      
      res.status(201).json({
        success: true,
        data: enrichedOrder
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Atualizar status do pedido
  updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          error: 'Status é obrigatório'
        });
      }
      
      const order = orderModel.updateStatus(id, status);
      if (!order) {
        return res.status(404).json({
          success: false,
          error: 'Pedido não encontrado'
        });
      }
      
      const enrichedOrder = this.enrichOrder(order);
      res.json({
        success: true,
        data: enrichedOrder
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new OrderController();

