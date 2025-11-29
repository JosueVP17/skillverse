import Stripe from 'stripe'
import UsuarioService from '../services/usuario.service.js'
import CursoService from '../services/curso.service.js'

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY)

export default {
    async createCheckoutSession(req, res) {
        try {
            const userId = req.params.id
            const usuarioId = req.usuario.id

            // Verificar que el usuario autenticado es el mismo que hace la compra
            if (userId !== usuarioId) {
                return res.status(403).json({ ok: false, message: 'No autorizado' })
            }

            // Obtener el carrito del usuario
            const carrito = await UsuarioService.getCart(userId)
            
            if (!carrito || carrito.length === 0) {
                return res.status(400).json({ ok: false, message: 'El carrito está vacío' })
            }

            // Obtener información de los cursos
            const cursosPromises = carrito.map(cursoId => CursoService.getCursoById(cursoId))
            const cursos = await Promise.all(cursosPromises)

            // Crear line items para Stripe
            const lineItems = cursos.map(curso => ({
                price_data: {
                    currency: 'mxn',
                    product_data: {
                        name: curso.nombre,
                        description: curso.descripcion,
                        images: curso.img ? [curso.img] : [],
                    },
                    unit_amount: Math.round(curso.precio * 100), // Convertir a centavos
                },
                quantity: 1,
            }))

            // Crear sesión de checkout
            const session = await stripeClient.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${process.env.FRONTEND_URL}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_URL}/carrito`,
                client_reference_id: userId, // Para identificar al usuario en el webhook
                metadata: {
                    userId: userId,
                    courseIds: JSON.stringify(carrito)
                }
            })

            return res.json({ ok: true, url: session.url, sessionId: session.id })
        } catch (e) {
            console.error('Error creando sesión de checkout:', e)
            res.status(400).json({ ok: false, message: e.message })
        }
    },

    async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature']
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

        if (!endpointSecret) {
            return res.status(500).send('Webhook secret not configured')
        }

        let event

        try {
            // Verificar que el webhook viene de Stripe
            event = stripeClient.webhooks.constructEvent(req.body, sig, endpointSecret)
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`)
        }

        // Manejar el evento
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object

            try {
                // Extraer información del usuario y cursos
                const userId = session.metadata?.userId
                const courseIdsString = session.metadata?.courseIds

                // Verificar que tenemos datos válidos
                if (!userId) {
                    throw new Error('userId no encontrado en metadata')
                }

                if (!courseIdsString) {
                    throw new Error('courseIds no encontrado en metadata')
                }

                const courseIds = JSON.parse(courseIdsString)
                
                if (!Array.isArray(courseIds) || courseIds.length === 0) {
                    throw new Error('courseIds no es un array válido o está vacío')
                }

                // Procesar la compra: mover cursos del carrito a cursosComprados
                for (let i = 0; i < courseIds.length; i++) {
                    const courseId = courseIds[i]
                    
                    try {
                        // Primero agregar a cursos comprados
                        await UsuarioService.buyCourse(userId, courseId)
                        
                        // Luego remover del carrito
                        await UsuarioService.removeFromCart(userId, courseId)
                    } catch (courseError) {
                        console.error(`Error procesando curso ${courseId}:`, courseError.message)
                    }
                }
            } catch (err) {
                console.error('Error procesando compra:', err.message)
                console.error('Stack:', err.stack)
                // No retornar error para que Stripe no reintente
            }
        } else {
            console.log('Evento ignorado:', event.type)
        }

        // Responder a Stripe que recibimos el webhook
        res.json({ received: true })
    },

    async verifySession(req, res) {
        try {
            const { sessionId } = req.params
            const session = await stripeClient.checkout.sessions.retrieve(sessionId)

            if (session.payment_status === 'paid') {
                return res.json({ ok: true, paid: true, session })
            }

            return res.json({ ok: true, paid: false, session })
        } catch (e) {
            console.error('Error verificando sesión:', e)
            res.status(400).json({ ok: false, message: e.message })
        }
    }
}