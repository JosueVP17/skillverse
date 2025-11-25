<template>
    <p>contenido de la pagina de home</p>
</template>

<script setup>
// IMPORTS
import { ref, onMounted } from 'vue'

// STORES
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()

// HOOKS
onMounted(() => {
    uiStore.setTitlePage('Home');
    uiStore.setTabPage('Home');
})

</script>