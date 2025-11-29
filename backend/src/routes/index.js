import express from 'express'
import ProfesorRoutes from './profesor.routes.js'
import UsuarioRoutes from './usuario.routes.js'
import CursoRoutes from './curso.routes.js'
import StripeRoutes from './stripe.routes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        ok: true,
        message: "API profesores y alumnos funcionando"
    })
})

router.use('/profesores', ProfesorRoutes)
router.use('/usuarios', UsuarioRoutes)
router.use('/cursos', CursoRoutes)
router.use('/pagos', StripeRoutes)

export default router