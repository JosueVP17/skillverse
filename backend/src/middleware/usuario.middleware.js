import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import UsuarioRepository from '../repositories/usuario.repository.js'

export const verifyToken = async(req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({ error: "Token requerido "})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const usuario = await UsuarioRepository.findById(decoded.id)

        if(!usuario || usuario.activeToken !== token ){
            return res.status(401).json({ error: "Sesión inválida."})
        }

        req.usuario = decoded
        next()

    }catch(e){
        return res.status(401).json({error: "Token inválido o expirado."})
    }
}