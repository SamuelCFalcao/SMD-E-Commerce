# SMD E-Commerce

Trabalho final para a cadeira de Programação para Web no curso de Sistemas e Mídias Digitais da Universidade Federal do Ceará no período letivo de 2025.1

## 📋 Sobre o Projeto

E-commerce completo e funcional desenvolvido com React (frontend) e Node.js/Express (backend). O projeto inclui todas as funcionalidades básicas de uma loja online: listagem de produtos, detalhes do produto, carrinho de compras e checkout.

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

## 📁 Estrutura do Projeto

```
SMD-E-Commerce/
├── frontend/           # Aplicação React
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas da aplicação
│   │   ├── context/       # Context API (Carrinho)
│   │   └── App.jsx        # Componente principal
│   ├── package.json
│   └── vite.config.js
├── backend/           # API Node.js/Express (padrão MVC)
│   ├── src/
│   │   ├── app.js                 # Configuração do Express (middlewares e rotas)
│   │   ├── models/                # Modelos (fonte de dados)
│   │   │   └── productModel.js
│   │   ├── controllers/           # Controladores (lógica de entrada/saída)
│   │   │   ├── productController.js
│   │   │   └── healthController.js
│   │   └── routes/                # Definição de rotas
│   │       ├── productRoutes.js
│   │       └── healthRoutes.js
│   ├── server.js                  # Bootstrap do servidor (usa app.js)
│   └── package.json
└── README.md
```

## 🧱 Padrão MVC aplicado (Backend)

- **Model (M)**: fonte de dados e operações de acesso.
  - `src/models/productModel.js`: mantém os produtos mockados e expõe `getAllProducts` e `getProductById`.
- **Controller (C)**: recebe a requisição, chama o Model e devolve a resposta.
  - `src/controllers/productController.js`: `listProducts` e `getProduct`.
  - `src/controllers/healthController.js`: `health`.
- **Routes**: mapeia URLs para controllers (camada de roteamento da API).
  - `src/routes/productRoutes.js` e `src/routes/healthRoutes.js`.
- **App**: configura middlewares e conecta as rotas.
  - `src/app.js`.
- **Server**: inicia o servidor HTTP.
  - `server.js`.

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

## 🎯 Como Executar

### Iniciar o Backend

Abra um terminal e execute:

```bash
cd backend
npm start
```

O servidor estará rodando em `http://localhost:5000`

### Iniciar o Frontend

Abra outro terminal e execute:

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

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
- Persistência no localStorage

### 💳 Checkout
- Formulário de dados pessoais
- Formulário de endereço de entrega
- Seleção de método de pagamento
- Resumo do pedido
- Finalização da compra

## 🎨 Design

O projeto utiliza um design moderno com:
- Gradientes coloridos (roxo/azul)
- Cards com sombras e efeitos hover
- Interface totalmente responsiva
- Animações suaves e transições
- Tipografia clara e legível

## 🔌 API Endpoints

### GET `/api/products`
Retorna lista de todos os produtos

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "Notebook Gamer",
    "description": "...",
    "price": 3499.99,
    "image": "..."
  }
]
```

### GET `/api/products/:id`
Retorna detalhes de um produto específico

**Resposta:**
```json
{
  "id": 1,
  "name": "Notebook Gamer",
  "description": "...",
  "price": 3499.99,
  "image": "..."
}
```

### GET `/api/health`
Verifica status da API

**Resposta:**
```json
{
  "status": "OK",
  "message": "API funcionando corretamente"
}
```

## 📝 Notas Importantes

- Os produtos são mockados (dados fictícios) no backend
- O carrinho é salvo no localStorage do navegador
- O checkout atualmente apenas simula a finalização (exibe alerta)
- Para produção, seria necessário implementar banco de dados e processamento real de pagamentos

## 👥 Desenvolvido por

Samuel de Castro Falcão - Trabalho final de Programação para Web - UFC 2025.1

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico.
