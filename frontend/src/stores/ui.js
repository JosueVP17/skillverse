import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', () => {
    const sidebarOpen = ref(false);
    const titlePage = ref('');
    const tabPage = ref('');

    function toggleSidebar() {
        sidebarOpen.value = !sidebarOpen.value;
    }

    const setTitlePage = (newTitle) => {
        titlePage.value = newTitle;
    }

    const setTabPage = (newTab) => {
        const fullTitle = `Skillverse | ${newTab}`;
        document.title = fullTitle;
        tabPage.value = newTab;
    }

    return { 
        sidebarOpen, 
        toggleSidebar, 
        titlePage, 
        setTitlePage,
        tabPage,
        setTabPage
    };
});