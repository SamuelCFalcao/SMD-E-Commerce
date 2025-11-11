// View - Página de Detalhes do Produto
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../models/productService';
import { useCart } from '../../controllers/CartController';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getById(id);
      setProduct(data);
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      alert('Produto adicionado ao carrinho!');
    } catch (error) {
      alert('Erro ao adicionar ao carrinho');
    }
  };

  if (loading) {
    return <div className="loading">Carregando produto...</div>;
  }

  if (!product) {
    return <div className="alert alert-error">Produto não encontrado</div>;
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-detail-price">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </div>
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label>Quantidade:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="form-input"
                />
              </div>
              <button onClick={handleAddToCart} className="btn btn-primary">
                Adicionar ao Carrinho
              </button>
            </div>
            <div className="product-detail-meta">
              <p><strong>Categoria:</strong> {product.category}</p>
              <p><strong>Estoque:</strong> {product.stock} unidades</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

