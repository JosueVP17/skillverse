import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

import CursoModel from '../models/curso.model.js'
import CursoRepository from '../repositories/curso.repository.js'
import ProfesorRepository from '../repositories/profesor.repository.js'
import UsuarioRepository from '../repositories/usuario.repository.js'

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
    },
    async addComment(id, usuarioId, payload) {
        const { texto, valoracion, anonimo } = payload
        const comentarioId = uuidv4()
        const timestamp = new Date().toISOString()
        
        // Obtener nombre y foto del usuario solo si no es anónimo
        let nombreUsuario = null
        let fotoUsuario = null
        if (!anonimo) {
            try {
                const usuario = await UsuarioRepository.findById(usuarioId)
                if (usuario) {
                    nombreUsuario = `${usuario.nombre || ''} ${usuario.apaterno || ''}`.trim()
                    fotoUsuario = usuario.foto || null
                }
            } catch(e) {
                console.error('Error obteniendo datos del usuario:', e)
            }
        }
        
        const comentario = {
            id: comentarioId,
            usuarioId,
            nombreUsuario,
            fotoUsuario,
            anonimo: !!anonimo,
            texto,
            valoracion,
            fecha: timestamp
        }
        
        await CursoRepository.addComment(id, comentario)
        return comentario
    },
    async removeComment(id, comentarioId) {
        await CursoRepository.removeComment(id, comentarioId)
        return { id }
    },
    async updateComment(id, comentarioId, payload) {
        await CursoRepository.updateComment(id, comentarioId, payload)
        return { id }
    },
    async getAllCursos(){
        const cursos = await CursoRepository.getAll()
        return cursos
    }
}