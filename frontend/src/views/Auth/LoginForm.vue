<template>
    <v-form @submit.prevent="handleLogin">
        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Correo Electrónico</label>
            <v-text-field v-model="form.email" placeholder="Ingrese su correo electrónico" variant="outlined" rounded="lg"
                density="comfortable" hide-details="auto" class="mb-4 glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"></v-text-field>
        </div>

        <div class="mb-4">
            <label class="text-body-2 font-weight-medium mb-2 d-block">Contraseña</label>
            <v-text-field v-model="form.password" :type="showPassword ? 'text' : 'password'"
                placeholder="Ingrese su contraseña" variant="outlined" rounded="lg" density="comfortable"
                hide-details="auto" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="showPassword = !showPassword" class="glass-input"
                bg-color="rgba(255, 255, 255, 0.9)"></v-text-field>
        </div>

        <div class="d-flex justify-end align-center mb-6">
            <a href="#" class="text-decoration-none text-teal-darken-2 font-weight-medium">
                ¿Olvidaste tu contraseña?
            </a>
        </div>

        <v-btn type="submit" block rounded="lg" color="teal-lighten-1" size="large" class="text-capitalize"
            elevation="2">
            Iniciar Sesión
        </v-btn>
    </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
    email: '',
    password: '',
})

const showPassword = ref(false)

const handleLogin = async () => {
    const result = await authStore.login(form.value)

    if (result.success) {
        router.push({ name: 'home' })
    } else {
        console.error('Login failed:', result.error)
    }
}
</script>

<style lang="scss" scoped>
.glass-input {
    backdrop-filter: blur(5px);
}
</style>