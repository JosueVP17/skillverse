<template>
    <v-form @submit.prevent="handleTeacherRegister">
        <!-- Mensaje de error general -->
        <v-alert 
            v-if="generalError" 
            type="error" 
            variant="tonal"
            closable
            @click:close="generalError = ''"
            class="mb-4"
        >
            {{ generalError }}
        </v-alert>

        <!-- Información Personal -->
        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Nombre Completo</label>
            <v-text-field 
                v-model="form.fullName" 
                placeholder="Ingrese su nombre completo" 
                variant="outlined" 
                rounded="lg"
                density="comfortable" 
                :error-messages="errors.fullName"
                class="mb-4"
                bg-color="rgba(255, 255, 255, 0.9)"
                @input="clearError('fullName')"
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
                :error-messages="errors.email"
                class="mb-4"
                bg-color="rgba(255, 255, 255, 0.9)"
                @input="clearError('email')"
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
                :error-messages="errors.birthdate"
                class="mb-4"
                bg-color="rgba(255, 255, 255, 0.9)"
                :max="maxDate"
                @input="clearError('birthdate')"
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
                :error-messages="errors.specialization"
                class="mb-4"
                bg-color="rgba(255, 255, 255, 0.9)"
                @update:model-value="clearError('specialization')"
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
                :error-messages="errors.password"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" 
                class="mb-4"
                bg-color="rgba(255, 255, 255, 0.9)"
                @input="clearError('password')"
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
                :error-messages="errors.confirmPassword"
                :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showConfirmPassword = !showConfirmPassword" 
                class="mb-4"
                bg-color="rgba(255, 255, 255, 0.9)"
                @input="clearError('confirmPassword')"
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
            :loading="loading"
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
import { ref, computed, reactive } from 'vue'
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

const errors = reactive({
    fullName: [],
    email: [],
    birthdate: [],
    specialization: [],
    password: [],
    confirmPassword: []
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const generalError = ref('')
const loading = ref(false)

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

const clearError = (field) => {
    errors[field] = []
    generalError.value = ''
}

const clearAllErrors = () => {
    errors.fullName = []
    errors.email = []
    errors.birthdate = []
    errors.specialization = []
    errors.password = []
    errors.confirmPassword = []
    generalError.value = ''
}

const validateFullName = (name) => {
    if (!name || name.trim() === '') {
        return 'El nombre completo es requerido'
    }
    
    const nameParts = name.trim().split(' ').filter(part => part.length > 0)
    if (nameParts.length < 2) {
        return 'Debe ingresar al menos nombre y apellido paterno'
    }
    
    if (name.trim().length < 3) {
        return 'El nombre debe tener al menos 3 caracteres'
    }
    
    if (name.trim().length > 100) {
        return 'El nombre no puede exceder 100 caracteres'
    }
    
    return null
}

const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return 'El correo electrónico es requerido'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return 'El correo electrónico no es válido'
    }
    
    return null
}

const validateBirthdate = (birthdate) => {
    if (!birthdate || birthdate.trim() === '') {
        return 'La fecha de nacimiento es requerida'
    }
    
    const age = calculatedAge.value
    if (age === null) {
        return 'La fecha de nacimiento no es válida'
    }
    
    if (age < 18) {
        return 'Debes tener al menos 18 años para registrarte como profesor'
    }
    
    return null
}

const validateSpecialization = (specialization) => {
    if (!specialization || specialization.trim() === '') {
        return 'Debe seleccionar una especialización'
    }
    
    return null
}

const validatePassword = (password) => {
    if (!password || password.trim() === '') {
        return 'La contraseña es requerida'
    }
    
    if (password.length < 8) {
        return 'La contraseña debe tener al menos 8 caracteres'
    }
    
    if (password.length > 32) {
        return 'La contraseña no puede exceder 32 caracteres'
    }
    
    // Validar que contenga mayúscula, minúscula, número y caracter especial
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[@$!%*?&]/.test(password)
    
    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        return 'Debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial (@$!%*?&)'
    }
    
    return null
}

const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword || confirmPassword.trim() === '') {
        return 'Debe confirmar la contraseña'
    }
    
    if (confirmPassword !== password) {
        return 'Las contraseñas no coinciden'
    }
    
    return null
}

const validateForm = () => {
    clearAllErrors()
    let isValid = true

    const fullNameError = validateFullName(form.value.fullName)
    if (fullNameError) {
        errors.fullName = [fullNameError]
        isValid = false
    }

    const emailError = validateEmail(form.value.email)
    if (emailError) {
        errors.email = [emailError]
        isValid = false
    }

    const birthdateError = validateBirthdate(form.value.birthdate)
    if (birthdateError) {
        errors.birthdate = [birthdateError]
        isValid = false
    }

    const specializationError = validateSpecialization(form.value.specialization)
    if (specializationError) {
        errors.specialization = [specializationError]
        isValid = false
    }

    const passwordError = validatePassword(form.value.password)
    if (passwordError) {
        errors.password = [passwordError]
        isValid = false
    }

    const confirmPasswordError = validateConfirmPassword(form.value.confirmPassword, form.value.password)
    if (confirmPasswordError) {
        errors.confirmPassword = [confirmPasswordError]
        isValid = false
    }

    return isValid
}

const handleTeacherRegister = async () => {
    if (!validateForm()) {
        return
    }

    loading.value = true
    
    console.log('Iniciando registro de profesor...')
    console.log('Datos del formulario:', {
        fullName: form.value.fullName,
        email: form.value.email,
        birthdate: form.value.birthdate,
        specialization: form.value.specialization,
        age: calculatedAge.value
    })
    
    const result = await authStore.register({
        fullName: form.value.fullName,
        email: form.value.email,
        birthdate: form.value.birthdate,
        specialization: form.value.specialization,
        password: form.value.password,
        age: calculatedAge.value,
        role: 'teacher'
    })
    
    loading.value = false
    
    console.log('Resultado del registro:', result)
    
    if (result.success) {
        if (result.userType === 'teacher') {
            router.push({ name: 'home' })
        } else {
            router.push({ name: 'home' })
        }
    } else {
        generalError.value = result.error || 'Error al registrar el profesor. Por favor, intente nuevamente.'
    }
}
</script>

<style lang="scss" scoped></style>