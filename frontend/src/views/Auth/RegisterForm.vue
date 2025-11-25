<template>
    <v-form @submit.prevent="handleRegister">
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
            Registrarse
        </v-btn>

        <!-- Botón para registro de profesores -->
        <div class="text-center">
            <p class="text-body-2 text-grey-darken-1 mb-2">¿Eres profesor?</p>
            <v-btn 
                variant="outlined" 
                color="teal-darken-1" 
                rounded="lg"
                size="large"
                class="text-capitalize"
                @click="$router.push({ name: 'teacher-register' })"
            >
                <v-icon start>mdi-account-tie</v-icon>
                Registrarse como Profesor
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

const form = ref({
    fullName: '',
    email: '',
    birthdate: '',
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

const handleRegister = async () => {
    if (form.value.password !== form.value.confirmPassword) {
        console.error('Las contraseñas no coinciden')
        return
    }

    if (!form.value.birthdate) {
        console.error('Debe ingresar su fecha de nacimiento')
        return
    }

    if (calculatedAge.value < 13) {
        console.error('Debe tener al menos 13 años para registrarse')
        return
    }

    const result = await authStore.register({
        ...form.value,
        age: calculatedAge.value
    })
    
    if (result.success) {
        router.push({ name: 'home' })
    } else {
        console.error('Error en el registro:', result.error)
    }
}
</script>

<style lang="scss" scoped></style>