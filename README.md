# SMD E-Commerce

Trabalho final para a cadeira de Programação para Web no curso de Sistemas e Mídias Digitais da Universidade Federal do Ceará no período letivo de 2025.1

## 📋 Sobre o Projeto

E-commerce completo e funcional desenvolvido com React (frontend) e Node.js/Express (backend). O projeto utiliza arquitetura MVC (Model, View, Controller) tanto no backend quanto no frontend, com uma estrutura de pastas simplificada e organizada.

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **React Router** - Roteamento da aplicação
- **Axios** - Cliente HTTP para requisições à API
- **CSS3** - Estilização moderna e responsiva

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web para Node.js
- **CORS** - Middleware para permitir requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📁 Estrutura do Projeto

```
SMD-E-Commerce/
├── backend/                 # API Node.js/Express (MVC)
│   ├── src/
│   │   ├── models/         # Modelos de dados (Product, User, Cart, Order)
│   │   ├── controllers/    # Controladores (lógica de negócio)
│   │   ├── routes/         # Rotas da API
│   │   ├── middleware/     # Middlewares (auth, errorHandler)
│   │   └── app.js          # Configuração do Express
│   ├── server.js           # Inicialização do servidor
│   └── package.json
├── frontend/               # Aplicação React (MVC)
│   ├── src/
│   │   ├── models/         # Serviços de API (productService, authService, etc)
│   │   ├── controllers/    # Contextos e lógica de controle (CartController, AuthController)
│   │   ├── views/          # Componentes e páginas (components, pages)
│   │   ├── styles/         # Estilos globais
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 🧱 Arquitetura MVC

### Backend (MVC)

#### Model (M) - `src/models/`
Responsável por gerenciar dados e operações de acesso:
- `Product.js` - Modelo de produtos
- `User.js` - Modelo de usuários
- `Cart.js` - Modelo de carrinho
- `Order.js` - Modelo de pedidos

#### Controller (C) - `src/controllers/`
Recebe requisições, chama models e retorna respostas:
- `productController.js` - Controlador de produtos
- `userController.js` - Controlador de usuários
- `cartController.js` - Controlador de carrinho
- `orderController.js` - Controlador de pedidos

#### Routes - `src/routes/`
Mapeia URLs para controllers:
- `productRoutes.js` - Rotas de produtos
- `userRoutes.js` - Rotas de usuários
- `cartRoutes.js` - Rotas de carrinho
- `orderRoutes.js` - Rotas de pedidos

### Frontend (MVC)

#### Model (M) - `src/models/`
Serviços de API que fazem requisições ao backend:
- `api.js` - Configuração base do Axios
- `productService.js` - Serviço de produtos
- `authService.js` - Serviço de autenticação
- `cartService.js` - Serviço de carrinho
- `orderService.js` - Serviço de pedidos

#### View (V) - `src/views/`
Componentes e páginas de visualização:
- `components/` - Componentes reutilizáveis (Navbar, Footer, ProductCard)
- `pages/` - Páginas da aplicação (Home, Products, Cart, Checkout, etc)

#### Controller (C) - `src/controllers/`
Gerenciamento de estado e lógica de controle:
- `CartController.jsx` - Context API para gerenciar carrinho
- `AuthController.jsx` - Context API para gerenciar autenticação

## 🔧 Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passo 1: Instalar dependências do Backend

```bash
cd backend
npm install
```

### Passo 2: Instalar dependências do Frontend

```bash
cd ../frontend
npm install
```

### Passo 3: Configurar variáveis de ambiente

#### Backend
Crie um arquivo `.env` na pasta `backend/`:
```env
PORT=5000
NODE_ENV=development
```

#### Frontend
Crie um arquivo `.env` na pasta `frontend/`:
```env
VITE_API_URL=http://localhost:5000
```

## 🎯 Como Executar

### Opção 1: Executar separadamente

#### Iniciar o Backend
Abra um terminal e execute:
```bash
cd backend
npm start
```
O servidor estará rodando em `http://localhost:5000`

#### Iniciar o Frontend
Abra outro terminal e execute:
```bash
cd frontend
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

### Opção 2: Executar ambos simultaneamente

Na raiz do projeto, execute:
```bash
npm run dev
```

## ✨ Funcionalidades

### 🏠 Página Inicial
- Hero section com call-to-action
- Cards de características da loja (entrega, segurança, pagamento)

### 📦 Listagem de Produtos
- Grid responsivo de produtos
- Cards com imagem, nome, descrição e preço
- Botão para adicionar ao carrinho diretamente da listagem

### 🔍 Detalhes do Produto
- Visualização completa do produto
- Seletor de quantidade
- Adicionar ao carrinho com quantidade específica

### 🛒 Carrinho de Compras
- Lista de itens adicionados
- Ajuste de quantidade
- Remoção de itens
- Cálculo automático do total
- Integração com API do backend

### 💳 Checkout
- Formulário de dados pessoais
- Formulário de endereço de entrega
- Seleção de método de pagamento
- Resumo do pedido
- Finalização da compra

### 👤 Autenticação
- Login de usuários
- Registro de novos usuários
- Gerenciamento de sessão

### 📋 Pedidos
- Listagem de pedidos do usuário
- Detalhes de cada pedido
- Status do pedido

## 🎨 Design

O projeto utiliza um design moderno com:
- Gradientes coloridos (roxo/azul)
- Cards com sombras e efeitos hover
- Interface totalmente responsiva
- Animações suaves e transições
- Tipografia clara e legível

## 🔌 API Endpoints

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Retorna produto por ID

### Usuários
- `GET /api/users` - Lista todos os usuários
- `GET /api/users/:id` - Retorna usuário por ID
- `POST /api/users` - Cria novo usuário
- `POST /api/users/login` - Login de usuário

### Carrinho
- `GET /api/cart` - Retorna carrinho do usuário
- `POST /api/cart/items` - Adiciona item ao carrinho
- `DELETE /api/cart/items/:productId` - Remove item do carrinho
- `PUT /api/cart/items/:productId` - Atualiza quantidade do item
- `DELETE /api/cart` - Limpa o carrinho

### Pedidos
- `GET /api/orders` - Lista pedidos do usuário
- `GET /api/orders/:id` - Retorna pedido por ID
- `POST /api/orders` - Cria novo pedido
- `PUT /api/orders/:id/status` - Atualiza status do pedido

### Health Check
- `GET /api/health` - Verifica status da API

## 📝 Notas Importantes

- Os produtos são mockados (dados fictícios) no backend
- O carrinho é gerenciado no backend e associado ao usuário
- Para produção, seria necessário implementar banco de dados e processamento real de pagamentos
- A autenticação atual é simplificada; em produção, usar JWT ou sessões seguras

## 🔐 Autenticação

Atualmente, a autenticação é simplificada. O sistema utiliza o header `user-id` para identificar o usuário. Em produção, seria necessário:
- Implementar JWT (JSON Web Tokens)
- Hash de senhas com bcrypt
- Validação mais robusta
- Refresh tokens

## 👥 Desenvolvido por

Samuel de Castro Falcão - Trabalho final de Programação para Web - UFC 2025.1

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico.
