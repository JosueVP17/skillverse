import UsuarioService from "../services/usuario.service.js";

export default{
    async register(req,res){
        try{
            const result = await UsuarioService.registerUsuario(req.body)
            res.status(201).json({ok: true, result})
        } catch(e){
            res.status(400).json({ok: false, message: e.message })
        }
    },

    async update(req,res){
        try{
            const result = await UsuarioService.updateUsuario(req.params.id, req.body)
            res.status(201).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message })
        }
    },

    async delete(req,res){
        try{
            const result = await UsuarioService.deleteUsuario(req.params.id)
            res.status(201).json({ok: true, result})
        }catch(e){
            res.status(400).json({ok: false, message: e.message })
        }
    },

    async login(req, res){
        try{
            const { email, password } = req.body
            const token = await UsuarioService.login(email, password)
            res.status(200).json({ok: true, token})
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    },

    async logout(req,res){
        try{
            const id = req.usuario.id
            await UsuarioService.logout(id)
            
            res.status(200).json({message: "Cerrado de sesión exitoso."}) 
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    },

    async addCommentToUser(req,res){
        try{
            const result = await UsuarioService.addCommentToUser(req.params.id, req.body.commentId)
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    },

    async removeCommentFromUser(req,res){
        try{
            const result = await UsuarioService.removeCommentFromUser(req.params.id, req.body.commentId)
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    },

    async buyCourseUser(req,res){
        try{
            const result = await UsuarioService.buyCourse(req.params.id, req.body.courseId)
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    },

    async getProfile(req,res){
        try{
            const id = req.usuario.id
            const result = await UsuarioService.getUsuario(id)
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    },

    async getUsuarioById(req,res){
        try{
            const { id } = req.params
            const result = await UsuarioService.getUsuario(id)
            res.status(200).json({ ok: true, result })
        }catch(e){
            res.status(400).json({ ok: false, message: e.message})
        }
    }
}