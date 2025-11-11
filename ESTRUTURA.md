# Estrutura MVC do Projeto

## Backend (Node.js/Express)

### Estrutura de Pastas

```
backend/
├── src/
│   ├── models/          # Modelos de dados (M)
│   │   ├── Product.js   # Modelo de produtos
│   │   ├── User.js      # Modelo de usuários
│   │   ├── Cart.js      # Modelo de carrinho
│   │   └── Order.js     # Modelo de pedidos
│   │
│   ├── controllers/     # Controladores (C)
│   │   ├── productController.js
│   │   ├── userController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   │
│   ├── routes/          # Rotas da API
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├── middleware/      # Middlewares
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   └── app.js           # Configuração do Express
│
├── server.js            # Inicialização do servidor
└── package.json
```

### Fluxo MVC no Backend

1. **Request** → Routes (mapeia URL para controller)
2. **Routes** → Controller (processa requisição)
3. **Controller** → Model (acessa dados)
4. **Model** → Controller (retorna dados)
5. **Controller** → Response (retorna resposta JSON)

### Exemplo: Listar Produtos

```
GET /api/products
  → productRoutes.js
    → productController.listAll()
      → productModel.getAll()
      ← Retorna produtos
    ← Resposta JSON
```

## Frontend (React)

### Estrutura de Pastas

```
frontend/
├── src/
│   ├── models/          # Serviços de API (M)
│   │   ├── api.js       # Configuração do Axios
│   │   ├── productService.js
│   │   ├── authService.js
│   │   ├── cartService.js
│   │   └── orderService.js
│   │
│   ├── controllers/     # Controllers (C)
│   │   ├── CartController.jsx  # Context API
│   │   └── AuthController.jsx  # Context API
│   │
│   ├── views/           # Views (V)
│   │   ├── components/  # Componentes reutilizáveis
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   │
│   │   └── pages/       # Páginas
│   │       ├── Home.jsx
│   │       ├── Products.jsx
│   │       ├── ProductDetail.jsx
│   │       ├── Cart.jsx
│   │       ├── Checkout.jsx
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       └── Orders.jsx
│   │
│   ├── styles/          # Estilos globais
│   │   └── global.css
│   │
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Entry point
│
├── index.html
├── vite.config.js
└── package.json
```

### Fluxo MVC no Frontend

1. **User Action** → View (página/componente)
2. **View** → Controller (chama função do controller)
3. **Controller** → Model (chama serviço de API)
4. **Model** → API (faz requisição HTTP)
5. **API Response** → Model (retorna dados)
6. **Model** → Controller (atualiza estado)
7. **Controller** → View (renderiza com novos dados)

### Exemplo: Adicionar ao Carrinho

```
User clica em "Adicionar"
  → ProductCard (View)
    → useCart().addToCart() (Controller)
      → cartService.addItem() (Model)
        → API POST /api/cart/items
      ← Resposta da API
    ← Estado atualizado
  ← UI atualizada
```

## Separação de Responsabilidades

### Model (M)
- **Backend**: Gerencia dados, acesso a dados, validações básicas
- **Frontend**: Faz requisições HTTP, formata dados

### View (V)
- **Backend**: Não há views (API REST)
- **Frontend**: Componentes React, renderização, UI

### Controller (C)
- **Backend**: Processa requisições, chama models, retorna respostas
- **Frontend**: Gerencia estado, lógica de negócio, coordena models e views

## Vantagens da Estrutura MVC

1. **Organização**: Código bem organizado e fácil de navegar
2. **Manutenibilidade**: Fácil de manter e atualizar
3. **Testabilidade**: Cada camada pode ser testada independentemente
4. **Reutilização**: Models e controllers podem ser reutilizados
5. **Escalabilidade**: Fácil adicionar novas funcionalidades

## Como Adicionar uma Nova Funcionalidade

### Backend
1. Criar model em `src/models/`
2. Criar controller em `src/controllers/`
3. Criar routes em `src/routes/`
4. Registrar routes em `src/app.js`

### Frontend
1. Criar service em `src/models/`
2. Adicionar lógica no controller se necessário
3. Criar componente/página em `src/views/`
4. Adicionar rota em `src/App.jsx`

