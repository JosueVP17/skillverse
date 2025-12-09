const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const cursoService = {
  /**
   * Crea un nuevo curso
   * @param {object} cursoData - Datos del curso {nombre, descripcion, precio, duracion, img, categoria, complejidad}
   * @param {string} token - JWT token del profesor
   * @returns {Promise<object>} Respuesta del servidor con el curso creado
   */
  async createCurso(cursoData, token) {
    try {
      if (!token) {
        throw new Error('No autenticado. Por favor inicia sesión.')
      }

      const response = await fetch(`${API_BASE_URL}/cursos/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cursoData)
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(error.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Create curso error:', error)
      throw error
    }
  },

  /**
   * Actualiza un curso existente
   * @param {string} cursoId - ID del curso
   * @param {object} cursoData - Datos a actualizar
   * @param {string} token - JWT token del profesor
   * @returns {Promise<object>} Respuesta del servidor
   */
  async updateCurso(cursoId, cursoData, token) {
    try {
      if (!token) {
        throw new Error('No autenticado. Por favor inicia sesión.')
      }

      const response = await fetch(`${API_BASE_URL}/cursos/update/${cursoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(cursoData)
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: response.statusText }))
        throw new Error(error.message || `Error ${response.status}: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Update curso error:', error)
      throw error
    }
  },

  /**
   * Elimina un curso
   * @param {string} cursoId - ID del curso
   * @param {string} token - JWT token del profesor
   * @returns {Promise<object>} Respuesta del servidor
   */
  async deleteCurso(cursoId, token) {
    try {
      if (!token) {
        throw new Error('No autenticado. Por favor inicia sesión.')
      }

      const response = await fetch(`${API_BASE_URL}/cursos/delete/${cursoId}`, {
        method: 'DELETE',
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
      console.error('Delete curso error:', error)
      throw error
    }
  }
}
