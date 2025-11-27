import ProfesorService from "../services/profesor.service.js"

export default {
    async getProfesorById(req, res) {
        try {
            const profesor = await ProfesorService.getById(req.params.id)
            res.status(200).json({ ok: true, profesor })
        } catch (e) {
            res.status(400).json({ ok: false, message: e.message })
        }
    },

    async register(req, res) {
        try {
            const result = await ProfesorService.registerProfesor(req.body)
            res.status(201).json({ ok: true, result })
        } catch(e) {
            res.status(400).json({ ok: false, message: e.message })
        }
    },

    async update(req, res) {
        try {
            const result = await ProfesorService.updateProfesor(req.params.id, req.body)
            res.status(201).json({ ok: true, result })
        } catch(e) {
            res.status(400).json({ ok: false, message: e.message })
        }
    },

    async delete(req, res) {
        try {
            const result = await ProfesorService.deleteProfesor(req.params.id)
            res.status(201).json({ ok: true, result })
        } catch(e) {
            res.status(400).json({ ok: false, message: e.message })
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body
            const token = await ProfesorService.login(email, password)
            res.status(200).json({ ok: true, token })
        } catch(e) {
            res.status(401).json({ ok: false, message: e.message })
        }
    },

    async logout(req, res) {
        try {
            const id = req.profesor.id
            await ProfesorService.logout(id)
            
            res.status(201).json({
                message: "Cerrado de sesión exitoso."
            })
        } catch(e) {
            res.status(400).json({ error: e.message })
        }
    },

    async addCourseToProfesor(req, res) {
        try {
            const result = await ProfesorService.addCourseToProfesor(req.params.id, req.body.cursoId)
            res.status(200).json({ ok: true, result })
        } catch(e) {
            res.status(400).json({ ok: false, message: e.message})
        }
    },

    async removeCourseFromProfesor(req, res) {
        try {
            const result = await ProfesorService.removeCourseFromProfesor(req.params)
            res.status(200).json({ ok: true, result })
        } catch(e) {
            res.status(400).json({ ok: false, message: e.message })
        }
    }
}