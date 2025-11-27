import { z } from 'zod'

const passwordValidation = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
)

const baseUsuarioSchema = {
    nombre: z.string().min(1,'El nombre es requerido.'),
    apaterno: z.string().min(1,'El apellido paterno es requerido.'),
    amaterno: z.string().min(1, 'El apellido materno es requerido.').optional(),
    edad: z.int('La edad debe ser un número entero.').positive('La edad debe ser un número positivo.').min(18,'Debes ser mayor de edad.').max(100,'Ingrese una edad válida.'),
    email: z.email("Email inválido."),
    password: z.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres."}).max(32, {message: "La contraseña no debe exceder 32 caracteres."}).regex(passwordValidation, {message: "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial." })
}

export const registerUsuarioSchema = z.object({
    ...baseUsuarioSchema
})

export const loginUsuarioSchema = z.object({
    email: z.email("Email inválido."),
    password: z.string().min(1, 'La constraseña es requerida.')
})

export const updateUsuarioSchema = z.object({
    nombre: z.string().min(1,'El nombre es requerido.').optional(),
    apaterno: z.string().min(1,'El apellido paterno es requerido.').optional(),
    amaterno: z.string().min(1, 'El apellido materno es requerido.').optional(),
    edad: z.int('La edad debe ser un número entero.').positive('La edad debe ser un número positivo.').min(18,'Debes ser mayor de edad.').max(100,'Ingrese una edad válida.').optional(),
    email: z.email("Email inválido.").optional(),
    password: z.string().min(8, {message: "La contraseña debe tener al menos 8 caracteres."}).max(32, {message: "La contraseña no debe exceder 32 caracteres."}).regex(passwordValidation, {message: "Debe contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial." }).optional()
})

export const idUsuarioSchema = z.object({
    id: z.uuid()
})