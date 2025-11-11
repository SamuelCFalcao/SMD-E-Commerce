// Controller - Gerenciamento de estado do carrinho
import { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../models/cartService';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await cartService.get();
      setCart(cartData);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      const cartData = await cartService.addItem(productId, quantity);
      setCart(cartData);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const cartData = await cartService.removeItem(productId);
      setCart(cartData);
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      const cartData = await cartService.updateQuantity(productId, quantity);
      setCart(cartData);
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartService.clear();
      setCart({ items: [], total: 0 });
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getCartItemCount,
    loadCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

