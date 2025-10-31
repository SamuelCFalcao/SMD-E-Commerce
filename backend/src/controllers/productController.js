// Camada de controle (Controller)
// Orquestra as requisições e respostas usando os models

import { getAllProducts, getProductById } from '../models/productModel.js'

export function listProducts(req, res) {
  const all = getAllProducts()
  res.json(all)
}

export function getProduct(req, res) {
  const id = parseInt(req.params.id)
  const product = getProductById(id)
  if (!product) {
    return res.status(404).json({ error: 'Produto não encontrado' })
  }
  res.json(product)
}


