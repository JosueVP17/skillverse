const VITE_API_URL = import.meta.env.VITE_API_URL

export const renderStripeProcess = async (userId) => {
  try {
    // Obtener el token de sesión del localStorage
    const token = localStorage.getItem('token')
    
    if (!token) {
      console.error('No hay token de autenticación')
      throw new Error('Debes iniciar sesión para realizar el pago')
    }

    const response = await fetch(`${VITE_API_URL}/pagos/checkout/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    const data = await response.json()

    if (response.ok && data.ok && data.url) {
      // Redirigir al usuario a la página de checkout de Stripe
      window.location.href = data.url
      return { success: true, url: data.url }
    } else {
      console.error('Error en la respuesta de Stripe:', data.message)
      throw new Error(data.message || 'Error al procesar el pago')
    }
  } catch (error) {
    console.error('Error al procesar el pago con Stripe:', error)
    throw error
  }
}
