<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ editingCurso ? 'Editar Curso' : 'Crear Nuevo Curso' }}</h2>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>

      <form @submit.prevent="submitForm" class="form">
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
import { ref, watch, onMounted } from 'vue'
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

const formData = ref({
  nombre: '',
  descripcion: '',
  precio: null,
  duracion: null,
  img: '',
  categoria: '',
  complejidad: ''
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
      complejidad: newCurso.complejidad
    }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const submitForm = async () => {
  // Validar campos obligatorios
  if (!formData.value.nombre || !formData.value.descripcion || !formData.value.precio || 
      !formData.value.duracion || !formData.value.img || !formData.value.categoria || !formData.value.complejidad) {
    alert('Por favor completa todos los campos')
    return
  }

  // Validar que sea URL válida
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
        complejidad: ''
      }
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
}
</style>
