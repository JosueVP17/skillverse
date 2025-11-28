import express from 'express'
import ProfesorController from '../controllers/profesor.controller.js'
import { verifyToken } from '../middleware/profesor.middleware.js'
import { validate } from '../middleware/validateProfesor.middleware.js'
import { idProfesorSchema, loginProfesorSchema, registerProfesorSchema, updateProfesorSchema } from '../schemas/profesor.schema.js'

const ProfesorRoutes = express.Router()

// Las rutas más específicas deben ir primero
ProfesorRoutes.get(
    '/profile',
    verifyToken,
    ProfesorController.getProfile
)

ProfesorRoutes.get(
    '/:id',
    validate(idProfesorSchema, 'params'),
    ProfesorController.getProfesorById
)
ProfesorRoutes.post(
    '/register',
    validate(registerProfesorSchema),
    ProfesorController.register
)
ProfesorRoutes.post(
    '/login',
    validate(loginProfesorSchema),
    ProfesorController.login
)
ProfesorRoutes.post(
    '/logout',
    verifyToken,
    ProfesorController.logout
)
ProfesorRoutes.put(
    '/update/:id',
    validate(idProfesorSchema, 'params'),
    validate(updateProfesorSchema),
    verifyToken,
    ProfesorController.update
)
ProfesorRoutes.delete(
    '/delete/:id',
    validate(idProfesorSchema, 'params'),
    verifyToken,
    ProfesorController.delete
)


export default ProfesorRoutes