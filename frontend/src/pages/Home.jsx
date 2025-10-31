import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Bem-vindo à SMD Store</h1>
        <p>Sua loja online com os melhores produtos</p>
        <Link to="/products" className="cta-button">
          Ver Produtos
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Entrega Rápida</h3>
          <p>Receba seus produtos em até 48 horas</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Compra Segura</h3>
          <p>Seus dados estão protegidos</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Pagamento Fácil</h3>
          <p>Diversas formas de pagamento</p>
        </div>
      </section>
    </div>
  )
}

export default Home
