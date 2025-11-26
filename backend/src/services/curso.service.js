import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

import CursoModel from '../models/curso.model.js'
import CursoRepository from '../repositories/curso.repository.js'

export default {
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
    async addLectureToProfesor(id, lectId) {
        await CursoRepository.addLecture(id, lectId)
        return { id, lectId }
    },

    async removeLectureFromProfesor(id, lectId) {
        await CursoRepository.removeLecture(id, lectId)
        return { id, lectId }
    }
}