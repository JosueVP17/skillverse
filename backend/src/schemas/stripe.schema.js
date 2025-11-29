import { z } from 'zod'

export const verifySessionSchema = z.object({
    sessionId: z.string().min(1, 'El ID de sesión es requerido')
})