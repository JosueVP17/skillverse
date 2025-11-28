import express from 'express'
import CursoController from '../controllers/curso.controller.js'
import { verifyToken } from '../middleware/profesor.middleware.js'
import { validate } from '../middleware/validateCurso.middleware.js'
import { idCursoSchema, createCursoSchema, updateCursoSchema, addLeccionSchema, idCursoWithIndexSchema, updateLeccionSchema } from '../schemas/curso.schema.js'

const CursoRoutes = express.Router()

CursoRoutes.get(
    '/:id',
    validate(idCursoSchema, 'params'),
    CursoController.getById
)
CursoRoutes.post(
    '/create',
    verifyToken,
    validate(createCursoSchema),
    CursoController.create
)
CursoRoutes.put(
    '/update/:id',
    validate(idCursoSchema, 'params'),
    validate(updateCursoSchema),
    verifyToken,
    CursoController.update
)
CursoRoutes.delete(
    '/delete/:id',
    validate(idCursoSchema, 'params'),
    verifyToken,
    CursoController.delete
)
CursoRoutes.post(
    '/:id/lecciones',
    validate(idCursoSchema, 'params'),
    validate(addLeccionSchema),
    verifyToken,
    CursoController.addLeccion
)
CursoRoutes.delete(
    '/:id/lecciones/:index',
    validate(idCursoWithIndexSchema, 'params'),
    verifyToken,
    CursoController.removeLeccion
)
CursoRoutes.put(
    '/:id/lecciones/:index',
    validate(idCursoWithIndexSchema, 'params'),
    validate(updateLeccionSchema),
    verifyToken,
    CursoController.updateLeccion
)
CursoRoutes.get(
    '/',
    CursoController.getAll
)

export default CursoRoutes