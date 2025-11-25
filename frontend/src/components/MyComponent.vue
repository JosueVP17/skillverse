<template>
    <div class="my-component">
        <h1 v-if="isVisible">{{ message }}</h1>
        <button @click="toggle">Toggle</button>
        <input v-model="message" type="text" />
    </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref("Hello World!")
const isVisible = ref(true)

const toggle = () => {
    isVisible.value = !isVisible.value
}
</script>