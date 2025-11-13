// Model - Serviço de API para Carrinho
import api from './api';

class CartService {
  async get() {
    try {
      const response = await api.get('/api/cart');
      // O backend retorna { success: true, data: {...} }
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      // Fallback para formato direto ou carrinho vazio
      return response.data.data || response.data || { items: [], total: 0 };
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      // Retornar carrinho vazio em caso de erro
      return { items: [], total: 0 };
    }
  }

  async addItem(productId, quantity = 1) {
    try {
      const response = await api.post('/api/cart/items', { productId, quantity });
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erro ao adicionar item:', error);
      throw error;
    }
  }

  async removeItem(productId) {
    try {
      const response = await api.delete(`/api/cart/items/${productId}`);
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return response.data.data || response.data || { items: [], total: 0 };
    } catch (error) {
      console.error('Erro ao remover item:', error);
      throw error;
    }
  }

  async updateQuantity(productId, quantity) {
    try {
      const response = await api.put(`/api/cart/items/${productId}`, { quantity });
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      throw error;
    }
  }

  async clear() {
    try {
      const response = await api.delete('/api/cart');
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      return response.data.data || response.data || { items: [], total: 0 };
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  }
}

export default new CartService();

