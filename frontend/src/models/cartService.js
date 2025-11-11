// Model - Serviço de API para Carrinho
import api from './api';

class CartService {
  async get() {
    try {
      const response = await api.get('/api/cart');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      throw error;
    }
  }

  async addItem(productId, quantity = 1) {
    try {
      const response = await api.post('/api/cart/items', { productId, quantity });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      throw error;
    }
  }

  async removeItem(productId) {
    try {
      const response = await api.delete(`/api/cart/items/${productId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao remover item:', error);
      throw error;
    }
  }

  async updateQuantity(productId, quantity) {
    try {
      const response = await api.put(`/api/cart/items/${productId}`, { quantity });
      return response.data.data;
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      throw error;
    }
  }

  async clear() {
    try {
      const response = await api.delete('/api/cart');
      return response.data.data;
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  }
}

export default new CartService();

