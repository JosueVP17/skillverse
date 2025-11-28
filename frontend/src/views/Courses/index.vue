<template>
    <div class="courseSearch">
        <CourseSearchBar 
            @search="filtroBusqueda = $event"
            @categoria="filtroCategoria =$event" 
            @precio="filtroPrecio =$event"
            @complejidad="filtroComplejidad =$event"
            @resetSearch="resetSearch" />
    </div>

    <div class="course-list">
        <div v-if="isLoading" class="loading-message">
            <p>Cargando cursos...</p>
        </div>
        <template v-else>
            <CourseCard
                v-for="curso in cursosPaginados"
                :key="curso.id"
                :id="curso.id"
                :title="curso.nombre"
                :category="curso.categoria"
                :complexity="curso.complejidad"
                :duration="curso.duracion"
                :imageCourse="curso.img"
                :description="curso.descripcion"
                :imageProfesor="curso.profesor.img"
                :professor-name="curso.profesor.nombre"
                :price = "curso.precio"
                @course-click="handleCourseClick"
                />
        </template>
    </div>

    <Pagination
        :page="currentPage"
        :per-page="perPage"
        :total="cursosFiltrados.length"
        :is-loading="isLoading"
        @update:page="currentPage = $event"
    />

</template>

<script setup>

import CourseSearchBar from '@/components/courses/FilterSearchBar.vue'
import Pagination from '@/components/courses/Pagination.vue';
import CourseCard from '@/components/courses/CourseCard.vue';
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

// STORES
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
const router = useRouter()

const cursos = ref([])
const isLoading = ref(true)

// HOOKS
onMounted(() => {
    uiStore.setTitlePage('Courses');
    uiStore.setTabPage('Courses');
})

//HOOK para cargar cursos del backend
onMounted(async () =>{
try{
    isLoading.value = true
    const res = await fetch('http://localhost:5050/api/cursos');
    const data = await res.json();
    cursos.value = data.result;

}catch(e){
    console.error(e);
}finally{
    isLoading.value = false
}
})

//FILTROS
const filtroCategoria = ref(null);
const filtroPrecio = ref(null);
const filtroComplejidad = ref(null);
const filtroBusqueda = ref('');

// Resetear página cuando cambian los filtros
watch([filtroCategoria, filtroPrecio, filtroComplejidad, filtroBusqueda], () => {
    currentPage.value = 1;
});

const cursosFiltrados = computed(() => {
    return cursos.value.filter(curso => {
        //Filtro de búsqueda
        if(filtroBusqueda.value){
            const text = filtroBusqueda.value.toLowerCase();
            if(!curso.nombre.toLowerCase().includes(text) && !curso.descripcion.toLowerCase().includes(text)){
                return false;
            }
        }

        //Filtro de categoría
        if(filtroCategoria.value && curso.categoria !== filtroCategoria.value){
            return false;
        }

        //Filtro de Complejidad edl cursos
        if(filtroComplejidad.value && curso.complejidad !== filtroComplejidad.value){
            return false;
        }

        //Filtro de precio
        if(filtroPrecio.value){
            let min = 0;
            let max = Infinity;
            switch(filtroPrecio.value){
                case 'Gratis': 
                    max = 0; 
                    break;
                case '$0 - $300': 
                    max = 300; 
                    break;
                case '$301 - $700': 
                    min = 301; 
                    max = 700; 
                    break;
                case '$701 - $1200': 
                    min = 701; 
                    max = 1200; 
                    break;
                case '$1201 - $2000': 
                    min = 1201; 
                    max = 2000; 
                    break;
            }
            if(curso.precio < min || curso.precio > max){
                return false;
            }
        }


        return true;
    })
})

const resetSearch = () => {
    filtroCategoria.value = null;
    filtroPrecio.value = null;
    filtroComplejidad.value = null;
    filtroBusqueda.value = '';
    currentPage.value = 1;
};

//Paginación
const currentPage = ref(1);
const perPage = 6;

const cursosPaginados = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return cursosFiltrados.value.slice(start, end);
});

const handleCourseClick = (courseId) => {
    router.push(`/courses/${courseId}`);
};

</script>

<style lang="scss" scoped>
    .courseSearch{
        margin-top: 2vh;
        margin-bottom: 24px;
    }

    .course-list {
        display: flex;
        gap: 2vw;
        flex-wrap: wrap;
        justify-content: center;
        min-height: 500px;
    }

</style>