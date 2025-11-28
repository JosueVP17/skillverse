import { db, admin } from '../config/firebase.js'

const COLLECTION = 'cursos'

export default {
    async create(id, data) {
        await db.collection(COLLECTION).doc(id).set(data)
        const doc = await db.collection(COLLECTION).doc(id).get()
        return { id: doc.id, ...doc.data() }
    },
    async update(id, data) {
        await db.collection(COLLECTION).doc(id).update(data)
        const doc = await db.collection(COLLECTION).doc(id).get()
        return { id: doc.id, ...doc.data() }
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
    },
    async addComment(id, comentario) {
        await db.collection(COLLECTION).doc(id).update({
            comentarios: admin.firestore.FieldValue.arrayUnion(comentario)
        })
        return { id }
    },
    async removeComment(id, comentarioId) {
        const curso = await this.findById(id)
        if (!curso || !curso.comentarios) {
            throw new Error('Curso o comentarios no encontrados')
        }

        const comentarios = (curso.comentarios || []).filter(c => c.id !== comentarioId)

        await db.collection(COLLECTION).doc(id).update({ comentarios })
        return { id }
    },
    async updateComment(id, comentarioId, comentarioData) {
        const curso = await this.findById(id)
        if (!curso || !curso.comentarios) {
            throw new Error('Curso o comentarios no encontrados')
        }

        const comentarios = (curso.comentarios || []).map(c => 
            c.id === comentarioId ? { ...c, ...comentarioData } : c
        )

        await db.collection(COLLECTION).doc(id).update({ comentarios })
        return { id }
    },
    async getAll() {
        const snapshot = await db.collection(COLLECTION).get()
        const cursos = []

        for (const doc of snapshot.docs) {
            const data = doc.data()
            let profesor = null
            
            if (data.profesor) {
                const profSnap = await db.collection('profesores').doc(data.profesor).get()
                if (profSnap.exists) {
                    profesor = { id: profSnap.id, nombre: profSnap.data().nombre+' '+profSnap.data().apaterno +' ' +profSnap.data().amaterno, img: profSnap.data().foto}
                }
            }

            cursos.push({
                id: doc.id,
                ...data,
                profesor 
            })
        }

        return cursos
    }

}