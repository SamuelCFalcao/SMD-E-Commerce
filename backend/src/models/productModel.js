// Camada de dados (Model)
// Mantém a fonte de dados (mock) e expõe funções de acesso

export const products = [
  {
    id: 1,
    name: 'Notebook Gamer',
    description: 'Notebook gamer de alta performance com placa de vídeo dedicada, perfeito para jogos e trabalho pesado.',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500'
  },
  {
    id: 2,
    name: 'Smartphone Pro',
    description: 'Smartphone com tela AMOLED, câmera tripla e processador de última geração.',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
  },
  {
    id: 3,
    name: 'Fones de Ouvido Bluetooth',
    description: 'Fones sem fio com cancelamento de ruído ativo e bateria de longa duração.',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    id: 4,
    name: 'Mouse Gamer',
    description: 'Mouse gamer RGB com sensor de alta precisão e botões programáveis.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
  },
  {
    id: 5,
    name: 'Teclado Mecânico',
    description: 'Teclado mecânico RGB com switches Cherry MX e construção em alumínio.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  },
  {
    id: 6,
    name: 'Monitor 4K',
    description: 'Monitor 4K UHD de 27 polegadas com tecnologia HDR e taxa de atualização de 144Hz.',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
  },
  {
    id: 7,
    name: 'Webcam HD',
    description: 'Webcam Full HD com microfone estéreo integrado e ajuste automático de luz.',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1587825147138-0bc25b5756c3?w=500'
  },
  {
    id: 8,
    name: 'Tablet Pro',
    description: 'Tablet profissional com caneta stylus incluída, ideal para designers e estudantes.',
    price: 3299.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'
  }
]

export function getAllProducts() {
  return products
}

export function getProductById(id) {
  return products.find(p => p.id === id)
}


