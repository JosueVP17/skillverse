<template>
    <div class="wrapper" ref="wrapperRef">
        <div class="filter" @click="toggle">
            <span class="label">{{ label }}</span>
            <span class="icon"> <i class="mdi mdi-chevron-down"></i> </span>
        </div>

        <div class="options" :class="customClass" v-show="open">
            <div class="option" v-for="op in options" :key="op" @click="selectOption(op)">
                {{ op }}
            </div>
        </div>

    </div>
</template>

<script setup>
    import {ref, onMounted, onBeforeUnmount} from 'vue';
    
    const props = defineProps({
        label: String,
        options: Array,
        customClass: String
    });

    const emit = defineEmits(['select']);

    const open = ref(false);
    const wrapperRef = ref(null);

    function toggle(){
        open.value = !open.value;
    }

    function closeDropdown(){
        open.value = false
    }

    function selectOption(op){
        // emitir y cerrar dropdown
        wrapperRef.value && closeDropdown();
        emit('select', op);
    }

    function handleScroll(){
        closeDropdown();
    }

    function handleClickOutside(event){
        if(wrapperRef.value && !wrapperRef.value.contains(event.target)){
            closeDropdown();
        }
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
        document.addEventListener('click', handleClickOutside);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleClickOutside);
    });

</script>

<style lang="scss" scoped>
    .wrapper{
        position: relative;
        width: 200px;
    }

    .filter{
        display:flex;
        align-items: center;
        justify-content: space-between;

        background: #fff;
        border-radius: 10px;
        padding: 12px 16px;

        font-family: 'Inter', sans-serif;
        font-size: 18px;
        cursor: pointer;

        transition: 0.2 ease-in-out;
        border: 1px solid #e5e5e5;
    }

    .filter:hover{
        border-color: #b9b9b9;
    }

    .options{
        margin-top: 6px;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        border: 1px solid #e5e5e5;
        position: absolute;
        width: 100%;
        z-index: 10;
    }
    
    .option{
        padding: 10px 16px;
        cursor: pointer;
    }

    .two-columns {
        display: grid;
        grid-template-columns: 2fr 2fr;
        width: 70vw !important;       
        max-height: 300px;       
        overflow-y: auto; 
        gap: 2px;
    }

    .option:hover{
        background: #f3f3f3;
    }

    .label{
        color: #252641;
    }

    


</style>