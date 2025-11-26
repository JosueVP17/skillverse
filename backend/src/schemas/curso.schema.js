import { z } from 'zod'

const baseCursoSchema = {
    nombre: z.string().min(1, 'El título es requerido.'),
    descripcion: z.string().min(1, 'La descripción es requerida.'),
    categoria: z.string().min(1, 'La categoría es requerida.'),
    duracion: z.number().positive('La duración debe ser un número positivo.'),
    precio: z.number().min(0, 'El precio no puede ser negativo.'),
    complejidad: z.enum(['Principiante', 'Intermedio', 'Avanzado'], {
        errorMap: () => ({ message: 'El nivel debe ser Principiante, Intermedio o Avanzado.' })
    }),
    img: z.string().url('La imagen debe ser una URL válida.'),
}

export const createCursoSchema = z.object({
    ...baseCursoSchema,
})

export const updateCursoSchema = z.object({
    nombre: z.string().min(1, 'El título es requerido.').optional(),
    descripcion: z.string().min(1, 'La descripción es requerida.').optional(),
    categoria: z.string().min(1, 'La categoría es requerida.').optional(),
    duracion: z.number().positive('La duración debe ser un número positivo.').optional(),
    precio: z.number().min(0, 'El precio no puede ser negativo.').optional(),
    complejidad: z.enum(['Principiante', 'Intermedio', 'Avanzado'], {
        errorMap: () => ({ message: 'El nivel debe ser Principiante, Intermedio o Avanzado.' })
    }).optional(),
    img: z.string().url('La imagen debe ser una URL válida.').optional(),
})

export const idCursoSchema = z.object({
    id: z.uuid()
})
