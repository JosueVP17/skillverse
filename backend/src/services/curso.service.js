import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

import CursoModel from '../models/curso.model.js'
import CursoRepository from '../repositories/curso.repository.js'
import ProfesorRepository from '../repositories/profesor.repository.js'

export default {
    async createCurso(profId, payload) {
        const { nombre, ...rest } = payload
        const model = new CursoModel({ nombre, profesor: profId, ...rest })
        const id = uuidv4()

        const created = await CursoRepository.create(id, { ...model })
        
        // Agregar el curso a la lista de cursos del profesor
        try {
            const profesor = await ProfesorRepository.findById(profId)
            const cursos = profesor.cursos || []
            cursos.push(id)
            await ProfesorRepository.update(profId, { cursos })
        } catch(e) {
            console.error('Error agregando curso al profesor:', e)
        }
        
        return created
    },
    async updateCurso(id, payload){
        const data = { ...payload }

        await CursoRepository.update(id, data)
        return await CursoRepository.findById(id)
    },
    async deleteCurso(id) {
        // Obtener el curso antes de eliminarlo para saber quién es el profesor
        const curso = await CursoRepository.findById(id)
        
        // Eliminar el curso de la colección
        await CursoRepository.delete(id)
        
        // Remover el ID del curso de la lista de cursos del profesor
        if (curso && curso.profesor) {
            try {
                const profesor = await ProfesorRepository.findById(curso.profesor)
                const cursos = (profesor.cursos || []).filter(cursoId => cursoId !== id)
                await ProfesorRepository.update(curso.profesor, { cursos })
            } catch(e) {
                console.error('Error removiendo curso del profesor:', e)
            }
        }
        
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