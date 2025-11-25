import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  
  // Configuración dinámica para las páginas de auth
  const authConfig = ref({
    login: {
      image: '/imgs/LoginIMG.webp',
      title: 'Bienvenido a SkillVerse',
      subtitle: '¡Conéctate y comienza a aprender!',
      welcomeText: '¡Bienvenido a SkillVerse!'
    },
    register: {
      image: '/imgs/RegisterIMG.webp',
      title: 'Únete a SkillVerse Hoy',
      subtitle: 'Comienza tu viaje de aprendizaje',
      welcomeText: '¡Crea tu cuenta en SkillVerse!'
    },
    'teacher-register': {
      image: '/imgs/TeacherRegisterIMG.webp',
      title: 'Conviértete en un Profesor de SkillVerse',
      subtitle: 'Comparte tu conocimiento con el mundo',
      welcomeText: '¡Regístrate como Profesor!'
    }
  })

  // Getters
  const getAuthConfig = computed(() => (page) => {
    return authConfig.value[page] || authConfig.value.login
  })

  // Actions
  const login = async (credentials) => {
    loading.value = true
    try {
      // TODO: Llamar API de login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        user.value = data.user
        isAuthenticated.value = true
        localStorage.setItem('token', data.token)
        
        if (credentials.rememberMe) {
          localStorage.setItem('rememberMe', 'true')
        }
        
        return { success: true }
      } else {
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error' }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      // TODO: Llamar API de registro
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        user.value = data.user
        isAuthenticated.value = true
        localStorage.setItem('token', data.token)
        return { success: true }
      } else {
        return { success: false, error: data.message }
      }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, error: 'Network error' }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
    localStorage.removeItem('rememberMe')
  }

  const setAuthConfig = (page, config) => {
    authConfig.value[page] = { ...authConfig.value[page], ...config }
  }

  return {
    user,
    isAuthenticated,
    loading,
    authConfig,
    getAuthConfig,
    login,
    register,
    logout,
    setAuthConfig
  }
})