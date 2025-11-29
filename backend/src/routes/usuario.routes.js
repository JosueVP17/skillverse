import express from 'express'
import UsuarioController from '../controllers/usuario.controller.js'
import { verifyToken } from '../middleware/usuario.middleware.js' 
import { validate } from '../middleware/validateUsuario.middleware.js'

import { idUsuarioSchema, idUsuarioWithCourseIdSchema,loginUsuarioSchema, registerUsuarioSchema, updateUsuarioSchema } from '../schemas/usuario.schema.js'

const UsuarioRoutes = express.Router()

UsuarioRoutes.post( '/register', 
    validate(registerUsuarioSchema), UsuarioController.register)

UsuarioRoutes.post('/login',
    validate(loginUsuarioSchema),UsuarioController.login)

UsuarioRoutes.post('/logout',
    verifyToken,  
    UsuarioController.logout)

UsuarioRoutes.put('/update/:id',
    validate(idUsuarioSchema, 'params'), 
    validate(updateUsuarioSchema), 
    verifyToken, 
    UsuarioController.update)

UsuarioRoutes.delete('/delete/:id',
    validate(idUsuarioSchema,'params'),
    verifyToken,
    UsuarioController.delete
)

UsuarioRoutes.get('/:id/carrito',
    validate(idUsuarioSchema, 'params'),
    verifyToken,
    UsuarioController.getCart
)

UsuarioRoutes.post('/:id/carrito/:courseId',
    validate(idUsuarioWithCourseIdSchema, 'params'),
    verifyToken,
    UsuarioController.addToCartUser
)

UsuarioRoutes.delete('/:id/carrito/:courseId',
    validate(idUsuarioWithCourseIdSchema, 'params'),
    verifyToken,
    UsuarioController.removeFromCartUser
)

UsuarioRoutes.get('/:id/cursos-comprados',
    validate(idUsuarioSchema, 'params'),
    verifyToken,
    UsuarioController.getPurchasedCourses
)

UsuarioRoutes.get('/profile',
    verifyToken,
    UsuarioController.getProfile
)

UsuarioRoutes.get('/foto/:id',
    validate(idUsuarioSchema, 'params'),
    UsuarioController.getUsuarioById
)

UsuarioRoutes.get('/:id',
    validate(idUsuarioSchema, 'params'),
    verifyToken,
    UsuarioController.getUsuarioById
)

export default UsuarioRoutes