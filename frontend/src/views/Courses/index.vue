<template>
    <div>
        <p>contenido para cursos</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// STORES
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()

// HOOKS
onMounted(() => {
    uiStore.setTitlePage('Courses');
    uiStore.setTabPage('Courses');
})

</script>

<style lang="scss" scoped>

</style>