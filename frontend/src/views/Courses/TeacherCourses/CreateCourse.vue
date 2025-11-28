<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ editingCurso ? 'Editar Curso' : 'Crear Nuevo Curso' }}</h2>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>

      <!-- Tabs -->
      <div class="modal-tabs">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'info' }"
          @click="activeTab = 'info'"
        >
          Información del Curso
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'lecciones' }"
          @click="activeTab = 'lecciones'"
        >
          Lecciones ({{ formData.lecciones?.length || 0 }})
        </button>
      </div>

      <form @submit.prevent="submitForm" class="form">
        <!-- TAB: INFORMACIÓN -->
        <div v-if="activeTab === 'info'" class="tab-content">
          <div class="form-group">
            <label>Nombre del Curso *</label>
            <input v-model="formData.nombre" type="text" placeholder="Ej: Introducción a Vue.js" />
          </div>

          <div class="form-group">
            <label>Descripción *</label>
            <textarea v-model="formData.descripcion" placeholder="Describe el contenido del curso" rows="4"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Precio (MXN) *</label>
              <input v-model.number="formData.precio" type="number" placeholder="299" min="0" />
            </div>

            <div class="form-group">
              <label>Duración (horas) *</label>
              <input v-model.number="formData.duracion" type="number" placeholder="20" min="0" />
            </div>
          </div>

          <div class="form-group">
            <label>URL de Imagen *</label>
            <input v-model="formData.img" type="url" placeholder="https://..." />
          </div>

          <div class="form-group">
            <label>Categoría *</label>
            <select v-model="formData.categoria">
              <option value="">Selecciona una categoría</option>
              <option value="programacion">Programación</option>
              <option value="diseño">Diseño</option>
              <option value="marketing">Marketing</option>
              <option value="negocios">Negocios</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div class="form-group">
            <label>Nivel de Complejidad *</label>
            <select v-model="formData.complejidad">
              <option value="">Selecciona el nivel</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
        </div>

        <!-- TAB: LECCIONES -->
        <div v-if="activeTab === 'lecciones'" class="tab-content">
          <div class="lecciones-section">
            <h3>Lecciones del Curso</h3>
            
            <!-- Lista de lecciones -->
            <div v-if="formData.lecciones && formData.lecciones.length > 0" class="lecciones-list">
              <div v-for="(leccion, index) in formData.lecciones" :key="index" class="leccion-card">
                <div class="leccion-header">
                  <h4>{{ leccion.titulo }}</h4>
                  <button type="button" class="btn-remove" @click="removeLeccion(index)">Eliminar</button>
                </div>
                <p class="leccion-texto">{{ leccion.texto.substring(0, 100) }}...</p>
              </div>
            </div>
            <div v-else class="no-lecciones">
              <p>No hay lecciones agregadas aún</p>
            </div>

            <!-- Formulario para agregar lección -->
            <div class="add-leccion-form">
              <h4>Agregar Nueva Lección</h4>
              
              <div class="form-group">
                <label>Título de la Lección *</label>
                <input v-model="newLeccion.titulo" type="text" placeholder="Ej: Introducción a los componentes" />
              </div>

              <div class="form-group">
                <label>Texto/Contenido *</label>
                <textarea v-model="newLeccion.texto" placeholder="Contenido de la lección" rows="3"></textarea>
              </div>

              <div class="form-group">
                <label>URL de Imagen *</label>
                <input v-model="newLeccion.imagen" type="url" placeholder="https://..." />
              </div>

              <div class="form-group">
                <label>URL de Video (opcional)</label>
                <input v-model="newLeccion.video" type="url" placeholder="https://..." />
              </div>

              <button type="button" class="btn-add-leccion" @click="addLeccion">
                + Agregar Lección
              </button>
            </div>
          </div>
        </div>

        <!-- Acciones -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="closeModal">Cancelar</button>
          <button type="submit" class="btn-submit" :disabled="loading">
            {{ loading ? (editingCurso ? 'Guardando...' : 'Creando...') : (editingCurso ? 'Guardar Cambios' : 'Crear Curso') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useSessionStore } from '@/stores/session'
import { cursoService } from '@/services/curso.service'

const props = defineProps({
  editingCurso: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'course-created'])
const sessionStore = useSessionStore()
const loading = ref(false)
const activeTab = ref('info')

const formData = ref({
  nombre: '',
  descripcion: '',
  precio: null,
  duracion: null,
  img: '',
  categoria: '',
  complejidad: '',
  lecciones: []
})

const newLeccion = ref({
  titulo: '',
  texto: '',
  imagen: '',
  video: ''
})

// Cuando se pasa un curso a editar, rellenar el formulario
watch(() => props.editingCurso, (newCurso) => {
  if (newCurso) {
    formData.value = {
      nombre: newCurso.nombre,
      descripcion: newCurso.descripcion,
      precio: newCurso.precio,
      duracion: newCurso.duracion,
      img: newCurso.img,
      categoria: newCurso.categoria,
      complejidad: newCurso.complejidad,
      lecciones: newCurso.lecciones || []
    }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const addLeccion = () => {
  // Validar que todos los campos obligatorios estén completos
  if (!newLeccion.value.titulo || !newLeccion.value.texto || !newLeccion.value.imagen) {
    alert('Por favor completa los campos obligatorios de la lección (Título, Texto e Imagen)')
    return
  }

  // Agregar la lección al array
  formData.value.lecciones.push({ ...newLeccion.value })

  // Limpiar el formulario de lección
  newLeccion.value = {
    titulo: '',
    texto: '',
    imagen: '',
    video: ''
  }

  alert('Lección agregada correctamente')
}

const removeLeccion = (index) => {
  formData.value.lecciones.splice(index, 1)
}

const submitForm = async () => {
  // Validar campos obligatorios del curso
  if (!formData.value.nombre || !formData.value.descripcion || !formData.value.precio || 
      !formData.value.duracion || !formData.value.img || !formData.value.categoria || !formData.value.complejidad) {
    alert('Por favor completa todos los campos obligatorios del curso')
    return
  }

  // Validar que sea URL válida para imagen
  try {
    new URL(formData.value.img)
  } catch (e) {
    alert('La imagen debe ser una URL válida (ej: https://...)')
    return
  }

  loading.value = true
  try {
    // Asegurar que precio y duracion sean números
    const dataToSend = {
      ...formData.value,
      precio: Number(formData.value.precio),
      duracion: Number(formData.value.duracion)
    }

    let response
    if (props.editingCurso) {
      // Editar curso existente
      response = await cursoService.updateCurso(props.editingCurso.id, dataToSend, sessionStore.token)
      if (response.ok) {
        alert('Curso actualizado exitosamente')
        emit('course-created', { ...props.editingCurso, ...response.result })
      }
    } else {
      // Crear nuevo curso
      response = await cursoService.createCurso(dataToSend, sessionStore.token)
      if (response.ok) {
        alert('Curso creado exitosamente')
        emit('course-created', response.result)
      }
    }
    
    if (response.ok) {
      closeModal()
      // Limpiar formulario
      formData.value = {
        nombre: '',
        descripcion: '',
        precio: null,
        duracion: null,
        img: '',
        categoria: '',
        complejidad: '',
        lecciones: []
      }
      newLeccion.value = {
        titulo: '',
        texto: '',
        imagen: '',
        video: ''
      }
      activeTab.value = 'info'
    }
  } catch (error) {
    alert('Error: ' + error.message)
    console.error('Curso error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  font-size: 20px;
  color: #1a1a1a;
  margin: 0;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  transition: color 0.3s;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #1a1a1a;
}

.form {
  padding: 24px;
  font-family: 'Poppins', sans-serif;
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: rgba(73, 187, 189, 1);
  box-shadow: 0 0 0 3px rgba(73, 187, 189, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #999;
}

.form-group.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.form-group.checkbox input {
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
}

.form-group.checkbox label {
  margin: 0;
  font-weight: 500;
  cursor: pointer;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.btn-cancel,
.btn-submit {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-cancel {
  background: #f0f0f0;
  color: #1a1a1a;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-submit {
  background: rgba(73, 187, 189, 1);
  color: white;
}

.btn-submit:hover {
  background: rgba(73, 187, 189, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(73, 187, 189, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* TABS */
.modal-tabs {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;
}

.tab-btn {
  flex: 1;
  padding: 16px;
  border: none;
  background: transparent;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab-btn.active {
  color: rgba(73, 187, 189, 1);
  border-bottom-color: rgba(73, 187, 189, 1);
}

.tab-btn:hover {
  background: rgba(73, 187, 189, 0.05);
}

/* TAB CONTENT */
.tab-content {
  animation: fadeIn 0.3s ease;
}

/* LECCIONES */
.lecciones-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lecciones-section h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}

.lecciones-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.leccion-card {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s ease;
}

.leccion-card:hover {
  background: #f0f0f0;
  border-color: rgba(73, 187, 189, 0.5);
}

.leccion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.leccion-header h4 {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.btn-remove {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-remove:hover {
  background: #ff5252;
}

.leccion-texto {
  font-size: 13px;
  color: #666;
  margin: 0;
  line-height: 1.4;
}

.no-lecciones {
  text-align: center;
  padding: 24px;
  color: #999;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px dashed #e0e0e0;
}

.no-lecciones p {
  margin: 0;
  font-size: 14px;
}

.add-leccion-form {
  background: rgba(73, 187, 189, 0.05);
  border: 2px dashed rgba(73, 187, 189, 0.3);
  border-radius: 8px;
  padding: 16px;
}

.add-leccion-form h4 {
  font-size: 14px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 16px 0;
}

.btn-add-leccion {
  width: 100%;
  padding: 12px;
  background: rgba(73, 187, 189, 1);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  margin-top: 12px;
}

.btn-add-leccion:hover {
  background: rgba(73, 187, 189, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(73, 187, 189, 0.3);
}

@media (max-width: 600px) {
  .modal {
    max-width: 100%;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-header {
    padding: 16px;
  }

  .form {
    padding: 16px;
  }

  .modal-tabs {
    overflow-x: auto;
  }

  .tab-btn {
    padding: 12px;
    font-size: 12px;
  }
}
</style>
