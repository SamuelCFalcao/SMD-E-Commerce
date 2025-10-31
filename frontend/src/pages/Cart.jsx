import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Seu carrinho está vazio</h2>
        <Link to="/products" className="continue-shopping">
          Continuar Comprando
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Carrinho de Compras</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image || '/placeholder.png'} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p className="cart-item-price">R$ {item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">
                R$ {(item.price * item.quantity).toFixed(2)}
              </div>
              <button
                className="remove-item-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Resumo do Pedido</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>R$ {getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Frete:</span>
            <span>Grátis</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>R$ {getTotalPrice().toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
