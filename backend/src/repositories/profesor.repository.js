import { db } from '../config/firebase.js'

const COLLECTION = 'profesores'

export default {
    async register(id, data) {
        //const plainData = typeof data.toJSON === 'function' ? data.toJSON() : data
        const ref = await db.collection(COLLECTION).doc(id).set(data)
        return { id }
    },

    async update(id, data) {
        await db.collection(COLLECTION).doc(id).update(data)
        return { id }
    },

    async remove(id) {
        await db.collection(COLLECTION).doc(id).delete()
        return { id }
    },

    async findById(id) {
        const doc = await db.collection(COLLECTION).doc(id).get()
        return doc.exists ? { id: doc.id, ...doc.data() } : null
    },

    async findByEmail(email) {
        const snap = await db.collection(COLLECTION).where('email', '==', email).limit(1).get()

        return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() }
    },

    async addCourse(id, courseId) {
        await db.collection(COLLECTION).doc(id).update({
            cursos: admin.firestore.FieldValue.arrayUnion(courseId)
        })
        return { id }
    },

    async removeCourse(id, courseId) {
        await db.collection(COLLECTION).doc(id).update({
            cursos: admin.firestore.FieldValue.arrayRemove(courseId)
        })
        return { id }
    }
}