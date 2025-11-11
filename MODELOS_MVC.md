# Documentação da Camada de Modelo (Models) do MVC

## Backend - Camada de Modelo

A camada de modelo no backend é responsável por gerenciar os dados e operações de acesso aos dados. Todos os modelos estão localizados em `backend/src/models/`.

### 1. User.js - Modelo de Usuário

**Responsabilidade**: Gerenciar dados de usuários (clientes e administradores)

**Estrutura de Dados**:
```javascript
{
  id: Number,
  name: String,
  email: String,
  password: String,
  role: String ('user' ou 'admin'),
  createdAt: String (ISO date),
  updatedAt: String (ISO date) // opcional
}
```

**Métodos Disponíveis**:
- `getAll()` - Retorna todos os usuários (sem senha)
- `getById(id)` - Retorna usuário por ID (sem senha)
- `getByEmail(email)` - Retorna usuário por email (com senha, uso interno)
- `create(userData)` - Cria novo usuário (role padrão: 'user')
- `update(id, userData)` - Atualiza dados do usuário
- `delete(id)` - Remove usuário do sistema

**Entidade**: Usuário/Cliente/Administrador

---

### 2. Product.js - Modelo de Produto

**Responsabilidade**: Gerenciar dados de produtos

**Estrutura de Dados**:
```javascript
{
  id: Number,
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  stock: Number,
  category: String
}
```

**Métodos Disponíveis**:
- `getAll()` - Retorna todos os produtos
- `getById(id)` - Retorna produto por ID
- `getByCategory(category)` - Retorna produtos por categoria

**Entidade**: Produto

---

### 3. Cart.js - Modelo de Carrinho

**Responsabilidade**: Gerenciar carrinhos de compras por usuário

**Estrutura de Dados**:
```javascript
{
  items: [
    {
      productId: Number,
      quantity: Number
    }
  ],
  total: Number
}
```

**Métodos Disponíveis**:
- `getByUserId(userId)` - Retorna carrinho do usuário (cria se não existir)
- `addItem(userId, productId, quantity)` - Adiciona item ao carrinho
- `removeItem(userId, productId)` - Remove item do carrinho
- `updateQuantity(userId, productId, quantity)` - Atualiza quantidade do item
- `clear(userId)` - Limpa o carrinho
- `updateTotal(userId)` - Atualiza total do carrinho

**Entidade**: Carrinho de Compras

**Nota**: O carrinho é armazenado em memória, associado a um userId. Usuários autenticados usam seu ID, visitantes usam 'guest'.

---

### 4. Order.js - Modelo de Pedido

**Responsabilidade**: Gerenciar pedidos de compra

**Estrutura de Dados**:
```javascript
{
  id: Number,
  userId: Number ou String,
  items: [
    {
      productId: Number,
      quantity: Number
    }
  ],
  total: Number,
  status: String ('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
  shippingAddress: Object,
  paymentMethod: String,
  createdAt: String (ISO date),
  updatedAt: String (ISO date) // opcional
}
```

**Métodos Disponíveis**:
- `getAll()` - Retorna todos os pedidos
- `getById(id)` - Retorna pedido por ID
- `getByUserId(userId)` - Retorna pedidos de um usuário
- `create(orderData)` - Cria novo pedido (status padrão: 'pending')
- `updateStatus(id, status)` - Atualiza status do pedido

**Entidade**: Pedido/Order

---

## Frontend - Camada de Modelo

A camada de modelo no frontend é responsável por fazer requisições HTTP à API do backend. Todos os serviços estão localizados em `frontend/src/models/`.

### 1. api.js - Configuração Base da API

**Responsabilidade**: Configurar cliente Axios para comunicação com backend

**Configurações**:
- Base URL: `http://localhost:5000` (ou variável de ambiente)
- Credenciais: Habilitadas (`withCredentials: true`) para suporte a sessões

---

### 2. authService.js - Serviço de Autenticação

**Responsabilidade**: Gerenciar autenticação de usuários

**Métodos Disponíveis**:
- `login(email, password)` - Realiza login e cria sessão
- `register(name, email, password)` - Registra novo usuário e faz login automático
- `logout()` - Realiza logout e destrói sessão
- `getCurrentUser()` - Obtém usuário atual da sessão
- `updateUser(id, userData)` - Atualiza dados do usuário
- `deleteUser(id)` - Deleta conta do usuário
- `getStoredUser()` - Obtém usuário do localStorage
- `isAuthenticated()` - Verifica se usuário está autenticado

**Endpoints Utilizados**:
- `POST /api/users/login`
- `POST /api/users/logout`
- `GET /api/users/me`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

---

### 3. productService.js - Serviço de Produtos

**Responsabilidade**: Gerenciar produtos

**Métodos Disponíveis**:
- `getAll()` - Obtém todos os produtos
- `getById(id)` - Obtém produto por ID
- `getByCategory(category)` - Obtém produtos por categoria

**Endpoints Utilizados**:
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products?category=:category`

---

### 4. cartService.js - Serviço de Carrinho

**Responsabilidade**: Gerenciar carrinho de compras

**Métodos Disponíveis**:
- `get()` - Obtém carrinho atual
- `addItem(productId, quantity)` - Adiciona item ao carrinho
- `removeItem(productId)` - Remove item do carrinho
- `updateQuantity(productId, quantity)` - Atualiza quantidade do item
- `clear()` - Limpa o carrinho

**Endpoints Utilizados**:
- `GET /api/cart`
- `POST /api/cart/items`
- `DELETE /api/cart/items/:productId`
- `PUT /api/cart/items/:productId`
- `DELETE /api/cart`

---

### 5. orderService.js - Serviço de Pedidos

**Responsabilidade**: Gerenciar pedidos

**Métodos Disponíveis**:
- `getAll()` - Obtém todos os pedidos do usuário
- `getById(id)` - Obtém pedido por ID
- `create(orderData)` - Cria novo pedido

**Endpoints Utilizados**:
- `GET /api/orders`
- `GET /api/orders/:id`
- `POST /api/orders`

---

## Relacionamentos entre Entidades

1. **User ↔ Cart**: Um usuário tem um carrinho (1:1)
2. **User ↔ Order**: Um usuário pode ter vários pedidos (1:N)
3. **Product ↔ Cart**: Um produto pode estar em vários carrinhos (N:N através de items)
4. **Product ↔ Order**: Um produto pode estar em vários pedidos (N:N através de items)

---

## Notas de Implementação

### Backend
- Todos os modelos utilizam armazenamento em memória (arrays/objetos)
- Em produção, estes modelos devem ser substituídos por acesso a banco de dados
- Senhas são armazenadas em texto plano (não recomendado para produção)
- Sessões são gerenciadas através de express-session com cookies

### Frontend
- Os serviços fazem requisições HTTP usando Axios
- Dados do usuário são armazenados no localStorage para uso na UI
- A autenticação real é gerenciada pelo backend através de sessões (cookies)
- Todos os serviços retornam Promises que devem ser tratadas com async/await ou .then()

---

## Data de Criação
2ª Entrega do Trabalho Final - Programação para Web 2025.1

