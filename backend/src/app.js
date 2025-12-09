import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'
import StripeController from './controllers/stripe.controller.js'

dotenv.config()

const app = express()

// Configurar CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions))

// Webhook de Stripe DEBE ir ANTES de express.json() para recibir raw body
app.post('/api/stripe/webhook', 
    express.raw({ type: 'application/json' }),
    StripeController.handleWebhook
)

// Después aplicar el parser JSON para el resto de rutas
app.use(express.json())
app.use('/api/', routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor trabajando en ${PORT}`)
})