import express from 'express'
import CursoController from '../controllers/curso.controller.js'
import { verifyToken } from '../middleware/profesor.middleware.js'
import { validate } from '../middleware/validateCurso.middleware.js'
import { idCursoSchema, createCursoSchema, updateCursoSchema } from '../schemas/curso.schema.js'

const CursoRoutes = express.Router()

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

export default CursoRoutes