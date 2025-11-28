import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'
dotenv.config()

import ProfesorModel from '../models/profesor.model.js'
import ProfesorRepository from '../repositories/profesor.repository.js'

const TOKEN_EXP = '2h'

export default {
    async registerProfesor(payload) {
        const { email, password, ...rest } = payload

        const byEmail = await ProfesorRepository.findByEmail(email)
        if(byEmail) throw new Error('Ya existe un profesor con el mismo email.')

        const hash = await bcrypt.hash(password, 10)
        const model = new ProfesorModel({
            email, password: hash, ...rest
        })
        const id = uuidv4()

        const registered = await ProfesorRepository.register(id, {...model})
        return registered
    },

    async updateProfesor(id, payload) {
        const data = { ...payload }
        if(data.password) {
            data.password = await bcrypt.hash(data.password, 10)
        }
        await ProfesorRepository.update(id, data)
        return { id }
    },

    async deleteProfesor(id) {
        await ProfesorRepository.remove(id)
        return { id }
    },

    async login(email, password) {
        const profesor = await ProfesorRepository.findByEmail(email)
        if(!profesor) throw new Error('Email no encontrado.')

        const okPass = await bcrypt.compare(password, profesor.password ?? '')
        if(!okPass) throw new Error('Password incorrecto.')

        if(profesor.activeToken) {
            try {
                jwt.verify(profesor.activeToken, process.env.JWT_SECRET)
                throw new Error('El profesor ya tiene una sesión activa.')
            } catch(e) {
                console.log('Token expirado.')
            }
        }

        // INCLUIR EMAIL EN EL TOKEN
        const token = jwt.sign(
            { 
                id: profesor.id, 
                nombre: profesor.nombre, 
                profesor: profesor.ocupacion, 
                email: profesor.email,
                rol: "profesor" 
            },
            process.env.JWT_SECRET,
            { expiresIn: TOKEN_EXP}
        )

        await ProfesorRepository.update(profesor.id, { activeToken: token })
        return token
    },

    async logout(id) {
        return ProfesorRepository.update(id, { activeToken: null })
    },

    async addCourseToProfesor(id, courseId) {
        await ProfesorRepository.addCourse(id, courseId)
        return { id, courseId }
    },

    async removeCourseFromProfesor(id, courseId) {
        await ProfesorRepository.removeCourse(id, courseId)
        return { id, courseId }
    },

    async getProfesor(id) {
        const profesor = await ProfesorRepository.findById(id)
        if(!profesor) throw new Error('Profesor no encontrado')
        return profesor
    }
}