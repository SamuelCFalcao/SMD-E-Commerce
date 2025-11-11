// Model de Carrinho - Fonte de dados
class CartModel {
  constructor() {
    // Em produção, usar banco de dados
    // Por enquanto, usar objeto em memória
    this.carts = {};
  }

  getByUserId(userId) {
    if (!this.carts[userId]) {
      this.carts[userId] = { items: [], total: 0 };
    }
    return this.carts[userId];
  }

  addItem(userId, productId, quantity = 1) {
    const cart = this.getByUserId(userId);
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    
    this.updateTotal(userId);
    return cart;
  }

  removeItem(userId, productId) {
    const cart = this.getByUserId(userId);
    cart.items = cart.items.filter(item => item.productId !== productId);
    this.updateTotal(userId);
    return cart;
  }

  updateQuantity(userId, productId, quantity) {
    const cart = this.getByUserId(userId);
    const item = cart.items.find(item => item.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      this.updateTotal(userId);
    }
    
    return cart;
  }

  clear(userId) {
    this.carts[userId] = { items: [], total: 0 };
    return this.carts[userId];
  }

  updateTotal(userId) {
    // Total será calculado no controller com dados do produto
    // Aqui apenas inicializamos
    const cart = this.getByUserId(userId);
    cart.total = 0;
    return cart;
  }
}

module.exports = new CartModel();

