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