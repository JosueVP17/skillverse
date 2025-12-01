import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiPostFetch } from '@/utils/misc'
import { useSessionStore } from './session'

export const useAuthStore = defineStore('auth', () => {
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
    const sessionStore = useSessionStore()
    
    try {
      // INTENTAR LOGIN ESTUDIANTE PRIMERO
      try {
        const data = await apiPostFetch('/usuarios/login', {}, {
          email: credentials.email,
          password: credentials.password
        })

        if (data.ok && data.token) {
          sessionStore.setSession(data.token)
          return { success: true, userType: 'student' }
        }
      } catch (error) {
        console.log('No es estudiante, intentando como profesor...')
      }

      // INTENTAR LOGIN PROFESOR
      try {
        const dataTeacher = await apiPostFetch('/profesores/login', {}, {
          email: credentials.email,
          password: credentials.password
        })

        if (dataTeacher.ok && dataTeacher.token) {
          sessionStore.setSession(dataTeacher.token)
          return { success: true, userType: 'teacher' }
        }
      } catch (error) {
        console.log('Tampoco es profesor')
      }

      return { success: false, error: "Usuario y/o contraseña no válidos" }

    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Error de conexión' }
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      let endpoint = '/usuarios/register'

      // Separar nombre completo en nombre, apellido paterno y materno
      const nameParts = userData.fullName.trim().split(' ')
      const nombre = nameParts[0] || ''
      const apaterno = nameParts[1] || ''
      const amaterno = nameParts.slice(2).join(' ') || ''

      // Preparar datos base
      const registerData = {
        nombre,
        apaterno,
        amaterno,
        edad: userData.age,
        email: userData.email,
        password: userData.password
      }

      // Si es profesor, cambiar endpoint y agregar campos adicionales
      if (userData.role === 'teacher') {
        endpoint = '/profesores/register'
        registerData.ocupacion = userData.specialization
        registerData.foto = ''
        
        // Si no hay apellido materno, enviarlo vacío explícitamente
        if (!amaterno) {
          registerData.amaterno = ''
        }
      }

      console.log('Datos de registro:', registerData)
      console.log('Endpoint:', endpoint)

      const data = await apiPostFetch(endpoint, {}, registerData)
      
      console.log('Respuesta del registro:', data)
      
      if (data.ok && data.result) {
        // Login automático después del registro
        const loginResult = await login({
          email: userData.email,
          password: userData.password
        })
        
        return loginResult
      } else {
        return { success: false, error: data.message || 'Error en el registro' }
      }
    } catch (error) {
      console.error('Register error:', error)
      
      // Manejar errores específicos del backend
      if (error.message) {
        if (error.message.includes('Ya existe')) {
          return { success: false, error: 'Este correo electrónico ya está registrado' }
        }
        return { success: false, error: error.message }
      }
      
      return { success: false, error: 'Error de red al registrar' }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    const sessionStore = useSessionStore()
    
    try {
      const token = sessionStore.token
      const userId = sessionStore.userId
      const isTeacher = sessionStore.isTeacher
      
      if (token && userId) {
        const endpoint = isTeacher ? '/profesores/logout' : '/usuarios/logout'
        await apiPostFetch(endpoint, { Authorization: `Bearer ${token}` }, { id: userId })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      sessionStore.clearSession()
    }
  }

  const setAuthConfig = (page, config) => {
    authConfig.value[page] = { ...authConfig.value[page], ...config }
  }

  return {
    loading,
    authConfig,
    getAuthConfig,
    login,
    register,
    logout,
    setAuthConfig
  }
})