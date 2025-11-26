import CursoInterface from "../interfaces/curso.interface.js";

export default class CursoModel extends CursoInterface {
    constructor(data){
        super(data)
        this.lecciones = this.lecciones || []
    }

    toJSON() {
        const plain = {}

        for(const key of Object.keys(this)) {
            plain[key] = this[key]
        }

        return plain
    }
}