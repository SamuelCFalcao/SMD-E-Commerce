// Model - Serviço de API para Produtos
import api from './api';

class ProductService {
  async getAll(category = null) {
    try {
      const url = category ? `/api/products?category=${category}` : '/api/products';
      const response = await api.get(url);
      return response.data.data || response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  }
}

export default new ProductService();

