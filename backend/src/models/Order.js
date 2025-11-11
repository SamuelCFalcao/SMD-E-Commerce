// Model de Pedido - Fonte de dados
class OrderModel {
  constructor() {
    this.orders = [];
    this.orderIdCounter = 1;
  }

  getAll() {
    return this.orders;
  }

  getById(id) {
    return this.orders.find(order => order.id === parseInt(id));
  }

  getByUserId(userId) {
    // Se userId for 'guest' ou string, comparar diretamente
    // Se for número, converter para número
    const userIdToCompare = userId === 'guest' ? 'guest' : (typeof userId === 'string' ? userId : userId.toString());
    return this.orders.filter(order => {
      const orderUserId = typeof order.userId === 'string' ? order.userId : order.userId.toString();
      return orderUserId === userIdToCompare;
    });
  }

  create(orderData) {
    const newOrder = {
      id: this.orderIdCounter++,
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  updateStatus(id, status) {
    const order = this.getById(id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
    }
    return order;
  }
}

module.exports = new OrderModel();

