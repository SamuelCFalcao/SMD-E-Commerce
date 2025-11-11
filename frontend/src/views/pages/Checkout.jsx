// View - Página de Checkout
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../controllers/CartController';
import { useAuth } from '../../controllers/AuthController';
import orderService from '../../models/orderService';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      alert('Por favor, faça login para finalizar a compra');
      navigate('/login');
      return;
    }

    if (!cart.items || cart.items.length === 0) {
      alert('Carrinho vazio');
      return;
    }

    try {
      setLoading(true);
      const shippingAddress = {
        street: formData.street,
        number: formData.number,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode
      };

      await orderService.create({
        shippingAddress,
        paymentMethod: formData.paymentMethod
      });

      await clearCart();
      alert('Pedido realizado com sucesso!');
      navigate('/orders');
    } catch (error) {
      alert('Erro ao finalizar pedido');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="alert alert-error">Carrinho vazio</div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-content">
          <form onSubmit={handleSubmit} className="checkout-form">
            <section className="checkout-section">
              <h2>Dados Pessoais</h2>
              <div className="form-group">
                <label className="form-label">Nome</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </section>

            <section className="checkout-section">
              <h2>Endereço de Entrega</h2>
              <div className="form-group">
                <label className="form-label">Rua</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Número</label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">CEP</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            </section>

            <section className="checkout-section">
              <h2>Forma de Pagamento</h2>
              <div className="form-group">
                <label className="form-label">Método de Pagamento</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="credit">Cartão de Crédito</option>
                  <option value="debit">Cartão de Débito</option>
                  <option value="pix">PIX</option>
                  <option value="boleto">Boleto</option>
                </select>
              </div>
            </section>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Finalizar Pedido'}
            </button>
          </form>

          <div className="checkout-summary">
            <div className="checkout-summary-card">
              <h2>Resumo do Pedido</h2>
              <div className="checkout-items">
                {cart.items.map((item) => (
                  <div key={item.productId} className="checkout-item">
                    {item.product && (
                      <>
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="checkout-total">
                <span>Total:</span>
                <span>R$ {cart.total?.toFixed(2).replace('.', ',') || '0,00'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

