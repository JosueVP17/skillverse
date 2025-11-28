<template>
    <div class="courseSearchFilter">
        <SearchBar  v-model:query="searchText"
                    @update:query="$emit('search', $event)" />
        <FilterSelect label="Categoría" 
                    customClass="two-columns"
                    :options="['Tecnología y Programación',
                    'Ciencia de Datos e Inteligencia Artificial',
                    'Diseño y Creatividad (Diseño gráfico, UX/UI, 3D…)', 
                    'Negocios y Emprendimiento', 
                    'Marketing y Ventas', 
                    'Idiomas',
                    'Habilidades Profesionales / Soft Skills', 
                    'Desarrollo Personal', 
                    'Ciencias y Matemáticas', 
                    'Salud y Bienestar', 
                    'Arte y Música', 
                    'Educación y Pedagogía']" 
                    @select="$emit('categoria', $event)" />
        <FilterSelect label="Precio" :options="['Gratis','$0 - $300','$301 - $700','$701 - $1200', '$1201 - $2000']" @select="$emit('precio', $event)" />
        <FilterSelect label="Complejidad" 
            :options="['Principiante', 'Intermedio', 'Avanzado']"
            @select="$emit('complejidad', $event)"
        />
        <button class="resetSearch" @click="resetSearch" >Todos Los Cursos</button>
    </div>
</template>


<script setup>
    import SearchBar from './SearchBar.vue';
    import FilterSelect from './FilterSelect.vue';
    import { ref } from 'vue';

    const emit = defineEmits(['resetSearch']);
    const searchText = ref('');


    const resetSearch = () =>{
        searchText.value = '';
        emit('resetSearch');
    }

</script>

<style lang="scss" scoped>  
    .courseSearchFilter{
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 16px;
    }

    .resetSearch{
        background: #f5f5f5;
        color: #696983;
        border: none;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        padding: 12px 22px;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 500;
    }

    @media (max-width: 1024px) {
        .courseSearchFilter {
            gap: 10px;
        }

        .resetSearch {
            font-size: 14px;
            padding: 10px 16px;
        }
    }

    @media (max-width: 768px) {
        .courseSearchFilter {
            gap: 8px;
        }

        .resetSearch {
            font-size: 13px;
            padding: 8px 14px;
        }
    }

    @media (max-width: 480px) {
        .courseSearchFilter {
            gap: 6px;
            flex-direction: column;
        }

        .resetSearch {
            font-size: 12px;
            padding: 8px 12px;
            width: 100%;
            justify-content: center;
        }
    }
</style>