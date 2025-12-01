<template>
    <v-app>
        <Navbar />

        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>

        <Footer />
    </v-app>
</template>

<script setup>
// IMPORTS
import { ref } from 'vue'

// COMPONENTS
import Navbar from '@/layouts/Navbar.vue'
import Footer from '@/layouts/Footer.vue'

// STORES
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-style: normal;
}

.poppins-bold {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-style: normal;
}
</style>