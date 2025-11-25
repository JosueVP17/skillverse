<template>
    <v-form @submit.prevent="handleTeacherRegister">
        <!-- Información Personal -->
        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Nombre Completo</label>
            <v-text-field 
                v-model="form.fullName" 
                placeholder="Ingrese su nombre completo" 
                variant="outlined" 
                rounded="lg"
                density="comfortable" 
                hide-details="auto" 
                class="mb-4 glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"
            ></v-text-field>
        </div>

        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Correo Electrónico</label>
            <v-text-field 
                v-model="form.email" 
                type="email" 
                placeholder="Ingrese su correo electrónico" 
                variant="outlined"
                rounded="lg" 
                density="comfortable" 
                hide-details="auto" 
                class="mb-4 glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"
            ></v-text-field>
        </div>

        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Fecha de Nacimiento</label>
            <v-text-field 
                v-model="form.birthdate" 
                type="date"
                placeholder="Seleccione su fecha de nacimiento" 
                variant="outlined" 
                rounded="lg"
                density="comfortable" 
                hide-details="auto" 
                class="mb-4 glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"
                :max="maxDate"
            ></v-text-field>
            <p v-if="calculatedAge" class="text-caption text-grey-darken-1 mt-1">
                Edad: {{ calculatedAge }} años
            </p>
        </div>

        <!-- Información Profesional -->
        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Especialización</label>
            <v-select 
                v-model="form.specialization" 
                :items="specializations"
                placeholder="Seleccione su especialización" 
                variant="outlined" 
                rounded="lg"
                density="comfortable" 
                hide-details="auto" 
                class="mb-4 glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"
            ></v-select>
        </div>

        <!-- Credenciales -->
        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Contraseña</label>
            <v-text-field 
                v-model="form.password" 
                :type="showPassword ? 'text' : 'password'"
                placeholder="Ingrese su contraseña" 
                variant="outlined" 
                rounded="lg" 
                density="comfortable"
                hide-details="auto" 
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" 
                class="mb-4 glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"
            ></v-text-field>
        </div>

        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Confirmar Contraseña</label>
            <v-text-field 
                v-model="form.confirmPassword" 
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Confirme su contraseña" 
                variant="outlined" 
                rounded="lg" 
                density="comfortable"
                hide-details="auto" 
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword" 
                class="mb-4 glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"
            ></v-text-field>
        </div>

        <v-btn 
            type="submit" 
            block 
            rounded="lg" 
            color="teal-lighten-1" 
            size="large" 
            class="text-capitalize mb-4"
            elevation="2"
        >
            Registrarse como Profesor
        </v-btn>

        <!-- Botón para volver al registro normal -->
        <div class="text-center">
            <v-btn 
                variant="text" 
                color="teal-darken-1"
                class="text-capitalize"
                @click="$router.push({ name: 'register' })"
            >
                <v-icon start>mdi-arrow-left</v-icon>
                Volver al Registro de Estudiante
            </v-btn>
        </div>
    </v-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const specializations = [
    'Programación y Desarrollo',
    'Ciencia de Datos y Analítica',
    'Diseño y UX',
    'Negocios y Marketing',
    'Aprendizaje de Idiomas',
    'Música y Arte',
    'Ciencia y Matemáticas',
    'Otro'
]

const form = ref({
    fullName: '',
    email: '',
    birthdate: '',
    specialization: '',
    password: '',
    confirmPassword: ''
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Fecha máxima (hoy)
const maxDate = computed(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
})

// Calcular edad
const calculatedAge = computed(() => {
    if (!form.value.birthdate) return null
    
    const birthDate = new Date(form.value.birthdate)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    
    return age
})

const handleTeacherRegister = async () => {
    if (form.value.password !== form.value.confirmPassword) {
        console.error('Las contraseñas no coinciden')
        return
    }

    if (!form.value.specialization) {
        console.error('Por favor seleccione una especialización')
        return
    }

    if (!form.value.birthdate) {
        console.error('Debe ingresar su fecha de nacimiento')
        return
    }

    if (calculatedAge.value < 18) {
        console.error('Debe tener al menos 18 años para registrarse como profesor')
        return
    }

    const result = await authStore.register({
        ...form.value,
        age: calculatedAge.value,
        role: 'teacher'
    })
    
    if (result.success) {
        router.push({ name: 'home' })
    } else {
        console.error('Error en el registro de profesor:', result.error)
    }
}
</script>

<style lang="scss" scoped></style>