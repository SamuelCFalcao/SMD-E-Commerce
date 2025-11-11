// Controller - Gerenciamento de autenticação
import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../models/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        setUser(response.data);
      }
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await authService.register(name, email, password);
      if (response.success) {
        setUser(response.data);
      }
      return response;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

