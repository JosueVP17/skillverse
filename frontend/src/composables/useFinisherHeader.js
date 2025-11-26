import { onMounted, onUnmounted } from 'vue'

export function useFinisherHeader(config) {
  let finisherInstance = null

  onMounted(() => {
    // Esperar a que el DOM esté listo
    setTimeout(() => {
      if (window.FinisherHeader) {
        finisherInstance = new window.FinisherHeader(config)
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