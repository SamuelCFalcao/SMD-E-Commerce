const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Importar rotas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando corretamente' });
});

// Middleware de erro (deve ser o último)
app.use(errorHandler);

module.exports = app;

