// Model - Serviço de API para Autenticação
import api from './api';

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/api/users/login', { email, password });
      if (response.data.success) {
        // Armazenar dados do usuário no localStorage para uso no frontend
        // A sessão é gerenciada pelo backend através de cookies
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async register(name, email, password) {
    try {
      const response = await api.post('/api/users', { name, email, password });
      if (response.data.success) {
        // A sessão é criada automaticamente no backend após registro
        // Apenas armazenar dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await api.post('/api/users/logout');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Limpar localStorage mesmo se houver erro
      localStorage.removeItem('user');
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get('/api/users/me');
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
        return response.data.data;
      }
      return null;
    } catch (error) {
      // Se não estiver autenticado, limpar localStorage
      localStorage.removeItem('user');
      return null;
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await api.put(`/api/users/${id}`, userData);
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const response = await api.delete(`/api/users/${id}`);
      if (response.data.success) {
        localStorage.removeItem('user');
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }

  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    // Verificar se há usuário no localStorage
    // Em produção, poderia verificar com o backend
    return !!localStorage.getItem('user');
  }
}

export default new AuthService();

