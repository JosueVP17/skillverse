<template>
    <v-form @submit.prevent="handleLogin">
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

        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Correo Electrónico</label>
            <v-text-field 
                v-model="form.email" 
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
                class="glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"
                @input="clearError('password')"
            ></v-text-field>
        </div>

        <div class="d-flex justify-end align-center mb-6">
            <a href="#" class="text-decoration-none text-teal-darken-2 font-weight-medium">
                ¿Olvidaste tu contraseña?
            </a>
        </div>

        <v-btn 
            type="submit" 
            block 
            rounded="lg" 
            color="teal-lighten-1" 
            size="large" 
            class="text-capitalize"
            elevation="2"
            :loading="loading"
        >
            Iniciar Sesión
        </v-btn>
    </v-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
    email: '',
    password: '',
})

const errors = reactive({
    email: [],
    password: []
})

const generalError = ref('')
const showPassword = ref(false)
const loading = ref(false)

const clearError = (field) => {
    errors[field] = []
    generalError.value = ''
}

const clearAllErrors = () => {
    errors.email = []
    errors.password = []
    generalError.value = ''
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

const validatePassword = (password) => {
    if (!password || password.trim() === '') {
        return 'La contraseña es requerida'
    }
    
    if (password.length < 6) {
        return 'La contraseña debe tener al menos 6 caracteres'
    }
    
    return null
}

const validateForm = () => {
    clearAllErrors()
    let isValid = true

    // Validar email
    const emailError = validateEmail(form.value.email)
    if (emailError) {
        errors.email = [emailError]
        isValid = false
    }

    // Validar password
    const passwordError = validatePassword(form.value.password)
    if (passwordError) {
        errors.password = [passwordError]
        isValid = false
    }

    return isValid
}

const handleLogin = async () => {
    if (!validateForm()) {
        return
    }

    loading.value = true
    const result = await authStore.login(form.value)
    loading.value = false

    if (result.success) {
        router.push({ name: 'home' })
    } else {
        generalError.value = 'Usuario y/o contraseña no válidos'
    }
}
</script>

<style lang="scss" scoped></style>