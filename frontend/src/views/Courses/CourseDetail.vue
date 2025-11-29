<template>
  <div class="course-detail-page">
    <!-- Skeleton Loader State -->
    <div v-if="!course" class="loading">
      <div class="container">
        <v-skeleton-loader type="image,heading,list-item-avatar-three-line,paragraph,paragraph,divider,actions" />
      </div>
    </div>

    <!-- Course Content -->
    <div v-else class="container">
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-image">
          <img :src="course.img || 'https://via.placeholder.com/800x400'" :alt="course.titulo" />
        </div>

        <div class="hero-content">
          <h1 class="course-title">{{ course.nombre }}</h1>
          <p class="course-description">{{ course.descripcion }}</p>

          <div class="course-meta">
            <span class="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
              {{ lessons.length }} lecciones
            </span>
            <span class="meta-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {{ course.duracion || 'N/A' }} horas
            </span>
            <span class="meta-item" :class="`complexity-${course.complejidad}`">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              {{ course.complejidad || 'Principiante' }}
            </span>
          </div>

          <!-- Price & Purchase -->
          <div class="price-section">
            <div class="price">
              <span class="current-price">${{ course.precio }} MXN</span>
            </div>
            <button 
              v-if="sessionStore.hasPurchasedCourse(course.id)" 
              class="btn-purchased"
              @click="goToMyCourses"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Ver en mis cursos
            </button>
            <button v-else class="btn-buy" @click="addToCart">Agregar al carrito</button>
          </div>

          <!-- Share Section -->
          <div class="share-section">
            <p class="share-label">Compartir este curso:</p>
            <div class="social-buttons">
              <button class="social-btn twitter" @click="share('twitter')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  />
                </svg>
              </button>
              <button class="social-btn facebook" @click="share('facebook')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </button>
              <button class="social-btn linkedin" @click="share('linkedin')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </button>
              <button class="social-btn copy" @click="copyLink">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Course Details -->
      <div class="content-section">
        <!-- What's Included -->
        <div class="included-section">
          <h2>¿Qué incluye este curso?</h2>
          <ul class="features-list">
            <li>✓ Acceso de por vida</li>
            <li>✓ Certificado de finalización</li>
            <li>✓ Acceso en todos los dispositivos</li>
            <li>✓ Garantía de 30 días</li>
            <li>✓ Soporte 24/7</li>
          </ul>
        </div>

        <!-- Lessons List -->
        <div class="lessons-section">
          <h2>Contenido del Curso ({{ lessons.length }} lecciones)</h2>
          <div v-if="lessons.length === 0" class="no-lessons">
            <p>No hay lecciones disponibles aún.</p>
          </div>
          <div v-else class="lessons-list">
            <div v-for="(lesson, index) in lessons" :key="index" class="lesson-item">
              <span class="lesson-number">{{ index + 1 }}</span>
              <div class="lesson-info">
                <h3>{{ lesson.titulo }}</h3>
              </div>
            </div>
          </div>
        </div>

        <div class="profesor-section" v-if="profesor">
          <h2>Profesor</h2>
          <div class="profesor-card">
            <img :src="profesor.foto" class="profesor-photo" />
            <div class="profesor-info">
              <h3>{{ getProfesorFullName(profesor) }}</h3>
              <p class="profesor-occupation">{{ profesor.ocupacion || 'profesor' }}</p>
              <p class="profesor-courses">{{ profesor.cursos?.length || 0 }} cursos creados</p>
            </div>
          </div>
        </div>

        <!-- Reviews Section -->
        <div class="reviews-section">
          <h2>Valoraciones y Comentarios</h2>
          <div class="rating-summary">
            <div class="rating-score">
              <span class="score">{{ calculateAverageRating() }}</span>
              <div class="stars">{{ generateStars(calculateAverageRating()) }}</div>
              <span class="total-reviews">({{ course.comentarios?.length || 0 }} valoraciones)</span>
            </div>
          </div>

          <!-- Add Comment Form -->
          <div class="add-comment-section">
            <h3>Deja tu comentario</h3>
            <div class="comment-form">
              <div class="form-group">
                <label>Tu valoración:</label>
                <div class="star-rating">
                  <button
                    v-for="star in 5"
                    :key="star"
                    @click="newComment.valoracion = star"
                    :class="{ active: star <= newComment.valoracion }"
                    class="star-btn"
                  >
                    ★
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label>Tu comentario:</label>
                <textarea
                  v-model="newComment.texto"
                  placeholder="Comparte tu experiencia con este curso..."
                  maxlength="500"
                />
                <span class="char-count">{{ newComment.texto.length }}/500</span>
              </div>
              <div class="form-group checkbox">
                <label>
                  <input 
                    v-model="newComment.anonimo" 
                    type="checkbox"
                  />
                  Comentar de forma anónima
                </label>
              </div>
              <button @click="submitComment" class="btn-submit-comment">Publicar Comentario</button>
            </div>
          </div>

          <!-- Comments List -->
          <div class="comments-list">
            <div v-if="!comentariosConFotos || comentariosConFotos.length === 0" class="no-comments">
              <p>Sin comentarios aún. ¡Sé el primero en comentar!</p>
            </div>
            <div v-else>
              <div v-for="comentario in comentariosConFotos" :key="comentario.id" class="comment-card">
                <div class="comment-header">
                  <div class="user-info">
                    <div 
                      v-if="!comentario.anonimo && comentario.fotoUrl" 
                      class="user-avatar user-photo"
                    >
                      <img :src="comentario.fotoUrl" :alt="comentario.nombreUsuario" />
                    </div>
                    <div v-else class="user-avatar" :class="{ 'anonymous': comentario.anonimo }">
                      {{ comentario.anonimo ? '?' : getUserInitials(comentario.nombreUsuario || comentario.usuarioId) }}
                    </div>
                    <div class="user-details">
                      <p class="user-name">{{ comentario.anonimo ? 'Anónimo' : (comentario.nombreUsuario || 'Usuario Anónimo') }}</p>
                      <p class="comment-date">{{ formatDate(comentario.fecha) }}</p>
                    </div>
                  </div>
                  <div class="comment-rating">
                    <span class="stars">{{ generateStars(comentario.valoracion) }}</span>
                    <span class="rating-value">{{ comentario.valoracion }}/5</span>
                  </div>
                </div>
                <div class="comment-body">
                  <p>{{ comentario.texto }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Why Buy Section -->
        <div class="why-buy-section">
          <div class="why-buy-header">
            <span class="badge">Aprende a tu ritmo</span>
            <h2>¿Por qué comprar un curso en Skillverse?</h2>
            <p>
              Skillverse te ofrece la mejor experiencia de aprendizaje online con cursos creados por
              expertos, acceso de por vida y certificación reconocida.
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-image">
                <img src="../../assets/CourseDetail/instructor.jpeg" alt="Instructores Expertos" />
                <span class="feature-badge">INSTRUCTORES</span>
              </div>
              <div class="feature-content">
                <h3>Aprende de los mejores</h3>
                <p>
                  Nuestros cursos son creados por profesionales con años de experiencia en la
                  industria. Aprende técnicas y estrategias que realmente funcionan en el mundo
                  real.
                </p>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-image">
                <img src="../../assets/CourseDetail/acceso.jpg" alt="Acceso de por vida" />
                <span class="feature-badge">ACCESO</span>
              </div>
              <div class="feature-content">
                <h3>Acceso ilimitado para siempre</h3>
                <p>
                  Compra una vez y accede al contenido cuando quieras, desde cualquier dispositivo.
                  Repasa las lecciones todas las veces que necesites sin límite de tiempo.
                </p>
              </div>
            </div>

            <div class="feature-card">
              <div class="feature-image">
                <img src="../../assets/CourseDetail/certificado.png" alt="Certificación" />
                <span class="feature-badge">CERTIFICADO</span>
              </div>
              <div class="feature-content">
                <h3>Certificación reconocida</h3>
                <p>
                  Al completar el curso, obtén un certificado digital que puedes compartir en
                  LinkedIn y tu CV para demostrar tus nuevas habilidades a empleadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()
const sessionStore = useSessionStore()
const router = useRouter()

// FETCH HELPERS
import { getCurso, getProfesor } from '@/utils/fetchCourseInfo'

const route = useRoute()
const courseId = route.params.id

const course = ref(null)
const lessons = ref([])
const profesor = ref(null)
const newComment = ref({
  texto: '',
  valoracion: 5,
  anonimo: false
})
const userPhotos = ref({}) // Cache de fotos de usuarios

const preloadUserPhotos = async (comentarios) => {
  if (!comentarios || comentarios.length === 0) return
  
  for (const comentario of comentarios) {
    // Si el comentario no es anónimo y no tiene fotoUsuario, cargarla
    if (!comentario.anonimo && comentario.usuarioId && !comentario.fotoUsuario && !userPhotos.value[comentario.usuarioId]) {
      await getUserPhotoAsync(comentario.usuarioId)
    }
    // Si tiene fotoUsuario, guardarla en cache también
    if (!comentario.anonimo && comentario.fotoUsuario && comentario.usuarioId) {
      userPhotos.value[comentario.usuarioId] = comentario.fotoUsuario
    }
  }
}

onMounted(async () => {
  uiStore.setTitlePage('Courses')
  uiStore.setTabPage('Courses')

  // Cargar información del curso
  const cursoData = await getCurso(courseId)

  if (cursoData) {
    course.value = cursoData

    // Cargar lecciones
    lessons.value = cursoData.lecciones || []

    // Cargar información del profesor
    profesor.value = await getProfesor(cursoData.profesor)
    
    // Precargar fotos de usuarios en comentarios
    await preloadUserPhotos(cursoData.comentarios)
  }
})

// Watch para limpiar el cache cuando cambie el usuario
watch(() => sessionStore.userId, async () => {
  // Limpiar cache de fotos cuando cambia el usuario
  userPhotos.value = {}
  // Recargar fotos de comentarios para la nueva cuenta
  if (course.value?.comentarios) {
    await preloadUserPhotos(course.value.comentarios)
  }
})

// Computed para comentarios con fotos cargadas
const comentariosConFotos = computed(() => {
  if (!course.value?.comentarios) return []
  return course.value.comentarios.map(comentario => ({
    ...comentario,
    fotoUrl: comentario.fotoUsuario || userPhotos.value[comentario.usuarioId] || null
  }))
})

// Methods
const addToCart = () => {
  if (!sessionStore.isAuthenticated) {
    alert('Por favor, inicia sesión para comprar el curso.')
    return
  }
  if (!sessionStore.isStudent) {
    alert('Solo los estudiantes pueden comprar cursos.')
    return
  }

  sessionStore.addToCart(course.value.id)
}

const goToMyCourses = () => {
  router.push('/teacher-courses') 
}

const getProfesorFullName = (prof) => {
  if (!prof) return 'Profesor'
  
  const nombre = prof.nombre || ''
  const apaterno = prof.apaterno || ''
  const amaterno = prof.amaterno || ''
  
  // Si apaterno está vacío pero amaterno tiene valor, usar amaterno como apaterno
  if (!apaterno && amaterno) {
    return [nombre, amaterno].filter(p => p).join(' ')
  }
  
  // Siempre mostrar nombre y apaterno
  const parts = [nombre, apaterno]
  
  // Agregar amaterno solo si existe y es diferente a apaterno
  if (amaterno && amaterno !== apaterno) {
    parts.push(amaterno)
  }
  
  return parts.filter(p => p).join(' ')
}

const handleBuy = () => {
  alert('Procesando compra...')
}

const share = (platform) => {
  const url = window.location.href
  const title = course.value?.titulo || 'Curso'

  const urls = {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  }

  if (urls[platform]) {
    window.open(urls[platform], '_blank', 'width=600,height=400')
  }
}

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href)
  alert('¡Link copiado al portapapeles!')
}

const calculateAverageRating = () => {
  if (!course.value?.comentarios || course.value.comentarios.length === 0) {
    return 'N/A'
  }
  const sum = course.value.comentarios.reduce((acc, c) => acc + c.valoracion, 0)
  const average = (sum / course.value.comentarios.length).toFixed(1)
  return average
}

const generateStars = (rating) => {
  if (rating === 'N/A') return '☆☆☆☆☆'
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  let stars = '★'.repeat(fullStars)
  if (hasHalfStar) stars += '✭'
  stars += '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))
  return stars
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getUserInitials = (nameOrId) => {
  if (!nameOrId) return 'U'
  // Si tiene espacios, usa las iniciales de nombre y apellido
  if (nameOrId.includes(' ')) {
    const parts = nameOrId.split(' ')
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  // Si es ID, usa los primeros 2 caracteres
  return nameOrId.substring(0, 2).toUpperCase()
}

const getUserPhotoAsync = async (usuarioId) => {
  // Si ya está en cache, retornar
  if (userPhotos.value[usuarioId] !== undefined) {
    return userPhotos.value[usuarioId]
  }

  try {
    const response = await fetch(`http://localhost:5000/api/usuarios/foto/${usuarioId}`, {
      method: 'GET'
    })

    if (response.ok) {
      const data = await response.json()
      const foto = data.result?.foto || null
      // Guardar en cache
      userPhotos.value[usuarioId] = foto
      return foto
    }
  } catch (error) {
    console.error('Error obteniendo foto del usuario:', error)
  }

  // Si algo falla, guardar null en cache para no intentar de nuevo
  userPhotos.value[usuarioId] = null
  return null
}

const getUserPhoto = (usuarioId) => {
  // Retorna de cache (síncrona) - la foto debe estar precargada
  return userPhotos.value[usuarioId] || null
}

const submitComment = async () => {
  if (!newComment.value.texto.trim()) {
    alert('Por favor escribe un comentario')
    return
  }

  if (!sessionStore.isAuthenticated) {
    alert('Debes estar logueado para comentar')
    return
  }

  try {
    const token = sessionStore.token
    const response = await fetch(
      `http://localhost:5000/api/cursos/${courseId}/comentarios`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          texto: newComment.value.texto,
          valoracion: newComment.value.valoracion,
          anonimo: newComment.value.anonimo
        })
      }
    )

    const data = await response.json()

    if (response.ok) {
      // Recargar curso para obtener comentarios actualizados
      const cursoData = await getCurso(courseId)
      if (cursoData) {
        course.value = cursoData
        // Precargar fotos de usuarios en comentarios
        await preloadUserPhotos(cursoData.comentarios)
      }
      
      // Limpiar formulario
      newComment.value = {
        texto: '',
        valoracion: 5,
        anonimo: false
      }
      alert('¡Comentario publicado!')
    } else {
      alert('Error al publicar comentario: ' + data.message)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error al publicar comentario')
  }
}
</script>

<style scoped>
.course-detail-page {
  background: #f8f9fa;
  min-height: 100vh;
  padding: 20px 0;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.hero-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.hero-content {
  padding: 30px;
}

.course-title {
  font-size: 32px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 15px;
}

.course-description {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.course-meta {
  display: flex;
  gap: 25px;
  margin-bottom: 25px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

.meta-item svg {
  color: #4a90e2;
}

.meta-item.complexity-principiante {
  color: #2e7d32;
}

.meta-item.complexity-principiante svg {
  color: #2e7d32;
}

.meta-item.complexity-intermedio {
  color: #f57c00;
}

.meta-item.complexity-intermedio svg {
  color: #f57c00;
}

.meta-item.complexity-avanzado {
  color: #c62828;
}

.meta-item.complexity-avanzado svg {
  color: #c62828;
}

/* Price Section */
.price-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 25px;
}

.price {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-size: 36px;
  font-weight: bold;
  color: #1a1a1a;
}

.original-price {
  font-size: 20px;
  color: #999;
  text-decoration: line-through;
}

.discount {
  background: #ff6b6b;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
}

.btn-buy {
  background: rgba(73, 187, 189, 1) 100%;
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-buy:hover {
  background: rgba(73, 187, 189, 0.8);
}

.btn-purchased {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 14px 40px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-purchased:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
}

.share-section {
  padding-top: 20px;
}

.share-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.social-buttons {
  display: flex;
  gap: 12px;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  color: white;
}

.social-btn:hover {
  transform: scale(1.1);
}

.social-btn.twitter {
  background: #1da1f2;
}

.social-btn.facebook {
  background: #1877f2;
}

.social-btn.linkedin {
  background: #0077b5;
}

.social-btn.copy {
  background: #666;
}

/* Content Section */
.content-section {
  display: grid;
  gap: 30px;
}

.content-section > div {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.content-section h2 {
  font-size: 24px;
  color: #1a1a1a;
  margin-bottom: 20px;
}

/* Included Section */
.features-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.features-list li {
  color: #666;
  font-size: 15px;
}

/* Lessons Section */
.no-lessons {
  text-align: center;
  color: #999;
  padding: 40px 0;
}

.lessons-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.lesson-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: background 0.2s;
}

.lesson-item:hover {
  background: #e9ecef;
}

.lesson-number {
  width: 32px;
  height: 32px;
  background: #4a90e2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.lesson-info {
  flex: 1;
}

.lesson-info h3 {
  font-size: 16px;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.lesson-info p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.lesson-duration {
  color: #999;
  font-size: 14px;
  flex-shrink: 0;
}

.profesor-card {
  display: flex;
  gap: 20px;
  align-items: center;
}

.profesor-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.profesor-info h3 {
  font-size: 18px;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.profesor-info p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.profesor-occupation {
  font-size: 15px;
  color: #4a90e2;
  font-weight: 600;
  margin-bottom: 4px;
}

.profesor-courses {
  font-size: 14px;
  color: #999;
  margin-bottom: 12px;
}

/* Reviews Section */
.rating-summary {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.rating-score {
  display: flex;
  align-items: center;
  gap: 15px;
}

.score {
  font-size: 36px;
  font-weight: bold;
  color: #4a90e2;
}

.stars {
  font-size: 20px;
  color: #ffc107;
}

.total-reviews {
  color: #666;
  font-size: 14px;
}

/* Add Comment Section */
.add-comment-section {
  background: white;
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid #e9ecef;
}

.add-comment-section h3 {
  margin-bottom: 20px;
  color: #1a1a1a;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.star-rating {
  display: flex;
  gap: 8px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s;
  padding: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.star-btn:hover,
.star-btn.active {
  color: #ffc107;
}

.form-group textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
}

.form-group textarea:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-group.checkbox {
  display: flex;
  align-items: center;
  margin-top: 16px;
}

.form-group.checkbox label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  cursor: pointer;
  font-size: 14px;
}

.form-group.checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.char-count {
  font-size: 12px;
  color: #999;
  text-align: right;
}

.btn-submit-comment {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit-comment:hover {
  background: #357abd;
}

/* Comments List */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.no-comments {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #999;
}

.comment-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: box-shadow 0.2s;
}

.comment-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: #4a90e2;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.user-avatar.user-photo {
  background: transparent;
  overflow: hidden;
}

.user-avatar.user-photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.user-avatar.anonymous {
  background: #9c9c9c;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  margin: 0;
  font-weight: 600;
  color: #1a1a1a;
  font-size: 14px;
}

.comment-date {
  margin: 0;
  font-size: 12px;
  color: #999;
}

.comment-rating {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rating-value {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.comment-body {
  margin: 0;
  color: #555;
  line-height: 1.6;
  font-size: 14px;
}

.score {
  font-size: 48px;
  font-weight: bold;
  color: #1a1a1a;
}

.stars {
  color: #ffc107;
  font-size: 24px;
}

.total-reviews {
  color: #666;
  font-size: 14px;
}

.why-buy-section {
  max-width: 1200px;
  margin: 60px auto 40px;
  padding: 0 20px;
}

.why-buy-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
}

.badge {
  display: inline-block;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.why-buy-header h2 {
  font-size: 32px;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.why-buy-header p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.feature-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(74, 144, 226, 0.8);
  color: white;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.feature-content {
  padding: 24px;
}

.feature-content h3 {
  font-size: 20px;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.feature-content p {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-image img {
    height: 250px;
  }

  .course-title {
    font-size: 24px;
  }

  .price-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-buy {
    width: 100%;
    margin-left: 0;
  }

  .instructor-card {
    flex-direction: column;
    text-align: center;
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
