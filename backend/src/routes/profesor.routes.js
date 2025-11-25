import express from 'express'
import ProfesorController from '../controllers/profesor.controller.js'
import { verifyToken } from '../middleware/profesor.middleware.js'

const ProfesorRoutes = express.Router()

ProfesorRoutes.post('/register', ProfesorController.register)
ProfesorRoutes.post('/login', ProfesorController.login)
ProfesorRoutes.post('/logout', verifyToken, ProfesorController.logout)
ProfesorRoutes.put('/update/:id', verifyToken, ProfesorController.update)
ProfesorRoutes.delete('/delete/:id', verifyToken, ProfesorController.delete)

export default ProfesorRoutes