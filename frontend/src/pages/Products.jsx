import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import axios from 'axios'
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        setError('Erro ao carregar produtos')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="loading">Carregando produtos...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="products-page">
      <h1 className="page-title">Nossos Produtos</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default Products
