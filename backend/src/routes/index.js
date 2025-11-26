import express from 'express'
import ProfesorRoutes from './profesor.routes.js'
import UsuarioRoutes from './usuario.routes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        ok: true,
        mesage: "API profesores y alumnos funcionando"
    })
})

router.use('/profesores', ProfesorRoutes)
router.use('/usuarios', UsuarioRoutes) 

export default router