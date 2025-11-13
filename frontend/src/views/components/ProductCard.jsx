// View - Componente de Card de Produto
import { Link } from 'react-router-dom';
import { useCart } from '../../controllers/CartController';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart(product.id, 1);
      alert('Produto adicionado ao carrinho!');
    } catch (error) {
      alert('Erro ao adicionar ao carrinho');
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
        </div>
      </Link>
      <div className="product-footer">
        <span className="product-price">
          R$ {product.price?.toFixed(2).replace('.', ',') || '0,00'}
        </span>
        <button
          onClick={handleAddToCart}
          className="btn btn-primary"
          type="button"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

