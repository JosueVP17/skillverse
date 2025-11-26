import { db } from '../config/firebase.js'

const COLLECTION = 'cursos'

export default {
    async create(id, data) {
        const ref = await db.collection(COLLECTION).doc(id).set(data)
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
    async addLecture(id, lectId) {
        await db.collection(COLLECTION).doc(id).update({
            lecciones: admin.firestore.FieldValue.arrayUnion(lectId)
        })
        return { id }
    },
    async removeLecture(id, lectId) {
        await db.collection(COLLECTION).doc(id).update({
            cursos: admin.firestore.FieldValue.arrayRemove(lectId)
        })
        return { id }
    }
}