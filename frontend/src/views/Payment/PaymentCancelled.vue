<template>
  <div class="payment-cancelled-page">
    <div class="container">
      <div class="status-card">
        <div class="cancelled-icon">
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
        <h1>Pago Cancelado</h1>
        <p class="subtitle">Has cancelado el proceso de pago</p>

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
            <strong>No te preocupes</strong>
            <p>
              No se realizó ningún cargo. Tu carrito todavía contiene los cursos que
              seleccionaste.
            </p>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="goToCart" class="btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              />
            </svg>
            Volver al Carrito
          </button>
          <button @click="goToCourses" class="btn-secondary">Explorar Más Cursos</button>
          <button @click="goHome" class="btn-tertiary">Ir al Inicio</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { onMounted } from 'vue'

const router = useRouter()
const sessionStore = useSessionStore()

const goToCart = () => {
  router.push('/carrito')
}

const goToCourses = () => {
  router.push('/courses')
}

const goHome = () => {
  router.push('/')
}

onMounted(() => {
  if (!sessionStore.isAuthenticated) {
    router.push('/auth/login')
  }
})
</script>

<style scoped>
.payment-cancelled-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
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

/* Cancelled Icon */
.cancelled-icon {
  margin: 0 auto 30px;
  animation: scaleIn 0.5s ease-out 0.2s both;
}

.cancelled-icon svg {
  color: #f59e0b;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Typography */
h1 {
  font-size: 32px;
  color: #1f2937;
  margin-bottom: 10px;
  font-weight: 700;
}

.subtitle {
  font-size: 16px;
  color: #6b7280;
  margin-bottom: 30px;
}

/* Info Box */
.info-box {
  background: #fef3c7;
  border: 1px solid #fde68a;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 15px;
  text-align: left;
  margin-bottom: 30px;
}

.info-box svg {
  color: #d97706;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-box strong {
  display: block;
  color: #92400e;
  margin-bottom: 5px;
}

.info-box p {
  color: #92400e;
  margin: 0;
  font-size: 14px;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
}

.btn-primary,
.btn-secondary,
.btn-tertiary {
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
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
  background: #f59e0b;
  color: white;
}

.btn-secondary:hover {
  background: #d97706;
  transform: translateY(-2px);
}

.btn-tertiary {
  background: #f3f4f6;
  color: #374151;
}

.btn-tertiary:hover {
  background: #e5e7eb;
}

/* Responsive */
@media (max-width: 640px) {
  .status-card {
    padding: 40px 20px;
  }

  h1 {
    font-size: 24px;
  }
}
</style>
