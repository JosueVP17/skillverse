<template>
  <v-dialog v-model="dialogVisible" max-width="600px" persistent>
    <v-card>
      <v-card-title class="modal-title">
        <span>Ajustar Imagen de Perfil</span>
        <v-btn icon @click="close" variant="text" density="compact">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="cropper-container">
        <Cropper
          ref="cropperRef"
          class="cropper"
          :src="imageSrc"
          :stencil-props="{
            aspectRatio: 1,
          }"
          :stencil-component="$options.components.CircleStencil"
          @change="onChange"
        />
      </v-card-text>

      <v-card-actions class="modal-actions">
        <v-btn color="grey" variant="text" @click="close">
          Cancelar
        </v-btn>
        <v-spacer />
        <v-btn color="primary" variant="flat" @click="cropImage" :loading="loading">
          Recortar y Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  imageSrc: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'crop', 'close'])

const dialogVisible = ref(props.modelValue)
const cropperRef = ref(null)
const coordinates = ref(null)

watch(() => props.modelValue, (newVal) => {
  dialogVisible.value = newVal
})

watch(dialogVisible, (newVal) => {
  if (!newVal) {
    emit('update:modelValue', false)
    emit('close')
  }
})

const onChange = ({ coordinates: newCoordinates }) => {
  coordinates.value = newCoordinates
}

const cropImage = () => {
  if (cropperRef.value) {
    const { canvas } = cropperRef.value.getResult()
    if (canvas) {
      // Redimensionar canvas a un tamaño máximo para reducir el peso
      const maxSize = 400
      let targetWidth = canvas.width
      let targetHeight = canvas.height
      
      if (targetWidth > maxSize || targetHeight > maxSize) {
        if (targetWidth > targetHeight) {
          targetHeight = (maxSize * targetHeight) / targetWidth
          targetWidth = maxSize
        } else {
          targetWidth = (maxSize * targetWidth) / targetHeight
          targetHeight = maxSize
        }
      }
      
      // Crear un canvas redimensionado
      const resizedCanvas = document.createElement('canvas')
      resizedCanvas.width = targetWidth
      resizedCanvas.height = targetHeight
      const ctx = resizedCanvas.getContext('2d')
      ctx.drawImage(canvas, 0, 0, targetWidth, targetHeight)
      
      // Convertir a blob con calidad reducida para disminuir tamaño
      resizedCanvas.toBlob((blob) => {
        emit('crop', blob)
      }, 'image/jpeg', 0.85)
    }
  }
}

const close = () => {
  dialogVisible.value = false
}
</script>

<script>
export default {
  components: {
    CircleStencil
  }
}
</script>

<style scoped>
.modal-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 24px;
}

.cropper-container {
  padding: 24px;
  min-height: 400px;
}

.cropper {
  height: 400px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.modal-actions {
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
}

:deep(.vue-advanced-cropper__background),
:deep(.vue-advanced-cropper__foreground) {
  background: #f5f5f5;
}

:deep(.vue-circle-stencil) {
  border: 3px solid #49bbbd;
}

:deep(.vue-handler) {
  background: #49bbbd;
  border: 2px solid white;
}
</style>
