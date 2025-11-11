// View - Página do Carrinho
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../controllers/CartController';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateItemQuantity, loading } = useCart();
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    setLocalItems(cart.items || []);
  }, [cart]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
    } else {
      await updateItemQuantity(productId, newQuantity);
    }
  };

  const handleRemove = async (productId) => {
    if (window.confirm('Deseja remover este item do carrinho?')) {
      await removeFromCart(productId);
    }
  };

  if (loading) {
    return <div className="loading">Carregando carrinho...</div>;
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Carrinho</h1>
          <div className="cart-empty">
            <p>Seu carrinho está vazio</p>
            <Link to="/products" className="btn btn-primary">
              Ver Produtos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Carrinho</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item.productId} className="cart-item">
                {item.product && (
                  <>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="cart-item-image"
                    />
                    <div className="cart-item-info">
                      <h3>{item.product.name}</h3>
                      <p className="cart-item-price">
                        R$ {item.product.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="btn-quantity"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="btn-quantity"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                    </div>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="btn btn-danger"
                    >
                      Remover
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-summary-card">
              <h2>Resumo do Pedido</h2>
              <div className="cart-summary-row">
                <span>Subtotal:</span>
                <span>R$ {cart.total?.toFixed(2).replace('.', ',') || '0,00'}</span>
              </div>
              <div className="cart-summary-row">
                <span>Frete:</span>
                <span>Grátis</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Total:</span>
                <span>R$ {cart.total?.toFixed(2).replace('.', ',') || '0,00'}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Finalizar Compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

