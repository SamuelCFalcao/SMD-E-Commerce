// View - Página de Listagem de Produtos
import { useState, useEffect } from 'react';
import productService from '../../models/productService';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading">Carregando produtos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="alert alert-error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        <h1>Produtos</h1>
        {products.length === 0 ? (
          <div className="products-empty">
            <p>Nenhum produto encontrado.</p>
          </div>
        ) : (
          <div className="products-grid grid grid-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

