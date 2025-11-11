// View - Componente de Navegação
import { Link } from 'react-router-dom';
import { useAuth } from '../../controllers/AuthController';
import { useCart } from '../../controllers/CartController';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            SMD E-Commerce
          </Link>
          <ul className="navbar-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Produtos</Link>
            </li>
            {isAuthenticated() ? (
              <>
                <li>
                  <Link to="/orders">Pedidos</Link>
                </li>
                <li>
                  <span>Olá, {user?.name}</span>
                </li>
                <li>
                  <button onClick={logout} className="btn btn-secondary">
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="btn btn-primary">
                    Cadastrar
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/cart" className="navbar-cart">
                🛒 Carrinho
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

