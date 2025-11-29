export default class CursoInterface {
    constructor({
        nombre, descripcion, categoria, duracion, precio, complejidad, profesor, img, lecciones, comentarios}) {
            this.nombre = nombre
            this.descripcion = descripcion
            this.categoria = categoria
            this.duracion = duracion
            this.precio = precio
            this.complejidad = complejidad
            this.profesor = profesor
            this.img = img
            this.lecciones = lecciones || []
            this.comentarios = comentarios || []
    }
}