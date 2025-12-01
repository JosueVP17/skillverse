const API_BASE_URL = 'http://localhost:5000/api'

export const profileService = {
  /**
   * Obtiene el perfil del usuario actual
   * @param {string} token - JWT token del usuario
   * @param {string} userType - Tipo de usuario: 'usuario' o 'profesor'
   * @returns {Promise<object>} Datos del usuario
   */
  async getProfile(token, userType = 'usuario') {
    try {
      if (!token) {
        throw new Error('Usuario no autenticado. Por favor inicia sesión.')
      }

      const endpoint = userType === 'profesor' 
        ? `${API_BASE_URL}/profesores/profile`
        : `${API_BASE_URL}/usuarios/profile`

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(error.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Get profile error:', error)
      throw error
    }
  },

  /**
   * Actualiza la información del perfil del usuario (sin foto)
   * @param {string} userId - ID del usuario/profesor
   * @param {object} data - Datos a actualizar {nombre, apaterno, amaterno, edad, email, password}
   * @param {string} token - JWT token del usuario
   * @param {string} userType - Tipo de usuario: 'usuario' o 'profesor'
   * @returns {Promise<object>} Respuesta del servidor
   */
  async updateProfile(userId, data, token, userType = 'usuario') {
    try {
      if (!userId || !token) {
        throw new Error('Usuario no autenticado. Por favor inicia sesión.')
      }

      const endpoint = userType === 'profesor' 
        ? `${API_BASE_URL}/profesores/update/${userId}`
        : `${API_BASE_URL}/usuarios/update/${userId}`

      console.log('Updating profile:', { endpoint, data, userType })

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(error.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Profile update error:', error)
      throw error
    }
  },

  /**
   * Cambia la contraseña del usuario
   * @param {string} userId - ID del usuario/profesor
   * @param {string} newPassword - Nueva contraseña
   * @param {string} token - JWT token del usuario
   * @param {string} userType - Tipo de usuario: 'usuario' o 'profesor'
   * @returns {Promise<object>} Respuesta del servidor
   */
  async changePassword(userId, newPassword, token, userType = 'usuario') {
    return this.updateProfile(userId, { password: newPassword }, token, userType)
  },

  /**
   * Actualiza la foto de perfil del usuario
   * @param {string} userId - ID del usuario/profesor
   * @param {string} fotoUrl - URL o base64 de la foto
   * @param {string} token - JWT token del usuario
   * @param {string} userType - Tipo de usuario: 'usuario' o 'profesor'
   * @returns {Promise<object>} Respuesta del servidor
   */
  async updateProfilePhoto(userId, fotoUrl, token, userType = 'usuario') {
    return this.updateProfile(userId, { foto: fotoUrl }, token, userType)
  }
}
