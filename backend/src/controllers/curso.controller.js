import CursoService from '../services/curso.service.js'

export default {
    async getById(req, res) {
        try {
            const curso = await CursoService.getCursoById(req.params.id)
            res.status(200).json({ ok: true, curso })
        } catch (e) {
            res.status(400).json({ ok: false, message: e.message })
        }
    },
    async create(req, res) {
        try {
            const profId = req.profesor.id
            const result = await CursoService.createCurso(profId, req.body)
            res.status(201).json({ ok: true, result })
        } catch (e) {
            res.status(400).json({ ok: false, message: e.message })
        }
    },
    async update(req, res){
        try{
            const result = await CursoService.updateCurso(req.params.id, req.body)
            res.status(201).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message })
        }
    },
    async delete(req, res){
        try{
            const result = await CursoService.deleteCurso(req.params.id)
            res.status(201).json({ok: true, result})
        }catch(e){
            res.status(400).json({ok: false, message: e.message })
        }
    },
    async addLeccion(req, res){
        try{
            const result = await CursoService.addLeccion(req.params.id, req.body)
            res.status(201).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message })
        }
    },
    async removeLeccion(req, res){
        try{
            const result = await CursoService.removeLeccion(req.params.id, parseInt(req.params.index))
            res.status(201).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message })
        }
    },
    async updateLeccion(req, res){
        try{
            const result = await CursoService.updateLeccion(req.params.id, parseInt(req.params.index), req.body)
            res.status(201).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message })
        }
    },
    async getAll(req,res){
        try{
            const result =  await CursoService.getAllCursos()
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    }
}