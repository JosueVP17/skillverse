import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

import UsuarioModel from '../models/usuario.model.js'
import UsuarioRepository from '../repositories/usuario.repository.js'

const TOKEN_EXP = '2h'

export default {
    async registerUsuario(payload){
        const {email, password, ...rest} = payload

        const byEmail = await UsuarioRepository.findByEmail(email)
        if(byEmail) throw new Error('Ya existe usuario con el mismo email.')
        
        const hash = await bcrypt.hash(password,10)
        const model = new UsuarioModel({email, password: hash, ...rest})
        const id = uuidv4()
        const registered = await UsuarioRepository.register(id, {...model})
        return registered
    },

    async updateUsuario(id,payload){
        const data = {...payload}
        if(data.password){
            data.password = await bcrypt.hash(data.password,10)
        }
        await UsuarioRepository.update(id,data)
        return {id}
    },

    async deleteUsuario(id){
        await UsuarioRepository.remove(id)
        return {id}
    },

    async login(email,password){
        const usuario = await UsuarioRepository.findByEmail(email)

        if(!usuario) throw new Error('Email no encontrado.')

        const okPass = await bcrypt.compare(password, usuario.password ?? '')
        if(!okPass) throw new Error ('Password incorrecto.')

        if(usuario.activeToken){
            try{
                jwt.verify(usuario.activeToken, process.env.JWT_SECRET)
                throw new Error('El usuario ya tiene una sesión activa.')
            }catch(e){
                console.log('Token expirado.')
            }
        }

        // INCLUIR EMAIL EN EL TOKEN
        const token = jwt.sign({
            id: usuario.id, 
            nombre: usuario.nombre, 
            apaterno: usuario.apaterno,
            email: usuario.email,
            rol: 'estudiante'  // Para diferenciarlo del profesor
        },
            process.env.JWT_SECRET,
            {expiresIn: TOKEN_EXP}
        )

        await UsuarioRepository.update(usuario.id, { activeToken: token})
        return token
    },

    async logout(id){
        return UsuarioRepository.update(id, {activeToken: null})
    },

    async buyCourse(id, courseId){
        await UsuarioRepository.buyCourse(id, courseId)
        return {id, courseId}
    },

    async addCommentToUser(id, commentId){
        await UsuarioRepository.addComment(id, commentId)
        return {id, commentId}
    },

    async removeCommentFromUser(id, commentId){
        await UsuarioRepository.removeComment(id, commentId)
        return {id, commentId}
    },

    async getCart(id){
        const carrito =  await UsuarioRepository.getCart(id)
        return carrito
    },

    async addToCart(id, courseId){
        await UsuarioRepository.addToCart(id, courseId)
        return { id, courseId }
    },

    async removeFromCart(id, courseId){
        await UsuarioRepository.removeFromCart(id, courseId)
        return { id, courseId }
    }
}