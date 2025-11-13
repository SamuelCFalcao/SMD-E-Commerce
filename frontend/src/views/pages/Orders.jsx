// View - Página de Pedidos
import { useState, useEffect } from 'react';
import { useAuth } from '../../controllers/AuthController';
import orderService from '../../models/orderService';
import { ORDER_STATUS_LABELS, PAYMENT_METHOD_LABELS } from '../../config/constants';
import { formatDate, formatCurrency } from '../../utils/formatters';
import './Orders.css';

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      loadOrders();
    }
  }, [isAuthenticated]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="alert alert-error">Por favor, faça login para ver seus pedidos</div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Carregando pedidos...</div>;
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Meus Pedidos</h1>
        {orders.length === 0 ? (
          <div className="orders-empty">
            <p>Você ainda não fez nenhum pedido</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Pedido #{order.id}</h3>
                  <span className={`order-status order-status-${order.status}`}>
                    {ORDER_STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>
                <div className="order-details">
                  <p><strong>Data:</strong> {formatDate(order.createdAt)}</p>
                  <p><strong>Total:</strong> {formatCurrency(order.total)}</p>
                  <p><strong>Pagamento:</strong> {PAYMENT_METHOD_LABELS[order.paymentMethod] || order.paymentMethod}</p>
                  {order.shippingAddress && (
                    <p><strong>Endereço:</strong> {order.shippingAddress.street}, {order.shippingAddress.number} - {order.shippingAddress.city}/{order.shippingAddress.state}</p>
                  )}
                </div>
                <div className="order-items">
                  <h4>Itens:</h4>
                  <ul>
                    {order.items && order.items.map((item, index) => (
                      <li key={index}>
                        {item.product ? (
                          <>
                            {item.product.name} - Quantidade: {item.quantity} - 
                            {formatCurrency(item.product.price * item.quantity)}
                          </>
                        ) : (
                          <>
                            Produto ID: {item.productId} - Quantidade: {item.quantity}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

