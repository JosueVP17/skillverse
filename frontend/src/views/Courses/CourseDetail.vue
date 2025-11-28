<template>
  <div class="course-detail-page">
    <!-- Loading State -->
    <div v-if="!course" class="loading">
      <p>Cargando curso...</p>
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
            <button class="btn-buy" @click="handleBuy">Comprar Ahora</button>
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
            <li>✓ Material descargable</li>
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

        <div class="profesor-section">
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
          <h2>Valoraciones</h2>
          <div class="rating-summary">
            <div class="rating-score">
              <span class="score">{{ course.rating || '4.5' }}</span>
              <div class="stars">★★★★☆</div>
              <span class="total-reviews">({{ course.totalReviews || '120' }} valoraciones)</span>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// STORES
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()

// FETCH HELPERS
import { getCurso, getProfesor } from '@/utils/fetchCourseInfo'

const route = useRoute()
const courseId = route.params.id

const course = ref(null)
const lessons = ref([])
const profesor = ref(null)

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
    console.log('Profesor data:', profesor.value) // DEBUG
  }
})

// Methods
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
}

.btn-buy:hover {
  background: rgba(73, 187, 189, 0.8);
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
}

.rating-score {
  display: flex;
  align-items: center;
  gap: 15px;
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
