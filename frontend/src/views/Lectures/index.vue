<template>
    <v-layout class="lecture-layout">
        <v-navigation-drawer v-if="course && lessons && lessons.length > 0" permanent width="360">
            <v-list-item id="drawer-title">
                <v-list-item-title class="course-heads">{{ course.nombre }}</v-list-item-title>
                <v-list-item-subtitle class="course-heads">{{ course.categoria }}</v-list-item-subtitle>
                <img :src="course.img" />
            </v-list-item>
            <v-list>
                <v-list-item v-for="(lect, ind) in lessons" :key="ind" @click="navigateToLesson(ind)" :value="ind" class="drawer-btn">
                    <v-icon icon="mdi-book-open" size="22" style="margin-right: 15px;"></v-icon>
                    Leccion {{ ind + 1 }}
                </v-list-item>
            </v-list>
            <v-list-item id="return" link @click="returnBack()">
                <v-icon icon="mdi-home" size="22" style="margin-right: 15px;"></v-icon>
                Regresar
            </v-list-item>
        </v-navigation-drawer>

        <v-main>
            <div v-if="!course" class="loading">
                <div style="text-align: center;">
                    <p>{{ loadingMessage }}</p>
                    <p style="color: red; margin-top: 10px;">{{ errorMessage }}</p>
                    <button v-if="errorMessage" @click="goBack" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">
                        Volver
                    </button>
                </div>
            </div>

            <div v-else-if="!lessons || lessons.length === 0" class="loading" style="color: red;">
                <div style="text-align: center;">
                    <p>⚠️ No hay lecciones disponibles para este curso</p>
                    <button @click="goBack" style="margin-top: 20px; padding: 10px 20px; cursor: pointer;">
                        Volver al curso
                    </button>
                </div>
            </div>

            <div v-else class="content-wrapper">
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
                        :src="videoUrl"
                        title="YouTube video player"
                        frameborder="1"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        </v-main>
    </v-layout>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'
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
    const loadingMessage = ref('Cargando lección...')
    const errorMessage = ref('')
    let lessonIndex = ref(0)

    // Función para extraer ID de YouTube de cualquier formato
    const extractYouTubeId = (url) => {
        if (!url) return ''
        
        // Si ya es solo el ID (11 caracteres alphanumericos)
        if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
            return url
        }

        // Intentar extraer de URL completa
        try {
            const patterns = [
                /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
                /^([a-zA-Z0-9_-]{11})$/
            ]

            for (let pattern of patterns) {
                const match = url.match(pattern)
                if (match && match[1]) {
                    return match[1]
                }
            }
        } catch (e) {
            console.error('Error extrayendo ID de YouTube:', e)
        }

        return url // Devolver la URL original si no se puede extraer
    }

    // Video URL computada que extrae el ID correctamente
    const videoUrl = computed(() => {
        if (!lessons.value[lessonIndex.value]?.video) return ''
        const videoId = extractYouTubeId(lessons.value[lessonIndex.value].video)
        return `https://www.youtube.com/embed/${videoId}`
    })

    // HOOKS
    onMounted(async () => {
        uiStore.setTitlePage('Lecciones');
        uiStore.setTabPage('Lecciones');

        try {
            console.log('Cargando curso con ID:', courseId)
            loadingMessage.value = 'Cargando lección...'
            
            const cursoData = await getCurso(courseId)

            if (cursoData) {
                console.log('Curso obtenido:', cursoData)
                course.value = cursoData
                lessons.value = cursoData.lecciones || []
                
                if (!lessons.value || lessons.value.length === 0) {
                    console.warn('No hay lecciones disponibles para este curso')
                    errorMessage.value = 'Este curso no tiene lecciones disponibles'
                }
            } else {
                console.error('No se pudo obtener la información del curso')
                errorMessage.value = 'No se encontró el curso o no tiene lecciones'
            }
        } catch (error) {
            console.error('Error cargando lecciones:', error)
            errorMessage.value = 'Error al cargar las lecciones: ' + error.message
        }
    })

    const goBack = () => {
        router.back()
    }

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
        display: none;
    }
    
    .content {
        display: none;
    }

    .bar {
        display: none;
    }

    .bar .rectangle {
        display: none;
    }

    .rectangle {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        background-color: #49bbbd;
        padding: 40px;
        min-height: 140px;
    }

    .content-wrapper {
        background-color: white;
        min-height: 100vh;
        width: 100%;
    }

    .lecture-layout {
        min-height: 100vh;
    }

    .learn-about-adobe-XD {
        color: #ffffff;
        font-family: "Poppins-Regular", Helvetica;
        font-size: 2.1em;
        font-weight: 600;
        letter-spacing: 0;
        line-height: normal;
        margin: 0;
    }

    .text-wrapper {
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
        display: none;
    }

    .v-navigation-drawer {
        box-shadow: 2px 0 15px rgba(0,0,0,0.1);
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