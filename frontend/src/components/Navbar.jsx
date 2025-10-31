import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const Navbar = () => {
  const { getTotalItems } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          SMD Store
        </Link>
        <div className="navbar-links">
          <Link to="/products" className="nav-link">
            Produtos
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span>Carrinho</span>
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
