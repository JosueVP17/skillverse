<template>
  <div class="payment-success-page">
    <div class="container">
      <!-- Loading State -->
      <div v-if="verifying" class="status-card">
        <div class="spinner"></div>
        <h2>Verificando tu pago...</h2>
        <p>Por favor espera un momento</p>
      </div>

      <!-- Success State -->
      <div v-else-if="success" class="status-card success">
        <div class="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1>¡Pago Exitoso!</h1>
        <p class="subtitle">Tu compra se ha procesado correctamente</p>

        <div class="payment-details">
          <div class="detail-item">
            <span class="label">ID de Sesión</span>
            <span class="value">{{ sessionId }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="goToMyCourses" class="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Ver Mis Cursos
          </button>
          <button @click="goHome" class="btn-secondary">Volver al Inicio</button>
        </div>

        <div class="info-box">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <div>
            <strong>¡Ya puedes acceder a tus cursos!</strong>
            <p>Los cursos comprados están ahora disponibles en tu perfil.</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="status-card error">
        <div class="error-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1>Error al Verificar Pago</h1>
        <p class="subtitle">{{ errorMessage }}</p>

        <div class="action-buttons">
          <button @click="goToCart" class="btn-primary">Volver al Carrito</button>
          <button @click="goHome" class="btn-secondary">Ir al Inicio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = useRouter()
const route = useRoute()
const sessionStore = useSessionStore()

const verifying = ref(true)
const success = ref(false)
const sessionId = ref('')
const errorMessage = ref('')

const verifyPayment = async () => {
  try {
    const token = localStorage.getItem('token')
    sessionId.value = route.query.session_id

    if (!sessionId.value) {
      throw new Error('No se encontró ID de sesión')
    }

    const response = await fetch(
      `http://localhost:5000/api/pagos/verify-session/${sessionId.value}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()

    if (data.ok && data.paid) {
      success.value = true
    } else {
      throw new Error('El pago no se ha completado')
    }
  } catch (error) {
    console.error('Error verificando pago:', error)
    errorMessage.value = error.message || 'Hubo un problema al verificar tu pago'
    success.value = false
  } finally {
    verifying.value = false
  }
}

const goToMyCourses = () => {
  router.push('/teacher-courses')
}

const goToCart = () => {
  router.push('/carrito')
}

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  if (!sessionStore.isAuthenticated) {
    router.push('/auth/login')
    return
  }
  verifyPayment()
})
</script>

<style scoped>
.payment-success-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.container {
  max-width: 600px;
  width: 100%;
}

.status-card {
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Loading Spinner */
.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top-color: #667eea;
  border-radius: 50%;
  margin: 0 auto 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Success Icon */
.success-icon {
  margin: 0 auto 30px;
  animation: scaleIn 0.5s ease-out 0.2s both;
}

.success-icon svg {
  color: #10b981;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Error Icon */
.error-icon {
  margin: 0 auto 30px;
  animation: scaleIn 0.5s ease-out 0.2s both;
}

.error-icon svg {
  color: #ef4444;
}

/* Typography */
h1 {
  font-size: 32px;
  color: #1f2937;
  margin-bottom: 10px;
  font-weight: 700;
}

h2 {
  font-size: 24px;
  color: #374151;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 30px;
}

/* Payment Details */
.payment-details {
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  margin: 30px 0;
  text-align: left;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.detail-item .label {
  font-weight: 500;
  color: #6b7280;
}

.detail-item .value {
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
  max-width: 60%;
  word-break: break-all;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 180px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

/* Info Box */
.info-box {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 15px;
  text-align: left;
  margin-top: 30px;
}

.info-box svg {
  color: #3b82f6;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-box strong {
  display: block;
  color: #1e40af;
  margin-bottom: 5px;
}

.info-box p {
  color: #1e40af;
  margin: 0;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 640px) {
  .status-card {
    padding: 40px 20px;
  }

  h1 {
    font-size: 24px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .detail-item .value {
    max-width: 100%;
  }
}
</style>
