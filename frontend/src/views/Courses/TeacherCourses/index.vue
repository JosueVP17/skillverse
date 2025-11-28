<template>
  <div class="teacher-courses-page">
    <div class="container">
      <!-- VISTA PARA PROFESORES -->
      <template v-if="sessionStore.isTeacher">
        <div class="header-section">
          <h1>Mis Cursos</h1>
          <button class="btn-create" @click="showCreateForm = true">
            + Crear Nuevo Curso
          </button>
        </div>

        <!-- Modal para crear curso -->
        <CreateCourse 
          v-if="showCreateForm" 
          :editing-curso="editingCurso"
          @close="showCreateForm = false; editingCurso = null"
          @course-created="handleCourseCreated"
        />

        <!-- Lista de cursos si existen -->
        <div v-if="teacherCourses.length > 0" class="courses-grid">
          <div v-for="curso in teacherCourses" :key="curso.id" class="course-card">
            <div class="course-image">
              <img :src="curso.img" :alt="curso.nombre" />
            </div>
            <div class="course-content">
              <h3>{{ curso.nombre }}</h3>
              <p class="description">{{ curso.descripcion }}</p>
              <div class="course-meta">
                <span class="price">${{ curso.precio }}</span>
                <span class="duration">{{ curso.duracion }}h</span>
                <span v-if="curso.complejidad" class="complexity" :class="`complexity-${curso.complejidad.toLowerCase()}`">
                  {{ curso.complejidad }}
                </span>
              </div>
              <div class="course-actions">
                <button class="btn-edit" @click="editCourse(curso)">Editar</button>
                <button class="btn-delete" @click="deleteCourse(curso.id)">Eliminar</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de cursos vacía -->
        <div v-else class="no-courses">
          <v-icon size="80" color="rgba(73, 187, 189, 0.3)">mdi-book-open-variant</v-icon>
          <p>Aún no has creado ningún curso</p>
          <button class="btn-create" @click="showCreateForm = true">
            Crear tu primer curso
          </button>
        </div>
      </template>

      <!-- VISTA PARA ESTUDIANTES -->
      <template v-else>
        <div class="header-section">
          <h1>Mis Cursos</h1>
        </div>

        <!-- Lista de cursos suscritos si existen -->
        <div v-if="studentCourses.length > 0" class="courses-grid">
          <div v-for="curso in studentCourses" :key="curso.id" class="course-card">
            <div class="course-image">
              <img :src="curso.img" :alt="curso.nombre" />
            </div>
            <div class="course-content">
              <h3>{{ curso.nombre }}</h3>
              <p class="description">{{ curso.descripcion }}</p>
              <div class="course-meta">
                <span class="price">${{ curso.precio }}</span>
                <span class="duration">{{ curso.duracion }}h</span>
                <span v-if="curso.complejidad" class="complexity" :class="`complexity-${curso.complejidad.toLowerCase()}`">
                  {{ curso.complejidad }}
                </span>
              </div>
              <div class="course-actions">
                <button class="btn-view">Ver Curso</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista de cursos vacía -->
        <div v-else class="student-courses">
          <v-icon size="80" color="rgba(73, 187, 189, 0.3)">mdi-book-multiple</v-icon>
          <p>Aún no te has suscrito a ningún curso</p>
          <router-link to="/courses" class="btn-browse">
            Explorar Cursos
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import { profileService } from '@/services/profile.service'
import { cursoService } from '@/services/curso.service'
import CreateCourse from './CreateCourse.vue'

const sessionStore = useSessionStore()
const showCreateForm = ref(false)
const editingCurso = ref(null)
const teacherCourses = ref([])
const studentCourses = ref([])
const loadingCourses = ref(false)

// Función para cargar/recargar cursos desde el servidor
const loadCourses = async () => {
  loadingCourses.value = true
  try {
    const userType = sessionStore.isTeacher ? 'profesor' : 'usuario'
    const response = await profileService.getProfile(sessionStore.token, userType)
    
    if (response.ok && response.result) {
      const userData = response.result
      
      // Para profesores: cargar cursos creados
      if (sessionStore.isTeacher && userData.cursos) {
        teacherCourses.value = (userData.cursos || []).filter(curso => 
          curso && curso.id && curso.nombre && curso.descripcion && curso.precio !== undefined && curso.duracion !== undefined && curso.img && curso.categoria && curso.complejidad
        )
      }
      
      // Para estudiantes: cargar cursos suscritos
      if (!sessionStore.isTeacher && userData.cursosComprados) {
        studentCourses.value = (userData.cursosComprados || []).filter(curso =>
          curso && curso.id && curso.nombre && curso.descripcion && curso.precio !== undefined && curso.duracion !== undefined && curso.img && curso.categoria && curso.complejidad
        )
      }
    }
  } catch (error) {
    console.error('Error cargando cursos:', error)
  } finally {
    loadingCourses.value = false
  }
}

// Cargar cursos cuando se monta el componente
onMounted(() => {
  loadCourses()
})

const handleCourseCreated = async (newCurso) => {
  // Recargar los cursos desde el servidor para obtener los datos actualizados
  await loadCourses()
  showCreateForm.value = false
  editingCurso.value = null
}

const editCourse = (curso) => {
  editingCurso.value = { ...curso }
  showCreateForm.value = true
}

const deleteCourse = async (cursoId) => {
  if (!confirm('¿Estás seguro que quieres eliminar este curso?')) {
    return
  }

  try {
    await cursoService.deleteCurso(cursoId, sessionStore.token)
    alert('Curso eliminado exitosamente')
    // Recargar los cursos desde el servidor
    await loadCourses()
  } catch (error) {
    alert('Error al eliminar curso: ' + error.message)
    console.error('Delete curso error:', error)
  }
}
</script>

<style scoped>
.teacher-courses-page {
  background: #f8f9fa;
  min-height: 100vh;
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header-section h1 {
  font-size: 32px;
  color: #1a1a1a;
  margin: 0;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.btn-create {
  background: rgba(73, 187, 189, 1);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-create:hover {
  background: rgba(73, 187, 189, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(73, 187, 189, 0.3);
}

.no-courses {
  text-align: center;
  background: white;
  padding: 80px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.no-courses p {
  font-size: 18px;
  color: #666;
  margin: 20px 0;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.student-courses {
  text-align: center;
  background: white;
  padding: 80px 40px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.student-courses p {
  font-size: 18px;
  color: #666;
  margin: 20px 0;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
}

.btn-browse {
  display: inline-block;
  background: rgba(73, 187, 189, 1);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
}

.btn-browse:hover {
  background: rgba(73, 187, 189, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(73, 187, 189, 0.3);
}

/* Grid de cursos */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.course-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.course-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

.course-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f0f0f0;
}

.course-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.course-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-content h3 {
  font-size: 18px;
  color: #1a1a1a;
  margin: 0 0 12px 0;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  line-height: 1.4;
}

.description {
  font-size: 14px;
  color: #666;
  margin: 0 0 16px 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.course-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  font-family: 'Poppins', sans-serif;
}

.price {
  background: rgba(73, 187, 189, 0.1);
  color: rgba(73, 187, 189, 1);
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.duration {
  background: #f0f0f0;
  color: #666;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.complexity {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 600;
  color: white;
}

.complexity-principiante {
  background: #4CAF50;
}

.complexity-intermedio {
  background: #FF9800;
}

.complexity-avanzado {
  background: #F44336;
}

.course-actions {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.btn-edit,
.btn-delete,
.btn-view {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-edit {
  background: rgba(73, 187, 189, 1);
  color: white;
}

.btn-edit:hover {
  background: rgba(73, 187, 189, 0.85);
}

.btn-delete {
  background: #f0f0f0;
  color: #1a1a1a;
}

.btn-delete:hover {
  background: #e0e0e0;
}

.btn-view {
  background: rgba(73, 187, 189, 1);
  color: white;
}

.btn-view:hover {
  background: rgba(73, 187, 189, 0.85);
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .header-section h1 {
    font-size: 24px;
  }

  .btn-create {
    width: 100%;
  }

  .no-courses {
    padding: 60px 20px;
  }

  .student-courses {
    padding: 60px 20px;
  }

  .courses-grid {
    grid-template-columns: 1fr;
  }
}
</style>
