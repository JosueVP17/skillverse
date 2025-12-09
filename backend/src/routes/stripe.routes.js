import express from 'express'
import dotenv from 'dotenv'
import { verifyToken } from '../middleware/usuario.middleware.js'
import { validate } from '../middleware/validateUsuario.middleware.js'
import { idUsuarioSchema } from '../schemas/usuario.schema.js'
import { verifySessionSchema } from '../schemas/stripe.schema.js'
import StripeController from '../controllers/stripe.controller.js'

dotenv.config()

const StripeRoutes = express.Router()

// Crear sesión de checkout desde el carrito del usuario
StripeRoutes.post(
    '/checkout/:id',
    validate(idUsuarioSchema, 'params'),
    verifyToken,
    StripeController.createCheckoutSession
)

// Verificar estado de una sesión de pago
StripeRoutes.get(
    '/verify-session/:sessionId',
    validate(verifySessionSchema, 'params'),
    verifyToken,
    StripeController.verifySession
)

// Procesar la compra después de verificar el pago (para desarrollo sin webhooks)
StripeRoutes.post(
    '/process-purchase/:sessionId',
    validate(verifySessionSchema, 'params'),
    verifyToken,
    StripeController.processPurchase
)

// Nota: El webhook se maneja directamente en app.js antes del JSON parser

export default StripeRoutes