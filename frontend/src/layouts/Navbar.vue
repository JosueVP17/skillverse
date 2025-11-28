<template>
    <div class="navbar">
        <img class="logo" src="@/assets/PageLogoDark.png" @click="$router.push('/')">
        <div class="navigation">
            <v-btn class="nav-btn" density="comfortable" variant="plain" @click="$router.push('/')">Inicio</v-btn>
            <v-btn class="nav-btn" density="comfortable" variant="plain" @click="$router.push('/courses')">Cursos</v-btn>
            
            <!-- Botón de Ingresar (solo si no está autenticado) -->
            <v-btn 
                v-if="!sessionStore.isAuthenticated" 
                class="nav-btn login-btn" 
                rounded="xl" 
                density="comfortable" 
                variant="tonal"
                color="teal-lighten-1"
                @click="$router.push('/auth')"
            >
                Ingresar
            </v-btn>

            <!-- Menú de Usuario (solo si está autenticado) -->
            <v-menu v-else>
                <template v-slot:activator="{ props }">
                    <v-btn
                        class="user-btn"
                        color="teal-lighten-1"
                        rounded="xl"
                        variant="tonal"
                        v-bind="props"
                        append-icon="mdi-chevron-down"
                    >
                        <v-avatar size="24" class="me-2">
                            <img v-if="sessionStore.userPhoto" :src="sessionStore.userPhoto" alt="Avatar" />
                            <v-icon v-else size="18">mdi-account-circle</v-icon>
                        </v-avatar>
                        <span class="user-name">{{ sessionStore.userName }}</span>
                    </v-btn>
                </template>

                <v-list class="user-menu">
                    <!-- Información del usuario -->
                    <v-list-item class="user-info">
                        <template v-slot:prepend>
                            <v-avatar color="teal-lighten-1" size="48">
                                <img v-if="sessionStore.userPhoto" :src="sessionStore.userPhoto" alt="Avatar" />
                                <v-icon v-else size="32">mdi-account-circle</v-icon>
                            </v-avatar>
                        </template>
                        
                        <v-list-item-title class="font-weight-bold">
                            {{ sessionStore.userName }}
                        </v-list-item-title>
                        
                        <v-list-item-subtitle>
                            {{ sessionStore.userEmail }}
                        </v-list-item-subtitle>
                        
                        <template v-slot:append>
                            <v-chip 
                                v-if="sessionStore.isTeacher" 
                                color="teal" 
                                size="small"
                                variant="flat"
                            >
                                Profesor
                            </v-chip>
                            <v-chip 
                                v-else 
                                color="blue" 
                                size="small"
                                variant="flat"
                            >
                                Estudiante
                            </v-chip>
                        </template>
                    </v-list-item>

                    <v-divider></v-divider>

                    <!-- Especialización (solo para profesores) -->
                    <v-list-item 
                        v-if="sessionStore.isTeacher && sessionStore.userOccupation"
                        prepend-icon="mdi-school"
                        class="occupation-item"
                    >
                        <v-list-item-title class="text-body-2">
                            {{ sessionStore.userOccupation }}
                        </v-list-item-title>
                    </v-list-item>

                    <v-divider v-if="sessionStore.isTeacher"></v-divider>

                    <!-- Opciones del menú -->
                    <v-list-item
                        prepend-icon="mdi-account"
                        title="Mi Perfil"
                        @click="goToProfile"
                    ></v-list-item>

                    <v-list-item
                        v-if="sessionStore.isTeacher"
                        prepend-icon="mdi-book-open-variant"
                        title="Mis Cursos"
                        @click="goToMyCourses"
                    ></v-list-item>

                    <v-list-item
                        v-else
                        prepend-icon="mdi-book-multiple"
                        title="Mis Cursos"
                        @click="goToMyCourses"
                    ></v-list-item>

                    <v-divider></v-divider>

                    <v-list-item
                        prepend-icon="mdi-logout"
                        title="Cerrar Sesión"
                        class="logout-item"
                        @click="handleLogout"
                    ></v-list-item>
                </v-list>
            </v-menu>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import { profileService } from '@/services/profile.service'

const router = useRouter()
const sessionStore = useSessionStore()
const authStore = useAuthStore()

// Cargar foto cuando se monta el componente (solo si no está en el store)
onMounted(async () => {
  try {
    if (sessionStore.isAuthenticated && sessionStore.token && !sessionStore.userPhoto) {
      const userType = sessionStore.isTeacher ? 'profesor' : 'usuario'
      const response = await profileService.getProfile(sessionStore.token, userType)
      
      if (response.ok && response.result?.foto) {
        sessionStore.setUserPhoto(response.result.foto)
      }
    }
  } catch (error) {
    console.error('Error cargando foto del perfil:', error)
  }
})

// Navegación
const goToProfile = () => {
    router.push({ name: 'profile' })
}

const goToMyCourses = () => {
    router.push({ name: 'teacher-courses' })
}

const handleLogout = async () => {
    try {
        await authStore.logout()
        router.push({ name: 'login' })
    } catch (error) {
        console.error('Error al cerrar sesión:', error)
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.poppins-bold {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
}

.navbar {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 80px;
    width: 100%;
    height: 70px;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    z-index: 2;
}

.logo {
    height: 45px;
    cursor: pointer;
}

.navigation {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nav-btn {
    text-transform: none;
    font-weight: 500;
    letter-spacing: 0;
}

.login-btn {
    margin-left: 12px;
}

.user-btn {
    margin-left: 12px;
    text-transform: none;
    font-weight: 500;
    letter-spacing: 0;
    padding: 8px 16px;
    height: 40px;
}

.user-name {
    font-size: 0.95rem;
    margin-left: 4px;
    margin-right: 4px;
}

.user-menu {
    min-width: 300px;
    margin-top: 8px;
}

.user-info {
    background-color: #f5f5f5;
    padding: 16px !important;
    min-height: 80px;
}

.user-info .v-list-item-title {
    font-size: 1rem;
    margin-bottom: 4px;
    line-height: 1.5;
}

.user-info .v-list-item-subtitle {
    font-size: 0.875rem;
    opacity: 0.7;
    line-height: 1.4;
}

.occupation-item {
    background-color: #f9f9f9;
    font-style: italic;
}

.logout-item {
    color: #d32f2f;
}

.logout-item:hover {
    background-color: #ffebee;
}

:deep(.user-info .v-list-item__prepend) {
    margin-right: 16px;
}

:deep(.user-info .v-list-item__append) {
    align-self: flex-start;
    margin-top: 8px;
}

:deep(.v-list-item__prepend) {
    margin-right: 12px;
}

:deep(.v-list-item) {
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

:deep(.v-list-item:hover) {
    background-color: #f5f5f5;
}

:deep(.v-avatar) {
    margin-right: 4px;
}

:deep(.v-btn__content) {
    display: flex;
    align-items: center;
    gap: 4px;
}
</style>