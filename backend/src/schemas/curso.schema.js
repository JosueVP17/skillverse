import { z } from 'zod'

const baseLeccionSchema = {
    imagen: z.url('La imagen debe ser una URL válida.'),
    titulo: z.string().min(1, 'El título es requerido.'),
    texto: z.string().min(1, 'El texto es requerido.'),
    video: z.url('El video debe ser una URL válida.').optional()
}

const baseCursoSchema = {
    nombre: z.string().min(1, 'El título es requerido.'),
    descripcion: z.string().min(1, 'La descripción es requerida.'),
    categoria: z.string().min(1, 'La categoría es requerida.'),
    duracion: z.number().positive('La duración debe ser un número positivo.'),
    precio: z.number().min(0, 'El precio no puede ser negativo.'),
    complejidad: z.enum(['Principiante', 'Intermedio', 'Avanzado'], {
        errorMap: () => ({ message: 'El nivel debe ser Principiante, Intermedio o Avanzado.' })
    }),
    img: z.url('La imagen debe ser una URL válida.'),
    lecciones: z.array(z.object({ ...baseLeccionSchema })).optional()
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
    img: z.url('La imagen debe ser una URL válida.').optional(),
    lecciones: z.array(z.object({ ...baseLeccionSchema })).optional()
})

export const idCursoSchema = z.object({
    id: z.uuid()
})

export const addLeccionSchema = z.object({
    leccion: z.object({ ...baseLeccionSchema }).required()
})