import express from 'express'
import cors from 'cors'

import productRoutes from './routes/productRoutes.js'
import healthRoutes from './routes/healthRoutes.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas (Camada de Rotas) apontando para Controllers
app.use('/api/products', productRoutes)
app.use('/api/health', healthRoutes)

export default app


