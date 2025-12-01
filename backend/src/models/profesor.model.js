import ProfesorInterface from "../interfaces/profesor.interface.js"

export default class ProfesorModel extends ProfesorInterface {
    constructor(data) {
        super(data)

        this.activeToken = null
        this.cursos = this.cursos || []
    }

    toJSON() {
        const plain = {}

        for(const key of Object.keys(this)) {
            plain[key] = this[key]
        }

        return plain
    }
}