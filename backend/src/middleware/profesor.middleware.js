import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import ProfesorRepository from '../repositories/profesor.repository.js'

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) {
        return res.status(401).json({
            error: "Token requerido."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const profesor = await ProfesorRepository.findById(decoded.id)

        if(!profesor || profesor.activeToken !== token) {
            return res.status(401).json({
                error: "Sesión inválida."
            })
        }

        req.profesor = decoded
        next()
    } catch(e) {
        return res.status(401).json({
            error: "Token inválido o expirado."
        })
    }
}