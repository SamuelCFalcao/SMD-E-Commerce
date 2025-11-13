// Model - Serviço de API para Produtos
import api from './api';

class ProductService {
  async getAll(category = null) {
    try {
      const url = category ? `/api/products?category=${category}` : '/api/products';
      const response = await api.get(url);
      // O backend retorna { success: true, data: [...] }
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      // Fallback para formato direto
      return response.data.data || response.data || [];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await api.get(`/api/products/${id}`);
      // O backend retorna { success: true, data: {...} }
      if (response.data.success && response.data.data) {
        return response.data.data;
      }
      // Fallback para formato direto
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      if (error.response?.status === 404) {
        throw new Error('Produto não encontrado');
      }
      throw error;
    }
  }
}

export default new ProductService();

