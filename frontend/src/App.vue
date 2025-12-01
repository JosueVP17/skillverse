<template>
    <router-view />

    <v-snackbar
        v-model="sessionStore.snackbar.show"
        :color="sessionStore.snackbar.color"
        timeout="3000"
        location="bottom right"
    >
        {{ sessionStore.snackbar.message }}

        <template v-slot:actions>
            <v-btn
                variant="text"
                icon="mdi-close"
                @click="sessionStore.snackbar.show = false"
            />
        </template>
    </v-snackbar>
</template>

<script setup>
import { useSessionStore } from './stores/session';
const sessionStore = useSessionStore();
</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}
</style>
