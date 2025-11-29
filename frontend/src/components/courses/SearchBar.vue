<template>
    <div class="search-container">
        <input 
            type="text"
            v-model="local"
            class="search-input"
            placeholder="Buscar cursos..."
            @keyup.enter="search"/>

        <button class="search-button" @click="search">
            <i class="mdi mdi-magnify"></i>
            Search
        </button>
    </div>
</template>

<script setup>
import {ref, defineProps, defineEmits, watch} from 'vue';

const props = defineProps({
    query: String
});

const emit = defineEmits(['search', 'update:query']);

const local = ref(props.query);
watch(() => props.query, (v) => local.value = v);

const search = () => {
    emit('update:query', local.value);
    emit('search', local.value);
}
</script>


<style lang="css" scoped>
    .search-container{
        display: flex;
        align-items: center;
        background: #fff;
        border-color: #e4eeee;
        border-style: solid;
        border-radius: 12px;
        padding: 10px 16px;
        gap: 12px;
        width: 100%;
        max-width: 1300px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
    }

    .search-input{
        flex: 1;
        border: none;
        outline: none;
        font-size: 18px;
        color: #252641;
        padding: 12px 8px;
    }

    .search-button {
        background: #49bbbd;
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        padding: 12px 22px;
        border-radius: 12px;
        cursor: pointer;
        font-weight: 600;
        }

    .search-button:hover {
        opacity: 0.9;
    }
    
</style>