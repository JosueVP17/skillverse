<template>
    <v-app>
        <v-app-bar density="comfortable">
            <v-toolbar-title>{{ uiStore.titlePage }}</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>

        <v-footer class="text-center d-flex flex-column ga-2 py-4" color="indigo-lighten-1">
            <div class="d-flex ga-3">
                <v-btn density="comfortable" variant="text"></v-btn>
            </div>

            <v-divider class="my-2" thickness="2" width="50" />

            <div class="text-caption font-weight-regular opacity-60">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum.
                Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur
                dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla
                placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam
                elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus.
            </div>

            <v-divider />

            <div>
                {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
            </div>
        </v-footer>
    </v-app>
</template>

<script setup>
// IMPORTS
import { ref } from 'vue'

// STORES
import { useUIStore } from '@/stores/ui'
const uiStore = useUIStore()
const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
]

</script>