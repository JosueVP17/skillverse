<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <h1>Mi Perfil</h1>
        <p class="subtitle">Administra tu información personal</p>
      </div>

      <!-- Skeleton Loader mientras carga -->
      <div v-if="isInitialLoading" class="profile-content">
        <div class="profile-card">
          <v-skeleton-loader type="avatar,heading,paragraph" />
        </div>
        <div class="edit-form-card">
          <v-skeleton-loader type="heading,list-item,list-item,list-item,divider,actions" />
        </div>
      </div>

      <!-- Contenido del perfil -->
      <div v-else class="profile-content">
        <!-- Avatar y información básica -->
        <div class="profile-card">
          <div class="profile-avatar">
            <div class="avatar-container">
              <v-avatar size="120" color="rgba(73, 187, 189, 0.3)" class="avatar">
                <img v-if="avatarPreview" :src="avatarPreview" alt="Avatar" />
                <img v-else-if="userPhoto" :src="userPhoto" alt="Avatar" />
                <v-icon v-else size="60">mdi-account-circle</v-icon>
              </v-avatar>
              <div class="avatar-upload">
                <input 
                  ref="fileInput"
                  type="file" 
                  accept="image/*" 
                  @change="handleAvatarUpload"
                  style="display: none"
                />
                <button 
                  type="button"
                  class="btn-upload-avatar"
                  @click="$refs.fileInput?.click()"
                >
                  <v-icon size="18">mdi-camera-plus</v-icon>
                </button>
              </div>
            </div>
            <!-- Botones para foto -->
            <div v-if="avatarPreview" class="avatar-actions">
              <button type="button" class="btn-save-photo" @click="handleSavePhoto" :disabled="loading">
                {{ loading ? 'Guardando...' : 'Guardar Foto' }}
              </button>
              <button type="button" class="btn-cancel-photo" @click="cancelPhotoUpload">
                Cancelar
              </button>
            </div>
            <div class="avatar-info">
              <h2>{{ sessionStore.userName }}</h2>
              <p class="user-email">{{ sessionStore.userEmail }}</p>
              <v-chip 
                v-if="sessionStore.isTeacher" 
                color="teal" 
                size="small"
                variant="flat"
              >
                Profesor
              </v-chip>
              <v-chip 
                v-else 
                color="blue" 
                size="small"
                variant="flat"
              >
                Estudiante
              </v-chip>
            </div>
          </div>
        </div>

        <!-- Formulario de edición -->
        <div class="edit-form-card">
          <h2 class="form-title">Información Personal</h2>
          
          <form @submit.prevent="handleSubmit" class="form">
            <!-- Fila 1: Nombre y Apellido Paterno -->
            <div class="form-row">
              <div class="form-group">
                <label>Nombre *</label>
                <input 
                  v-model="formData.nombre" 
                  type="text" 
                  placeholder="Tu nombre"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label>Apellido Paterno *</label>
                <input 
                  v-model="formData.apaterno" 
                  type="text" 
                  placeholder="Apellido paterno"
                  class="form-input"
                />
              </div>
            </div>

            <!-- Fila 2: Apellido Materno y Edad -->
            <div class="form-row">
              <div class="form-group">
                <label>Apellido Materno *</label>
                <input 
                  v-model="formData.amaterno" 
                  type="text" 
                  placeholder="Apellido materno"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label>Edad *</label>
                <input 
                  v-model.number="formData.edad" 
                  type="number" 
                  placeholder="18"
                  min="18"
                  max="100"
                  class="form-input"
                />
              </div>
            </div>

            <!-- Fila 3: Email -->
            <div class="form-row">
              <div class="form-group">
                <label>Email *</label>
                <input 
                  v-model="formData.email" 
                  type="email" 
                  placeholder="tu@email.com"
                  class="form-input"
                />
              </div>
            </div>

            <!-- Botones -->
            <div class="form-actions">
              <button type="button" class="btn-cancel" @click="resetForm">
                Cancelar
              </button>
              <button type="submit" class="btn-save" :disabled="loading">
                {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
            </div>
          </form>
        </div>

        <!-- Sección de Cambio de Contraseña -->
        <div class="edit-form-card password-section">
          <h2 class="form-title">Cambiar Contraseña</h2>
          
          <form @submit.prevent="handlePasswordChange" class="form">
            <div class="form-row">
              <div class="form-group">
                <label>Contraseña Actual *</label>
                <input 
                  v-model="passwordData.current" 
                  type="password" 
                  placeholder="••••••••"
                  class="form-input"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Nueva Contraseña *</label>
                <input 
                  v-model="passwordData.new" 
                  type="password" 
                  placeholder="••••••••"
                  class="form-input"
                />
              </div>
              <div class="form-group">
                <label>Confirmar Contraseña *</label>
                <input 
                  v-model="passwordData.confirm" 
                  type="password" 
                  placeholder="••••••••"
                  class="form-input"
                />
              </div>
            </div>

            <div class="password-hint">
              <v-icon size="16">mdi-information</v-icon>
              <p>La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales</p>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-cancel" @click="resetPasswordForm">
                Cancelar
              </button>
              <button type="submit" class="btn-save" :disabled="loading">
                {{ loading ? 'Actualizando...' : 'Cambiar Contraseña' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de Crop de Imagen -->
    <ImageCropperModal
      v-model="showCropperModal"
      :image-src="tempImageSrc"
      :loading="uploadingPhoto"
      @crop="handleCroppedImage"
      @close="closeCropperModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import { profileService } from '@/services/profile.service'
import ImageCropperModal from '@/components/ImageCropperModal.vue'

const sessionStore = useSessionStore()
const loading = ref(false)
const isInitialLoading = ref(true)
const fileInput = ref(null)
const avatarPreview = ref(null)
const userPhoto = ref(null)
const showCropperModal = ref(false)
const tempImageSrc = ref('')
const croppedImageBlob = ref(null)
const uploadingPhoto = ref(false)

const formData = ref({
  nombre: sessionStore.userName?.split(' ')[0] || '',
  apaterno: sessionStore.userName?.split(' ')[1] || '',
  amaterno: '',
  edad: null,
  email: sessionStore.userEmail || ''
})

const passwordData = ref({
  current: '',
  new: '',
  confirm: ''
})

// Cargar perfil del usuario cuando se monta el componente
onMounted(async () => {
  try {
    // 1. Primero mostrar foto del sessionStore si existe (carga instantánea)
    if (sessionStore.userPhoto) {
      userPhoto.value = sessionStore.userPhoto
    }

    // 2. Cargar datos del servidor en segundo plano
    const userType = sessionStore.isTeacher ? 'profesor' : 'usuario'
    const response = await profileService.getProfile(sessionStore.token, userType)
    
    if (response.ok && response.result) {
      const userData = response.result
      // Actualizar foto si existe
      if (userData.foto) {
        userPhoto.value = userData.foto
        // Actualizar en el sessionStore si es diferente
        if (userData.foto !== sessionStore.userPhoto) {
          sessionStore.setUserPhoto(userData.foto)
        }
      }
      // Actualizar datos del formulario con los datos del servidor
      formData.value = {
        nombre: userData.nombre || formData.value.nombre,
        apaterno: userData.apaterno || formData.value.apaterno,
        amaterno: userData.amaterno || formData.value.amaterno,
        edad: userData.edad || formData.value.edad,
        email: userData.email || formData.value.email
      }
    }
  } catch (error) {
    console.error('Error cargando perfil:', error)
  } finally {
    isInitialLoading.value = false
  }
})

const handleAvatarUpload = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  // Validar que sea imagen
  if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona un archivo de imagen válido')
    return
  }

  // Validar tamaño (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('La imagen no debe exceder 5MB')
    return
  }

  // Leer imagen y abrir modal de crop
  const reader = new FileReader()
  reader.onload = (e) => {
    tempImageSrc.value = e.target?.result
    showCropperModal.value = true
  }
  reader.readAsDataURL(file)
  
  // Limpiar input para permitir seleccionar la misma imagen de nuevo
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleCroppedImage = (blob) => {
  // Guardar el blob para subirlo después
  croppedImageBlob.value = blob
  
  // Crear preview de la imagen recortada
  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target?.result
  }
  reader.readAsDataURL(blob)
  
  // Cerrar modal
  showCropperModal.value = false
}

const closeCropperModal = () => {
  showCropperModal.value = false
  tempImageSrc.value = ''
}

const handleSubmit = async () => {
  if (!formData.value.nombre || !formData.value.apaterno || !formData.value.amaterno || !formData.value.edad || !formData.value.email) {
    sessionStore.snackbar = {
      show: true,
      message: 'Por favor completa todos los campos obligatorios',
      color: 'warning',
    }
    return
  }

  loading.value = true
  try {
    const dataToUpdate = {
      nombre: formData.value.nombre,
      apaterno: formData.value.apaterno,
      amaterno: formData.value.amaterno,
      edad: formData.value.edad,
      email: formData.value.email
    }

    const userType = sessionStore.isTeacher ? 'profesor' : 'usuario'
    
    // Actualizar solo datos personales (foto se maneja por separado en el futuro)
    await profileService.updateProfile(
      sessionStore.userId,
      dataToUpdate,
      sessionStore.token,
      userType
    )

    // Actualizar los datos en el sessionStore para que se refleje en el navbar
    sessionStore.updateUserData(
      dataToUpdate.nombre,
      dataToUpdate.apaterno,
      dataToUpdate.amaterno,
      dataToUpdate.email
    )

    sessionStore.snackbar = {
      show: true,
      message: 'Perfil actualizado exitosamente',
      color: 'success',
    }
    avatarPreview.value = null
  } catch (error) {
    sessionStore.snackbar = {
      show: true,
      message: 'Error: ' + error.message,
      color: 'error',
    }
    console.error('Profile update error:', error)
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  formData.value = {
    nombre: sessionStore.userName?.split(' ')[0] || '',
    apaterno: sessionStore.userName?.split(' ')[1] || '',
    amaterno: '',
    edad: null,
    email: sessionStore.userEmail || ''
  }
}

const handleSavePhoto = async () => {
  if (!croppedImageBlob.value || !avatarPreview.value) {
    alert('Por favor selecciona y recorta una foto primero')
    return
  }

  uploadingPhoto.value = true
  loading.value = true
  try {
    const userType = sessionStore.isTeacher ? 'profesor' : 'usuario'
    
    // Usar el blob recortado en lugar del base64
    await profileService.updateProfilePhoto(
      sessionStore.userId,
      avatarPreview.value,
      sessionStore.token,
      userType
    )

    // Actualizar la foto mostrada
    userPhoto.value = avatarPreview.value
    // Actualizar también en el sessionStore para que se vea en el navbar
    sessionStore.setUserPhoto(avatarPreview.value)
    avatarPreview.value = null
    croppedImageBlob.value = null
    
    alert('Foto actualizada exitosamente')
  } catch (error) {
    alert('Error al guardar la foto: ' + error.message)
    console.error('Photo save error:', error)
  } finally {
    uploadingPhoto.value = false
    loading.value = false
  }
}

const cancelPhotoUpload = () => {
  avatarPreview.value = null
  croppedImageBlob.value = null
}

const handlePasswordChange = async () => {
  if (passwordData.value.new !== passwordData.value.confirm) {
    sessionStore.snackbar = {
      show: true,
      message: 'Las contraseñas no coinciden',
      color: 'warning',
    }
    return
  }

  if (!passwordData.value.current || !passwordData.value.new) {
    sessionStore.snackbar = {
      show: true,
      message: 'Por favor completa todos los campos',
      color: 'warning',
    }
    return
  }

  // Validar contraseña: mayúsculas, minúsculas, números, caracteres especiales, 8-32 caracteres
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
  if (!passwordRegex.test(passwordData.value.new)) {
    sessionStore.snackbar = {
      show: true,
      message: 'La nueva contraseña no cumple con los requisitos de seguridad',
      color: 'warning',
    }
    return
  }

  loading.value = true
  try {
    const userType = sessionStore.isTeacher ? 'profesor' : 'usuario'
    await profileService.changePassword(
      sessionStore.userId,
      passwordData.value.new,
      sessionStore.token,
      userType
    )

    sessionStore.snackbar = {
      show: true,
      message: 'Contraseña actualizada exitosamente',
      color: 'success',
    }
    resetPasswordForm()
  } catch (error) {
    sessionStore.snackbar = {
      show: true,
      message: 'Error: ' + error.message,
      color: 'error',
    }
    console.error('Password change error:', error)
  } finally {
    loading.value = false
  }
}

const resetPasswordForm = () => {
  passwordData.value = {
    current: '',
    new: '',
    confirm: ''
  }
}
</script>

<style scoped>
.profile-page {
  background: #f8f9fa;
  min-height: 100vh;
  padding: 40px 0;
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-header {
  margin-bottom: 40px;
}

.profile-header h1 {
  font-size: 32px;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-weight: 700;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.profile-avatar {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-container {
  position: relative;
  width: fit-content;
}

.avatar {
  border: 3px solid rgba(73, 187, 189, 0.2);
}

.avatar :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.avatar-upload {
  position: absolute;
  bottom: 0;
  right: 0;
}

.btn-upload-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(73, 187, 189, 1);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.btn-upload-avatar:hover {
  background: rgba(73, 187, 189, 0.85);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(73, 187, 189, 0.3);
}

.avatar-actions {
  display: flex;
  gap: 12px;
  margin-top: 12px;
}

.btn-save-photo,
.btn-cancel-photo {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.btn-save-photo {
  background: rgba(73, 187, 189, 1);
  color: white;
  flex: 1;
}

.btn-save-photo:hover:not(:disabled) {
  background: rgba(73, 187, 189, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(73, 187, 189, 0.3);
}

.btn-save-photo:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel-photo {
  background: #f0f0f0;
  color: #1a1a1a;
  flex: 1;
}

.btn-cancel-photo:hover {
  background: #e0e0e0;
}

.avatar-info {
  flex: 1;
}

.avatar-info h2 {
  font-size: 24px;
  color: #1a1a1a;
  margin: 0 0 4px 0;
  font-weight: 700;
}

.user-email {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
}

.edit-form-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.form-title {
  font-size: 20px;
  color: #1a1a1a;
  margin: 0 0 24px 0;
  font-weight: 700;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-row:has(> .form-group:only-child) {
  grid-template-columns: 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
}

.form-input {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: rgba(73, 187, 189, 1);
  box-shadow: 0 0 0 3px rgba(73, 187, 189, 0.1);
}

.form-input::placeholder {
  color: #999;
}

.password-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f0f7f7;
  border-left: 3px solid rgba(73, 187, 189, 1);
  border-radius: 6px;
}

.password-hint p {
  font-size: 13px;
  color: #666;
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid #e0e0e0;
}

.btn-cancel,
.btn-save {
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

.btn-save {
  background: rgba(73, 187, 189, 1);
  color: white;
}

.btn-save:hover:not(:disabled) {
  background: rgba(73, 187, 189, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(73, 187, 189, 0.3);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.password-section {
  margin-top: 24px;
}

@media (max-width: 768px) {
  .profile-avatar {
    flex-direction: column;
    text-align: center;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .profile-card {
    padding: 24px;
  }

  .edit-form-card {
    padding: 24px;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-cancel,
  .btn-save {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .profile-page {
    padding: 30px 0;
  }

  .container {
    padding: 0 16px;
  }

  .profile-header h1 {
    font-size: 28px;
  }

  .profile-card {
    padding: 24px;
  }

  .edit-form-card {
    padding: 24px;
  }

  .avatar-info h2 {
    font-size: 20px;
  }

  .form-title {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 20px 0;
  }

  .profile-header {
    margin-bottom: 30px;
  }

  .profile-header h1 {
    font-size: 24px;
    margin-bottom: 6px;
  }

  .subtitle {
    font-size: 14px;
  }

  .profile-avatar {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .avatar-container {
    margin: 0 auto;
  }

  .avatar {
    width: 100px !important;
    height: 100px !important;
  }

  .avatar-info h2 {
    font-size: 18px;
    margin-top: 8px;
  }

  .user-email {
    font-size: 12px;
    margin: 4px 0 8px 0;
  }

  .profile-card,
  .edit-form-card {
    padding: 20px;
    margin-bottom: 16px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .form-group label {
    font-size: 13px;
  }

  .form-input {
    padding: 10px;
    font-size: 13px;
  }

  .form-title {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .form {
    gap: 16px;
  }

  .form-actions {
    flex-direction: column;
    gap: 8px;
    padding-top: 20px;
  }

  .btn-cancel,
  .btn-save {
    width: 100%;
    padding: 10px 16px;
    font-size: 13px;
  }

  .password-hint {
    padding: 10px;
    font-size: 12px;
  }

  .password-hint p {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .profile-page {
    padding: 15px 0;
  }

  .container {
    padding: 0 12px;
  }

  .profile-header {
    margin-bottom: 20px;
  }

  .profile-header h1 {
    font-size: 20px;
    margin-bottom: 4px;
  }

  .subtitle {
    font-size: 12px;
  }

  .profile-content {
    gap: 16px;
  }

  .profile-card,
  .edit-form-card {
    padding: 16px;
    border-radius: 10px;
  }

  .avatar-container {
    width: 80px;
  }

  .avatar {
    width: 80px !important;
    height: 80px !important;
    font-size: 40px;
  }

  .btn-upload-avatar {
    width: 32px;
    height: 32px;
  }

  .avatar-info h2 {
    font-size: 16px;
    margin-top: 8px;
  }

  .user-email {
    font-size: 11px;
    margin: 2px 0 6px 0;
  }

  .avatar-actions {
    width: 100%;
    gap: 8px;
  }

  .btn-save-photo,
  .btn-cancel-photo {
    padding: 6px 12px;
    font-size: 12px;
  }

  .form-row {
    gap: 12px;
  }

  .form-group label {
    font-size: 12px;
  }

  .form-input {
    padding: 9px;
    font-size: 12px;
    border-radius: 5px;
  }

  .form-title {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .form {
    gap: 14px;
  }

  .form-actions {
    gap: 6px;
    padding-top: 16px;
  }

  .btn-cancel,
  .btn-save {
    padding: 9px 12px;
    font-size: 12px;
    border-radius: 5px;
  }

  .password-hint {
    padding: 8px;
    gap: 6px;
    border-left-width: 2px;
  }

  .password-hint p {
    font-size: 11px;
  }
}
</style>
