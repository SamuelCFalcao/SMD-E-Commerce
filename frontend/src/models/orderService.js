// Model - Serviço de API para Pedidos
import api from './api';

class OrderService {
  async getAll() {
    try {
      const response = await api.get('/api/orders');
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return response.data.data || response.data || [];
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      if (error.response?.status === 401) {
        throw new Error('Não autenticado');
      }
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await api.get(`/api/orders/${id}`);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      if (error.response?.status === 404) {
        throw new Error('Pedido não encontrado');
      }
      throw error;
    }
  }

  async create(orderData) {
    try {
      const response = await api.post('/api/orders', orderData);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      if (error.response?.status === 401) {
        throw new Error('Não autenticado');
      }
      throw error;
    }
  }
}

export default new OrderService();

