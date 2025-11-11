// View - Página de Pedidos
import { useState, useEffect } from 'react';
import { useAuth } from '../../controllers/AuthController';
import orderService from '../../models/orderService';
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
                    {order.status}
                  </span>
                </div>
                <div className="order-details">
                  <p><strong>Data:</strong> {new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
                  <p><strong>Total:</strong> R$ {order.total.toFixed(2).replace('.', ',')}</p>
                  <p><strong>Pagamento:</strong> {order.paymentMethod}</p>
                  <p><strong>Endereço:</strong> {order.shippingAddress.street}, {order.shippingAddress.number} - {order.shippingAddress.city}/{order.shippingAddress.state}</p>
                </div>
                <div className="order-items">
                  <h4>Itens:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.product ? (
                          <>
                            {item.product.name} - Quantidade: {item.quantity} - 
                            R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
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

