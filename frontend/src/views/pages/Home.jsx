// View - Página Inicial
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Bem-vindo ao SMD E-Commerce</h1>
            <p>Encontre os melhores produtos com os melhores preços</p>
            <Link to="/products" className="btn btn-primary">
              Ver Produtos
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Entrega Rápida</h3>
              <p>Entrega em todo o Brasil com segurança e agilidade</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Compra Segura</h3>
              <p>Seus dados protegidos com criptografia de ponta</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Pagamento Fácil</h3>
              <p>Múltiplas formas de pagamento e parcelamento</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

