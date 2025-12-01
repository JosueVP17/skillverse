<template>
  <div class="shopping-cart-page">
    <div class="container">
      <!-- Header -->
      <div class="cart-header">
        <button @click="goBack" class="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <h1>Carrito de Compras</h1>
        <div class="cart-count">
          {{ cartItems.length }} {{ cartItems.length === 1 ? 'curso' : 'cursos' }}
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Cargando carrito...</p>
      </div>

      <!-- Empty Cart -->
      <div v-else-if="cartItems.length === 0" class="empty-cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <h2>Tu carrito está vacío</h2>
        <p>Explora nuestros cursos y comienza a aprender hoy</p>
        <button @click="goToCourses" class="btn-primary">Ver Cursos</button>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-content">
        <!-- Cart Items -->
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.img || 'https://via.placeholder.com/200x120'" :alt="item.nombre" />
            </div>

            <div class="item-details">
              <h3 class="item-title">{{ item.nombre }}</h3>
              <p class="item-description">{{ truncateText(item.descripcion, 100) }}</p>

              <div class="item-meta">
                <span class="meta-badge">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                  {{ item.lecciones?.length || 0 }} lecciones
                </span>
                <span class="meta-badge">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {{ item.duracion || 'N/A' }} horas
                </span>
              </div>
            </div>

            <div class="item-actions">
              <div class="item-price">${{ item.precio }} MXN</div>
              <button @click="removeItem(item.id)" class="btn-remove">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  />
                </svg>
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <div class="summary-card">
            <h2>Resumen de compra</h2>

            <div class="summary-details">
              <div class="summary-row">
                <span
                  >Subtotal ({{ cartItems.length }}
                  {{ cartItems.length === 1 ? 'curso' : 'cursos' }})</span
                >
                <span class="price">${{ subtotal.toFixed(2) }} MXN</span>
              </div>

              <div class="summary-row">
                <span>Impuestos (16%)</span>
                <span class="price">${{ tax.toFixed(2) }} MXN</span>
              </div>

              <div class="summary-divider"></div>

              <div class="summary-row total">
                <span>Total</span>
                <span class="price">${{ total.toFixed(2) }} MXN</span>
              </div>
            </div>

            <button @click="proceedToCheckout" class="btn-checkout" :disabled="processingPayment">
              <div v-if="processingPayment" class="spinner-small"></div>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              {{ processingPayment ? 'Procesando...' : 'Proceder al pago' }}
            </button>

            <div class="security-note">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Pago 100% seguro y protegido
            </div>
          </div>

          <!-- Additional Info -->
          <div class="info-card">
            <h3>¿Por qué comprar en Skillverse?</h3>
            <ul class="benefits-list">
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Acceso de por vida
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Certificado al finalizar
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Acceso en todos los dispositivos
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Garantía de 30 días
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Soporte 24/7
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que deseas eliminar este curso del carrito?</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn text @click="cancelDelete">Cancelar</v-btn>
          <v-btn color="error" text @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { renderStripeProcess } from '@/utils/stripeProcess'

const router = useRouter()
const sessionStore = useSessionStore()

const cartItems = ref([])
const loading = ref(true)
const processingPayment = ref(false)
const showDeleteDialog = ref(false)
const courseToDelete = ref(null)

// Computed
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (parseFloat(item.precio) || 0), 0)
})

const tax = computed(() => {
  return subtotal.value * 0.16
})

const total = computed(() => {
  return subtotal.value + tax.value
})

// Methods
const getCurso = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cursos/${id}`)
    const data = await response.json()

    if (data.ok) {
      return data.curso
    }
  } catch (error) {
    console.error('Error al obtener curso:', error)
    return null
  }
}

const loadCartItems = async () => {
  loading.value = true

  try {
    // Obtener los IDs del carrito
    await sessionStore.fetchCart()
    const cartIds = sessionStore.cart

    if (cartIds.length === 0) {
      cartItems.value = []
      loading.value = false
      return
    }

    // Obtener la información completa de cada curso
    const coursesPromises = cartIds.map((id) => getCurso(id))
    const courses = await Promise.all(coursesPromises)

    // Filtrar cursos válidos e inválidos
    const validCourses = []
    const invalidCourseIds = []

    courses.forEach((course, index) => {
      if (course === null) {
        invalidCourseIds.push(cartIds[index])
      } else {
        validCourses.push(course)
      }
    })

    // Eliminar cursos inválidos del carrito (si hay alguno)
    if (invalidCourseIds.length > 0) {
      // Eliminar todos los cursos inválidos de una vez
      await Promise.all(
        invalidCourseIds.map(courseId => sessionStore.removeFromCart(courseId))
      )

      // Recargar el carrito
      await sessionStore.fetchCart()

      // Mostrar mensaje al usuario
      sessionStore.snackbar = {
        show: true,
        message: 'Algunos cursos en tu carrito ya no están disponibles y han sido eliminados.',
        color: 'warning',
      }
    }

    //Asignar los cursos válidos a cartItems
    cartItems.value = validCourses

  } catch (error) {
    console.error('Error al cargar items del carrito:', error)
    cartItems.value = []
  } finally {
    loading.value = false
  }
}

const removeItem = async (courseId) => {
  //if (!confirm('¿Estás seguro de que deseas eliminar este curso del carrito?')) {
    //return
    courseToDelete.value = courseId
    showDeleteDialog.value = true
  }

const confirmDelete = async () => {
  if (!courseToDelete.value) return

  const courseId = courseToDelete.value
  
  // Cerrar el diálogo INMEDIATAMENTE
  showDeleteDialog.value = false
  courseToDelete.value = null

  // LUEGO ejecutar la operación
  const result = await sessionStore.removeFromCart(courseId)

  if (result.result) {
    await loadCartItems()
  } else {
    sessionStore.snackbar = {
      show: true,
      message: 'Error al eliminar el curso: ' + result.message,
      color: 'error',
    }
  }
}

const cancelDelete = () => {
  showDeleteDialog.value = false
  courseToDelete.value = null
}

const proceedToCheckout = async () => {
  if (processingPayment.value) return
  
  try {
    processingPayment.value = true
    await renderStripeProcess(sessionStore.userId)
  } catch (error) {
    processingPayment.value = false
    sessionStore.snackbar = {
      show: true,
      message: 'Error al procesar el pago: ' + error.message,
      color: 'error',
    }
  }
}

const goBack = () => {
  router.go(-1)
}

const goToCourses = () => {
  router.push('/courses')
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Lifecycle
onMounted(async () => {
  if (!sessionStore.isAuthenticated) {
    sessionStore.snackbar = {
      show: true,
      message: 'Debes iniciar sesión para acceder al carrito',
      color: 'warning',
    }
    router.push('/auth/login')
    return
  }

  if (!sessionStore.isStudent) {
    sessionStore.snackbar = {
      show: true,
      message: 'Solo los estudiantes pueden acceder al carrito',
      color: 'warning',
    }
    router.push('/')
    return
  }

  await loadCartItems()
})
</script>

<style scoped>
.shopping-cart-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 20px;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 1px solid #e0e0e0;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
}

.back-button:hover {
  background: #f8f9fa;
  border-color: #49bbbd;
  color: #49bbbd;
}

.cart-header h1 {
  flex: 1;
  font-size: 32px;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0;
}

.cart-count {
  background: #49bbbd;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 80px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #49bbbd;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-state p {
  color: #666;
  font-size: 16px;
}

/* Empty Cart */
.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-cart svg {
  color: #ccc;
  margin-bottom: 24px;
}

.empty-cart h2 {
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.empty-cart p {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
}

/* Cart Content */
.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  align-items: start;
}

/* Cart Items */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.item-image {
  width: 200px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.item-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.item-meta {
  display: flex;
  gap: 15px;
  margin-top: 8px;
}

.meta-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
}

.meta-badge svg {
  color: #49bbbd;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  min-width: 140px;
}

.item-price {
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;
}

.btn-remove {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #e0e0e0;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  transition: all 0.3s;
}

.btn-remove:hover {
  background: #fff5f5;
  border-color: #ff6b6b;
  color: #ff6b6b;
}

/* Cart Summary */
.cart-summary {
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-card,
.info-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.summary-card h2,
.info-card h3 {
  font-size: 20px;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: #666;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  color: #1a1a1a;
}

.summary-row .price {
  font-weight: 600;
  color: #1a1a1a;
}

.summary-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 8px 0;
}

.btn-checkout {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #49bbbd;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background 0.3s;
}

.btn-checkout:hover {
  background: #3da9ab;
}

.btn-primary {
  background: #49bbbd;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #3da9ab;
}

.security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
  font-size: 13px;
  color: #666;
}

.security-note svg {
  color: #49bbbd;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.benefits-list li svg {
  color: #49bbbd;
  flex-shrink: 0;
}

/* Spinner para el botón */
.spinner-small {
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

.btn-checkout:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .cart-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-header h1 {
    font-size: 24px;
  }

  .cart-item {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: 180px;
  }

  .item-actions {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
}
</style>
