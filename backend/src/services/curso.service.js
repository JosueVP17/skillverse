import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

import CursoModel from '../models/curso.model.js'
import CursoRepository from '../repositories/curso.repository.js'

export default {
    async getCursoById(id) {
        const curso = await CursoRepository.findById(id)
        return curso
    },
    async createCurso(profId, payload) {
        const { nombre, ...rest } = payload
        const model = new CursoModel({ nombre, profesor: profId, ...rest })
        const id = uuidv4()

        const created = await CursoRepository.create(id, { ...model })
        return created
    },
    async updateCurso(id, payload){
        const data = { ...payload }

        await CursoRepository.update(id, data)
        return { id }
    },
    async deleteCurso(id) {
        await CursoRepository.delete(id)
        return { id }
    },
    async addLeccion(id, leccion) {
        await CursoRepository.addLeccion(id, leccion)
        return { id, leccion }
    },
    async removeLeccion(id, leccionIndex) {
        await CursoRepository.removeLeccion(id, leccionIndex)
        return { id }
    },
    async updateLeccion(id, leccionIndex, leccionData) {
        await CursoRepository.updateLeccion(id, leccionIndex, leccionData)
        return { id }
    }
}