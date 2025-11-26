import CursoService from '../services/curso.service.js'

export default {
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
    async addLectureToProfesor(req, res){
        try{
            const result = await CursoService.addLectureToProfesor(req.params.id, req.body.lectId)
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    },
    async removeLectureFromProfesor(req, res){
        try{
            const result = await CursoService.removeLectureFromProfesor(req.params.id, req.body.lectId)
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    }
}