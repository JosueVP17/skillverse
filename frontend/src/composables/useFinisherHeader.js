import { onMounted, onUnmounted } from 'vue'

export function useFinisherHeader(config) {
  let finisherInstance = null

  onMounted(() => {
    // Esperar a que el DOM esté listo y verificar que el elemento existe
    setTimeout(() => {
      const finisherElement = document.querySelector('.finisher-header')
      if (window.FinisherHeader && finisherElement) {
        try {
          finisherInstance = new window.FinisherHeader(config)
        } catch (error) {
          console.warn('Error al inicializar FinisherHeader:', error.message)
        }
      }
    }, 100)
  })

  onUnmounted(() => {
    // Limpiar el canvas cuando se desmonte el componente
    const canvas = document.getElementById('finisher-canvas')
    if (canvas) {
      canvas.remove()
    }
  })

  return {
    finisherInstance
  }
}