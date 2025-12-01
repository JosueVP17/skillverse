import UsuarioInterface from "../interfaces/usuario.interface.js";

export default class UsuarioModel extends UsuarioInterface {
    constructor(data){
        super(data)
        this.activeToken = null
        this.cursosComprados = this.cursosComprados || []
        this.comentarios = this.comentarios || []
        this.carrito = this.carrito || []
    }

    toJSON() {
        const plain = {}

        for(const key of Object.keys(this)) {
            plain[key] = this[key]
        }

        return plain
    }
}