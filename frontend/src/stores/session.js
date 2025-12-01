import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSessionStore = defineStore('session', () => {
  // Estado
  const token = ref(null)
  const payload = ref(null)
  const cart = ref([])
  const purchasedCourses = ref([])
  const userPhoto = ref(null)

  const snackbar = ref({
    show: false,
    message: '',
    color: 'success',
  })
  // Getters
  const isAuthenticated = computed(() => !!token.value && !!payload.value)

  // Detectar tipo de usuario desde el payload del token
  const userType = computed(() => {
    if (!payload.value) return null
    return payload.value.rol === 'profesor' ? 'teacher' : 'student'
  })

  const isStudent = computed(() => userType.value === 'student')

  const isTeacher = computed(() => userType.value === 'teacher')

  const userId = computed(() => payload.value?.id || null)

  const userName = computed(() => {
    if (!payload.value) return null

    if (isTeacher.value) {
      // Para profesores: solo el nombre
      return payload.value.nombre
    }

    // Para estudiantes: nombre + apellido paterno
    const nombre = payload.value.nombre || ''
    const apaterno = payload.value.apaterno || ''

    return `${nombre} ${apaterno}`.trim()
  })

  // Email ahora está en el token
  const userEmail = computed(() => payload.value?.email || null)

  const userOccupation = computed(() => {
    if (isTeacher.value) {
      return payload.value?.profesor || null
    }
    return null
  })

  const isTokenExpired = computed(() => {
    if (!payload.value?.exp) return true

    const now = Date.now() / 1000
    return payload.value.exp < now
  })

  // Helper para decodificar JWT
  const decodeToken = (tokenString) => {
    try {
      const base64Url = tokenString.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      )

      return JSON.parse(jsonPayload)
    } catch (error) {
      console.error('Error al decodificar token:', error)
      return null
    }
  }

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${userId.value}/carrito/`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      const data = await response.json()

      if (data.ok && data.cart) {
        cart.value = data.cart || []
      } else {
        cart.value = []
      }
    } catch (error) {
      console.error('Error al obtener carrito:', error)
      cart.value = []
    }
  }

  const fetchPurchasedCourses = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${userId.value}/cursos-comprados`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      const data = await response.json()

      if (data.ok && data.courses) {
        purchasedCourses.value = data.courses || []
      } else {
        purchasedCourses.value = []
      }
    } catch (error) {
      console.error('Error al obtener cursos comprados:', error)
      purchasedCourses.value = []
    }
  }

  const hasPurchasedCourse = (courseId) => {
    return purchasedCourses.value.includes(courseId)
  }

  const addToCart = async (courseId) => {
    await fetchCart()

    if (cart.value.includes(courseId)) {
      snackbar.value = {
        show: true,
        message: 'El curso ya está en el carrito',
        color: 'error',
      }
      return
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/usuarios/${userId.value}/carrito/${courseId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
          body: JSON.stringify({ courseId }),
        },
      )

      const data = await response.json()

      if (data.ok) {
        await fetchCart()
        snackbar.value = {
          show: true,
          message: 'Curso agregado al carrito.',
          color: 'success',
        }
      } else {
        console.error('Error al agregar al carrito:', data.message)
      }
    } catch (error) {
      console.error('Error al agregar al carrito:', error)
    }
  }

  const removeFromCart = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/usuarios/${userId.value}/carrito/${courseId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        },
      )
      const data = await response.json()
      if (data.ok) {
        await fetchCart()
        return { result: true }
      } else {
        console.error('Error al eliminar del carrito:', data.message)
      }
    } catch (error) {
      console.error('Error al eliminar del carrito:', error)
    }
  }

  // Actions
  const setSession = async (tokenString) => {
    try {
      // Guardar token
      token.value = tokenString

      // Decodificar payload del JWT
      const decodedPayload = decodeToken(tokenString)

      if (!decodedPayload) {
        throw new Error('Token inválido')
      }

      payload.value = decodedPayload

      // Guardar en localStorage
      localStorage.setItem('token', tokenString)

      // Detectar tipo de usuario desde el payload
      const detectedUserType = decodedPayload.rol === 'profesor' ? 'teacher' : 'student'
      localStorage.setItem('userType', detectedUserType)

      console.log('Sesión establecida:', {
        userType: detectedUserType,
        userId: decodedPayload.id,
        userName: decodedPayload.nombre,
        userEmail: decodedPayload.email,
        isTeacher: detectedUserType === 'teacher',
        occupation: decodedPayload.profesor || null,
        tokenExpires: new Date(decodedPayload.exp * 1000).toLocaleString(),
      })

      if (isStudent.value) {
        await fetchCart()
        await fetchPurchasedCourses()
      } else {
        // Si es profesor, resetear carrito y cursos comprados
        cart.value = []
        purchasedCourses.value = []
      }

      return true
    } catch (error) {
      console.error('Error al establecer sesión:', error)
      clearSession()
      return false
    }
  }

  const clearSession = () => {
    token.value = null
    payload.value = null
    userPhoto.value = null
    cart.value = []
    purchasedCourses.value = []
    
    localStorage.removeItem('token')
    localStorage.removeItem('userType')
    localStorage.removeItem('rememberMe')
  }

  const setUserPhoto = (photo) => {
    userPhoto.value = photo
  }

  const updateUserData = (nombre, apaterno, amaterno, email) => {
    if (payload.value) {
      payload.value.nombre = nombre
      if (apaterno !== undefined) payload.value.apaterno = apaterno
      if (amaterno !== undefined) payload.value.amaterno = amaterno
      if (email !== undefined) payload.value.email = email
    }
  }
  
  const restoreSession = async () => {
    try {
      const storedToken = localStorage.getItem('token')

      if (!storedToken) {
        return false
      }

      // Decodificar token
      const decodedPayload = decodeToken(storedToken)

      if (!decodedPayload) {
        clearSession()
        return false
      }

      // Verificar si el token expiró
      if (decodedPayload.exp) {
        const now = Date.now() / 1000
        if (decodedPayload.exp < now) {
          console.log('Token expirado, limpiando sesión')
          clearSession()
          return false
        }
      }

      // Restaurar sesión
      token.value = storedToken
      payload.value = decodedPayload

      // Detectar tipo de usuario desde el payload
      const detectedUserType = decodedPayload.rol === 'profesor' ? 'teacher' : 'student'
      localStorage.setItem('userType', detectedUserType)

      console.log('Sesión restaurada:', {
        userType: detectedUserType,
        userId: decodedPayload.id,
        userName: decodedPayload.nombre,
        userEmail: decodedPayload.email,
        isTeacher: detectedUserType === 'teacher',
      })

      if (isStudent.value) {
        await fetchCart()
        await fetchPurchasedCourses()
      } else {
        // Si es profesor, resetear carrito y cursos comprados
        cart.value = []
        purchasedCourses.value = []
      }

      return true
    } catch (error) {
      console.error('Error al restaurar sesión:', error)
      clearSession()
      return false
    }
  }

  // Verificar expiración periódicamente (cada minuto)
  const startExpirationCheck = () => {
    setInterval(() => {
      if (isTokenExpired.value && token.value) {
        console.log('Token expirado detectado, limpiando sesión')
        clearSession()
        // Opcional: redirigir al login
        window.location.href = '/auth'
      }
    }, 60000) // Verificar cada minuto
  }

  return {
    // State
    token,
    payload,
    cart,
    purchasedCourses,
    userPhoto,
    
    // Getters
    isAuthenticated,
    isStudent,
    isTeacher,
    userType,
    userId,
    userName,
    userEmail,
    userOccupation,
    isTokenExpired,

    // Actions
    addToCart,
    fetchCart,
    fetchPurchasedCourses,
    hasPurchasedCourse,
    removeFromCart,
    setSession,
    clearSession,
    setUserPhoto,
    updateUserData,
    restoreSession,
    startExpirationCheck,

    snackbar,
  }
})
