import { db, admin } from '../config/firebase.js'

const COLLECTION = 'cursos'

export default {
    async create(id, data) {
        await db.collection(COLLECTION).doc(id).set(data)
        return { id }
    },
    async update(id, data) {
        await db.collection(COLLECTION).doc(id).update(data)
        return { id }
    },
    async delete(id) {
        await db.collection(COLLECTION).doc(id).delete()
        return { id }
    },
    async findById(id) {
        const doc = await db.collection(COLLECTION).doc(id).get()
        return doc.exists ? { id: doc.id, ...doc.data() } : null
    },
    async addLeccion(id, leccion) {
        await db.collection(COLLECTION).doc(id).update({
            lecciones: admin.firestore.FieldValue.arrayUnion(leccion)
        })
        return { id }
    },
    async removeLeccion(id, leccionIndex) {
        const curso = await this.findById(id)
        if (!curso || !curso.lecciones) {
            throw new Error('Curso o lecciones no encontradas')
        }

        const lecciones = curso.lecciones || []
        lecciones.splice(leccionIndex, 1)

        await db.collection(COLLECTION).doc(id).update({ lecciones })
        return { id }
    },
    async updateLeccion(id, leccionIndex, leccionData) {
        const curso = await this.findById(id)
        if (!curso || !curso.lecciones) {
            throw new Error('Curso o lecciones no encontradas')
        }

        const lecciones = curso.lecciones || []
        if(leccionIndex < 0 || leccionIndex >= lecciones.length) {
            throw new Error('Índice de lección inválido')
        }

        lecciones[leccionIndex] = { ...lecciones[leccionIndex], ...leccionData }

        await db.collection(COLLECTION).doc(id).update({ lecciones })
        return { id }
    }
}