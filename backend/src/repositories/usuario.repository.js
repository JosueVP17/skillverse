import { db, admin } from '../config/firebase.js'

const COLLECTION = 'usuarios'

export default {
    async register(id,data){
        const ref = await db.collection(COLLECTION).doc(id).set(data)
        return { id }
    },
    async update(id,data){
        await db.collection(COLLECTION).doc(id).update(data)
        return { id }
    },
    async remove(id){
        await db.collection(COLLECTION).doc(id).delete()
        return { id }
    },
    async findById(id){
        const doc = await db.collection(COLLECTION).doc(id).get()
        return doc.exists ? {id: doc.id, ...doc.data()}: null
    },
    async findByEmail(email){
        const snap = await db.collection(COLLECTION).where('email','==',email).limit(1).get()

        return snap.empty ? null : {id: snap.docs[0].id, ...snap.docs[0].data()}
    },

    async buyCourse(id, courseId){
        await db.collection(COLLECTION).doc(id).update({
            cursosComprados: admin.firestore.arrayUnion(courseId)
        })
        return { id }
    },

    async addComment(id,commentId){
        await db.collection(COLLECTION).doc(id).update({
            cursosComprados:admin.firestore.arrayUnion(commentId)
        })
        return {id}
    },

    async removeComment(id, commentId){
        await db.collection(COLLECTION).doc(id).update({
            comentarios: admin.firestore.FieldValue.arrayRemove(commentId)
        })
        return {id}
    },

    async getCart(id){
        return (await this.findById(id))?.carrito || []
    },

    async addToCart(id, courseId){
        await db.collection(COLLECTION).doc(id).update({
            carrito: admin.firestore.FieldValue.arrayUnion(courseId)
        })
        return { id }
    },

    async removeFromCart(id, courseId){
        await db.collection(COLLECTION).doc(id).update({
            carrito: admin.firestore.FieldValue.arrayRemove(courseId)
        })
        return { id }
    }
}