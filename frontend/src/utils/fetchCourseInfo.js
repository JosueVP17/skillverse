const VITE_API_URL = import.meta.env.VITE_API_URL

export const getCurso = async (id) => {
  try {
    console.log(`Obteniendo curso desde: ${VITE_API_URL}/cursos/${id}`)
    const response = await fetch(`${VITE_API_URL}/cursos/${id}`)
    
    if (!response.ok) {
      console.error(`Error HTTP ${response.status}: ${response.statusText}`)
      const errorText = await response.text()
      console.error('Respuesta:', errorText)
      return null
    }
    
    const data = await response.json()
    console.log('Datos recibidos:', data)

    if (data.ok) {
      return data.curso
    } else {
      console.error('Respuesta no ok:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error al obtener curso:', error)
    return null
  }
}

export const getProfesor = async (id) => {
  try {
    console.log(`Obteniendo profesor desde: ${VITE_API_URL}/profesores/${id}`)
    const response = await fetch(`${VITE_API_URL}/profesores/${id}`)
    
    if (!response.ok) {
      console.error(`Error HTTP ${response.status}: ${response.statusText}`)
      const errorText = await response.text()
      console.error('Respuesta:', errorText)
      return null
    }
    
    const data = await response.json()
    console.log('Datos recibidos:', data)

    if (data.ok) {
      return data.profesor
    } else {
      console.error('Respuesta no ok:', data.message)
      return null
    }
  } catch (error) {
    console.error('Error al obtener profesor:', error)
    return null
  }
}
