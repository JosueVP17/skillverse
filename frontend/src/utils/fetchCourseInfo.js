const VITE_API_URL = import.meta.env.VITE_API_URL

export const getCurso = async (id) => {
  try {
    const response = await fetch(`${VITE_API_URL}/api/cursos/${id}`)
    const data = await response.json()

    if (data.ok) {
      return data.curso
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

export const getProfesor = async (id) => {
  try {
    const response = await fetch(`${VITE_API_URL}/api/profesores/${id}`)
    const data = await response.json()

    if (data.ok) {
      return data.profesor
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
