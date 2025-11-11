// Model de Produto - Fonte de dados
class ProductModel {
  constructor() {
    this.products = [
      {
        id: 1,
        name: 'Notebook Gamer',
        description: 'Notebook gamer de alta performance com placa de vídeo dedicada',
        price: 3499.99,
        image: 'https://via.placeholder.com/300x200?text=Notebook+Gamer',
        stock: 10,
        category: 'Eletrônicos'
      },
      {
        id: 2,
        name: 'Smartphone Pro',
        description: 'Smartphone com câmera de 108MP e tela AMOLED',
        price: 2499.99,
        image: 'https://via.placeholder.com/300x200?text=Smartphone+Pro',
        stock: 15,
        category: 'Eletrônicos'
      },
      {
        id: 3,
        name: 'Fone Bluetooth',
        description: 'Fone de ouvido sem fio com cancelamento de ruído',
        price: 299.99,
        image: 'https://via.placeholder.com/300x200?text=Fone+Bluetooth',
        stock: 30,
        category: 'Acessórios'
      },
      {
        id: 4,
        name: 'Teclado Mecânico',
        description: 'Teclado mecânico RGB com switches Cherry MX',
        price: 599.99,
        image: 'https://via.placeholder.com/300x200?text=Teclado+Mecanico',
        stock: 20,
        category: 'Periféricos'
      },
      {
        id: 5,
        name: 'Mouse Gamer',
        description: 'Mouse gamer com DPI ajustável até 16000',
        price: 199.99,
        image: 'https://via.placeholder.com/300x200?text=Mouse+Gamer',
        stock: 25,
        category: 'Periféricos'
      },
      {
        id: 6,
        name: 'Monitor 4K',
        description: 'Monitor 27 polegadas 4K com HDR',
        price: 1999.99,
        image: 'https://via.placeholder.com/300x200?text=Monitor+4K',
        stock: 8,
        category: 'Monitores'
      }
    ];
  }

  getAll() {
    return this.products;
  }

  getById(id) {
    return this.products.find(product => product.id === parseInt(id));
  }

  getByCategory(category) {
    return this.products.filter(product => product.category === category);
  }
}

module.exports = new ProductModel();

