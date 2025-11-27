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
          @close="showCreateForm = false"
        />

        <!-- Lista de cursos vacía (solo visual) -->
        <div class="no-courses">
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

        <!-- Lista de cursos suscritos (solo visual) -->
        <div class="student-courses">
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
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import CreateCourse from './CreateCourse.vue'

const sessionStore = useSessionStore()
const showCreateForm = ref(false)
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
}
</style>
