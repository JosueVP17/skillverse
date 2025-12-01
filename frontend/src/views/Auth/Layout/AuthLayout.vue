<template>
    <div class="auth-layout finisher-header">
        <v-container fluid class="pa-0 fill-height auto-width">
            <v-row no-gutters class="fill-height">
                <!-- Left side - Image section -->
                <v-col cols="12" md="6" class="d-none d-md-flex position-relative">
                    <div class="image-container rounded-xl ma-6">
                        <!-- Imagen de fondo con transición -->
                        <transition name="fade" mode="out-in">
                            <v-img 
                                :key="currentConfig.image"
                                :src="currentConfig.image" 
                                cover 
                                class="auth-background-image"
                            ></v-img>
                        </transition>

                        <!-- Overlay con texto -->
                        <div class="image-overlay pa-8 d-flex align-end">
                            <transition name="slide-up" mode="out-in">
                                <div :key="route.name">
                                    <h1 class="text-h3 text-white font-weight-bold mb-2">
                                        {{ currentConfig.title }}
                                    </h1>
                                    <p class="text-h6 text-white">
                                        {{ currentConfig.subtitle }}
                                    </p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </v-col>

                <!-- Right side - Form section -->
                <v-col cols="12" md="6" class="d-flex align-center justify-center pa-6">
                    <div class="auth-form-container">
                        <!-- Card principal con todo el contenido -->
                        <div class="main-glass-card pa-8">
                            <div class="text-center mb-8">
                                <h1 class="text-h4 font-weight-bold mb-2">{{ currentConfig.welcomeText }}</h1>
                                <div class="d-flex justify-center mb-6" style="gap: 8px;">
                                    <v-btn 
                                        rounded="pill" 
                                        :color="isLoginRoute ? 'teal-lighten-1' : 'teal-lighten-3'" 
                                        variant="flat" 
                                        size="large"
                                        class="px-8" 
                                        @click="$router.push({ name: 'login' })"
                                    >
                                        Iniciar Sesión
                                    </v-btn>
                                    <v-btn 
                                        rounded="pill" 
                                        :color="isRegisterRoute ? 'teal-lighten-1' : 'teal-lighten-3'" 
                                        variant="flat" 
                                        size="large"
                                        class="px-8" 
                                        @click="$router.push({ name: 'register' })"
                                    >
                                        Registrarse
                                    </v-btn>
                                </div>
                                <p class="text-body-1 text-grey-darken-1">
                                    Únete a nuestra plataforma de aprendizaje y descubre un mundo de conocimientos.
                                </p>
                            </div>

                            <!-- FORMULARIO -->
                            <router-view />
                            <!-- END FORMULARIO -->
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const currentConfig = computed(() => {
    const page = route.name
    return authStore.getAuthConfig(page)
})

const isLoginRoute = computed(() => route.name === 'login')
const isRegisterRoute = computed(() => route.name === 'register')

// Inicializar Finisher Header
let finisherInstance = null

onMounted(() => {
    setTimeout(() => {
        if (window.FinisherHeader) {
            finisherInstance = new window.FinisherHeader({
                "count": 15,
                "size": {
                    "min": 1000,
                    "max": 1400,
                    "pulse": 0
                },
                "speed": {
                    "x": {
                        "min": 0.4,
                        "max": 2
                    },
                    "y": {
                        "min": 0.4,
                        "max": 2
                    }
                },
                "colors": {
                    "background": "#f5f5f5",
                    "particles": [
                        "#49bbbd",
                        "#3fa8aa",
                        "#79dee1"
                    ]
                },
                "blending": "lighten",
                "opacity": {
                    "center": 0.5,
                    "edge": 0
                },
                "skew": 0,
                "shapes": [
                    "c"
                ]
            })
        }
    }, 100)
})

onUnmounted(() => {
    const canvas = document.getElementById('finisher-canvas')
    if (canvas) {
        canvas.remove()
    }
})
</script>

<style lang="scss" scoped>
.auth-layout {
    position: relative;
    min-height: 100dvh;
    width: 100dvw;
    overflow: hidden;
}

.auto-width {
    margin: 0 auto;
    width: 95dvw;
    @media (max-width: 959px) {
        width: 100dvw;
    }
}

.fill-height {
    min-height: 100dvh;
}

.position-relative {
    position: relative;
}

.image-container {
    position: relative;
    width: 100%;
    height: 95%;
    overflow: hidden;
    z-index: 10;
}

.auth-background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.image-overlay {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.7) 0%,
        transparent 100%
    );
}

.auth-form-container {
    width: 100%;
    max-width: 650px;
    position: relative;
    z-index: 10;
}

.main-glass-card {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.35);
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.rounded-xl {
    border-radius: 24px !important;
}

/* Transición de fade para la imagen */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Transición de slide-up para el texto */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.2s ease;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

@media (max-width: 959px) {
    .auth-form-container {
        max-width: 100%;
    }
}
</style>