import Stripe from 'stripe'
import UsuarioService from "../services/usuario.service.js";
import CursoService from '../services/curso.service.js'

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY)

// Helper para procesar la compra
const processPurchaseHelper = async (userId, courseIds) => {
    console.log('Processing courses:', courseIds)

    for (let i = 0; i < courseIds.length; i++) {
        const courseId = courseIds[i]
        
        try {
            console.log(`Adding course ${courseId} to purchased courses for user ${userId}`)
            // Primero agregar a cursos comprados
            await UsuarioService.buyCourse(userId, courseId)
            
            console.log(`Removing course ${courseId} from cart for user ${userId}`)
            // Luego remover del carrito
            await UsuarioService.removeFromCart(userId, courseId)
            
            console.log(`Course ${courseId} processed successfully`)
        } catch (courseError) {
            console.error(`Error procesando curso ${courseId}:`, courseError.message)
        }
    }
}

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
            console.error('Webhook signature verification failed:', err.message)
            return res.status(400).send(`Webhook Error: ${err.message}`)
        }

        console.log('Webhook received:', event.type)

        // Manejar el evento
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object
            console.log('Session completed:', session.id)

            try {
                // Extraer información del usuario y cursos
                const userId = session.metadata?.userId
                const courseIdsString = session.metadata?.courseIds

                console.log('Metadata received:', { userId, courseIdsString })

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

                // Usar el helper para procesar la compra
                await processPurchaseHelper(userId, courseIds)
                
                console.log('Purchase processed successfully')
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
    },

    async processPurchase(req, res) {
        try {
            const { sessionId } = req.params
            const userId = req.usuario.id

            console.log('Processing purchase for session:', sessionId)

            // Obtener la sesión de Stripe
            const session = await stripeClient.checkout.sessions.retrieve(sessionId)

            if (session.payment_status !== 'paid') {
                return res.status(400).json({ ok: false, message: 'El pago aún no ha sido completado' })
            }

            // Verificar que el usuario autenticado es el propietario de la sesión
            if (session.metadata?.userId !== userId) {
                return res.status(403).json({ ok: false, message: 'No autorizado' })
            }

            // Extraer los cursos de la metadata
            const courseIdsString = session.metadata?.courseIds
            if (!courseIdsString) {
                return res.status(400).json({ ok: false, message: 'No se encontraron cursos en la sesión' })
            }

            const courseIds = JSON.parse(courseIdsString)
            if (!Array.isArray(courseIds) || courseIds.length === 0) {
                return res.status(400).json({ ok: false, message: 'Lista de cursos inválida' })
            }

            // Procesar la compra
            await processPurchaseHelper(userId, courseIds)

            console.log('Purchase processed successfully')
            return res.json({ ok: true, message: 'Compra procesada exitosamente', courses: courseIds })
        } catch (e) {
            console.error('Error procesando compra:', e)
            res.status(400).json({ ok: false, message: e.message })
        }
    }
}