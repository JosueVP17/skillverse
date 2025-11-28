export default class UsuarioInterface {
    constructor({
        nombre, apaterno, amaterno, edad, email, password, foto}) {
            this.nombre = nombre
            this.apaterno = apaterno
            this.amaterno = amaterno
            this.edad = edad
            this.email = email
            this.password = password
            this.foto = foto || ''
    }
}