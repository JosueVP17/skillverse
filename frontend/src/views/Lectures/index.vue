<template>
    <div class="bar" style="padding: 0 !important;">
        <div v-if="!course" class="loading">
            <p>Cargando Leccion...</p>
        </div>

        <div v-else class="container">
            <v-navigation-drawer class="sidebar" permanent>
                <v-list-item id="drawer-title">
                    <v-list-item-title class="course-heads">{{ course.nombre }}</v-list-item-title>
                    <v-list-item-subtitle class="course-heads">{{ course.categoria }}</v-list-item-subtitle>
                    <img :src="course.img" />
                </v-list-item>
                <v-list>
                    <v-list-item v-for="(lect, ind) in lessons" :key="ind" @click="navigateToLesson(ind)" :value="ind" class="drawer-btn"><v-icon icon="mdi-book-open" size="22" style="margin-right: 15px;"></v-icon>Leccion {{ ind + 1 }}</v-list-item>
                </v-list>
                <v-list-item id="return" link @click="returnBack()"><v-icon icon="mdi-home" size="22" style="margin-right: 15px;"></v-icon>Regresar</v-list-item>
            </v-navigation-drawer>

            <div class="content">
                <div class="rectangle">
                    <p class="learn-about-adobe-XD">{{ lessons[lessonIndex].titulo }}</p>
                    <div class="sub-info">
                        <div class="text-wrapper">{{ course.nombre }}</div>
                        <div class="length">
                            <div class="div">Leccion {{ lessonIndex + 1 }}</div>
                        </div>
                    </div>
                </div>

                <div class="lesson-image">
                    <img :src=lessons[lessonIndex].imagen alt="Imagen de Leccion">
                </div>

                <div class="lesson-text">{{ lessons[lessonIndex].texto }}</div>

                <div class="lesson-video">
                    <iframe
                        :src="`https://www.youtube.com/embed/${lessons[lessonIndex].video}`"
                        title="YouTube video player"
                        frameborder="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'

    // STORES
    import { useUIStore } from '@/stores/ui'
    const uiStore = useUIStore()

    // FETCH HELPERS
    import { getCurso } from '@/utils/fetchCourseInfo.js'

    const route = useRoute()
    const router = useRouter()

    const courseId  = route.params.id
    const course    = ref(null)
    const lessons   = ref([])
    let lessonIndex = ref(0)

    // HOOKS
    onMounted(async () => {
        uiStore.setTitlePage('Lecciones');
        uiStore.setTabPage('Lecciones');

        const cursoData = await getCurso(courseId)

        if (cursoData) {
            course.value = cursoData
            lessons.value = cursoData.lecciones || []
        }
    })

    // Metodo para Cambiar de Leccion
    const navigateToLesson = (index) => {
        lessonIndex.value = index
    }
    // Metodo para Regresar a Lista de Cursos o la Pagina Anterior
    const returnBack = () => {

        // TODO: Cambiar la ruta a la correcta
        router.push(`/courses/${courseId}`).then(() => {
            window.location.reload();
        });
    }
</script>

<style lang="css" scoped>

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100vh;
        text-align: center;
        font-size: 18px;
        color: #666;
    }

    .container {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: calc(360px - 256px);
        background: linear-gradient(135deg,white, #97DDDF, #A0D6C1);
        background-attachment: fixed;
        padding-top: 50px;
        padding-bottom: 50px;
    }
    
    .content {
        background-color: white;
        border-radius: 15px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        box-shadow: 0 0px 10px rgba(0,0,0,0.2);
        overflow: auto;
        width: 75%;
        height: 100%;
    }

    .bar {
        padding: 0;
        margin: 0;
        height: 163px;
        width: 100%;
        padding-left: calc(400px - 256px)
    }

    .bar .rectangle {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background-color: #49bbbd;
        height: 140px;
        width: 100%;
        padding: 20px 40px 20px 40px;
    }

    .bar .learn-about-adobe-XD {
        color: #ffffff;
        font-family: "Poppins-Regular", Helvetica;
        font-size: 2.1em;
        font-weight: 600;
        letter-spacing: 0;
        line-height: normal;
    }

    .bar .text-wrapper {
        color: #ffffff;
        font-family: "Poppins-Regular", Helvetica;
        font-size: 1.2em;
        font-weight: 400;
        letter-spacing: 0;
        line-height: normal;
    }

    .sub-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .length {
        display: flex;
        flex-direction: row;
        justify-items: center;
    }
    
    .length .div {
        color: #ffffff;
        font-family: "Poppins-Regular", Helvetica;
        font-size: 1.2em;
        font-style: italic;
        font-weight: 400;
        letter-spacing: 0;
        line-height: normal;
    }
    
    .sidebar{
        min-width: 360px;
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
        background-color: white;
        border: none;
    }

    #drawer-title {
        padding-top: 40px;
        padding-bottom: 40px;
    }

    .course-heads {
        position: relative;
        z-index: 1;
        text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
    }

    #drawer-title img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 0;
        opacity: 0.2;
    }

    .lesson-image {
        height: 360px;
    }

    .lesson-image img {
        width: 100%;
        height: 360px;
        object-fit: cover;
    }

    .drawer-btn {
        font-style: italic;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    #return {
        position: absolute;
        bottom: 0;
        background-color: #309584;
        padding-top: 15px;
        padding-bottom: 15px;
        width: 100%;
        color: white;
    }

    .lesson-text {
        width: 100%;
        text-align: center;
        padding: 40px 50px;
    }

    .lesson-video {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 50px;
    }

    .lesson-video iframe {
        width: 560px;
        height: 315px;
    }
</style>