// Model - Serviço de API para Pedidos
import api from './api';

class OrderService {
  async getAll() {
    try {
      const response = await api.get('/api/orders');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await api.get(`/api/orders/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw error;
    }
  }

  async create(orderData) {
    try {
      const response = await api.post('/api/orders', orderData);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  }
}

export default new OrderService();

