// Model - Serviço de API para Autenticação
import api from './api';

class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/api/users/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('userId', response.data.data.id);
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
        localStorage.setItem('userId', response.data.data.id);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!localStorage.getItem('userId');
  }
}

export default new AuthService();

