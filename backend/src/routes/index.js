import express from 'express'
import ProfesorRoutes from './profesor.routes.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json({
        ok: true,
        mesage: "API profesores y alumnos funcionando"
    })
})

router.use('/profesores', ProfesorRoutes)

export default router