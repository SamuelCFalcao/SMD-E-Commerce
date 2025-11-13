// Constantes da Aplicação

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  ORDERS: '/orders',
  PROFILE: '/profile'
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'Pendente',
  [ORDER_STATUS.PROCESSING]: 'Processando',
  [ORDER_STATUS.SHIPPED]: 'Enviado',
  [ORDER_STATUS.DELIVERED]: 'Entregue',
  [ORDER_STATUS.CANCELLED]: 'Cancelado'
};

export const PAYMENT_METHODS = {
  CREDIT: 'credit',
  DEBIT: 'debit',
  PIX: 'pix',
  BOLETO: 'boleto'
};

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CREDIT]: 'Cartão de Crédito',
  [PAYMENT_METHODS.DEBIT]: 'Cartão de Débito',
  [PAYMENT_METHODS.PIX]: 'PIX',
  [PAYMENT_METHODS.BOLETO]: 'Boleto'
};

