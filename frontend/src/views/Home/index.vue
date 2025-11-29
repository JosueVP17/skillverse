<template>
    <div>
        <div class="header">
            <div class="header-bg"></div>
            <div class="header-content">
                <h1 class="poppins-bold"><span class="poppins-bold" style="color: orange !important">Estudiar</span> en linea ahora es mucho mas facil</h1>
                <p>Skillverse es una plataforma interesante que te ense&ntilde;ara de una forma mucho mas interactiva.</p>
                <div class="join-box">
                    <v-btn class="join-btn" rounded="xl" density="comfortable" variant="tonal" @click="$router.push('/auth')" >Unete Gratis</v-btn>
                    <v-btn class="ma-2" style="margin-right: 15px !important" color="white" icon="mdi-play" variant="flat" @click="$router.push('/courses') " ></v-btn>
                    <p>Comienza a explorar.</p>
                </div>
            </div>
            <div class="header-img">
                <img class="img-msg" src="@/assets/HeaderMsg.png" />
            </div>
        </div>

        <div class="our-success">
            <div class="frame">
                <div class="text-wrapper">Nuestra Trayectoria</div>

                <p class="div">
                    A lo largo de estos años hemos impulsado el aprendizaje en línea conectando a miles de estudiantes con profesores expertos. Juntos hemos construido una comunidad donde la tecnología, la enseñanza de calidad y la innovación se unen para transformar la educación digital.
                </p>
            </div>

            <div class="frame-2">
                <div class="frame-3">
                    <div class="text-wrapper-2">15K+</div>
                    <div class="text-wrapper-3">Estudiantes</div>
                </div>

                <div class="frame-3">
                    <div class="text-wrapper-2">75%</div>
                    <div class="text-wrapper-3">Taza de Exito</div>
                </div>

                <div class="frame-3">
                    <div class="text-wrapper-2">35</div>
                    <div class="text-wrapper-3">Lenguajes</div>
                </div>

                <div class="frame-3">
                    <div class="text-wrapper-2">26</div>
                    <div class="text-wrapper-3">Expertos Lideres</div>
                </div>

                <div class="frame-3">
                    <div class="text-wrapper-2">16</div>
                    <div class="text-wrapper-3">A&ntilde;os Ense&ntilde;ando</div>
                </div>
            </div>

            <div class="frame">
                <div class="text-wrapper"><span>Software en la Nube</span> Todo-en-Uno</div>

                <p class="div">
                    Skillverse reúne en un solo lugar todas las herramientas que educadores y estudiantes necesitan para enseñar, aprender y gestionar su experiencia académica. Nuestro sistema basado en la nube garantiza acceso seguro, organización sencilla y una plataforma unificada para optimizar cada etapa del proceso educativo.
                </p>
            </div>
        </div>

        <div class="cards">
            <div class="rectangle">
                <div class="file-invoice-wrapper">
                    <v-icon color="white" icon="mdi-file-document-outline" size="large"></v-icon>
                </div>
                <p class="online-billing">
                    Facturacion, Cobranza y Contratos en Linea
                </p>
                <p class="text-wrapper">
                    Control simple y seguro de las transacciones financieras y legales de tu organizacion. Envia facturas y contratos.
                </p>
            </div>
            <div class="rectangle">
                <div class="file-invoice-wrapper" style="background-color: rgb(0, 218, 171) !important">
                    <v-icon color="white" icon="mdi-clock-outline" size="large"></v-icon>
                </div>
                <p class="online-billing">
                    Aprende a tu Propio Ritmo
                </p>
                <p class="text-wrapper">
                    Disfruta de la libertad de estudiar cuándo y dónde quieras. Con Skillverse, tu aprendizaje se adapta a tu tiempo, permitiéndote avanzar con flexibilidad y comodidad sin sacrificar calidad.
                </p>
            </div>
            <div class="rectangle">
                <div class="file-invoice-wrapper" style="background-color: cornflowerblue !important">
                    <v-icon color="white" icon="mdi-account-group" size="large"></v-icon>
                </div>
                <p class="online-billing">
                    Seguimiento de Clientes
                </p>
                <p class="text-wrapper">
                    Automatiza y realiza el seguimiento de correos electrónicos a individuos o grupos. El sistema integrado de Skilline ayuda a organizar tu organización.
                </p>
            </div>
        </div>

        <div class="our-success">
            <div class="frame">
                <div class="text-wrapper">¿Qué es <span>SKILLVERSE</span>?</div>

                <p class="div">
                    Skillverse es una plataforma que permite a los educadores crear clases en línea,
                    donde pueden almacenar los materiales del curso, gestionar tareas y exámenes,
                    monitorear fechas de entrega, calificar resultados y dar retroalimentación todo en un solo lugar.
                </p>
            </div>
        </div>

        <div class="row-img">
            <img src="@/assets/HomeBackdrops.png" style="width: 75%" alt="" />
            <v-btn class="btn-overlay-profesor" rounded="xl" density="comfortable" variant="flat" color="white" @click="$router.push('/auth/teacher-register')">Inicia tus clases</v-btn>

            <v-btn class="btn-overlay-alumno" rounded="xl" density="comfortable" variant="flat" @click="$router.push('/courses')" >Comienza a aprender</v-btn>
        </div>

        

    </div>
</template>

<script setup>
    // IMPORTS
    import { ref, onMounted } from 'vue'

    // STORES
    import { useUIStore } from '@/stores/ui'
    const uiStore = useUIStore()

    // HOOKS
    onMounted(() => {
        uiStore.setTitlePage('Home');
        uiStore.setTabPage('Home');
    })
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

    .header {
        display: flex;
        flex-direction: row;
    }

    .header-bg {
        width: 100%;
        height: 600px;
        position: absolute;
        left: 0;
        top: 71px;
        z-index: 0;
        background-image: url("@/assets/HeaderBack.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position-y: top;
    }

    .header-content {
        display: flex;
        position: relative;
        color: white;
        z-index: 1;
        width: 50%;
        height: 600px;
        flex-direction: column;
        align-items: left;
        justify-content: center;
        padding-bottom: 90px;

    }

    .header-content > h1 {
        font-size: 2.4em;
        margin-bottom: 30px;
        line-height: 1.2em;
    }

    .header-content > p {
        margin-bottom: 36px;
    }

    .join-box {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .join-btn {
        height: 50px !important;
        margin-right: 15px;
    }

    .header-img {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 50%;
        z-index: 1;
        background-image: url("@/assets/HeaderGirl.png");
        background-size: contain;
        background-position-x: right;
    }

    .img-msg {
        width: 80%;
        height: auto;
    }

    .our-success {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 92px;
    }

    .our-success .frame {
        align-items: center;
        display: inline-flex;
        flex-direction: column;
        gap: 16px;
    }

    .our-success .text-wrapper {
        color: var(--dark-text-color);
        font-family: var(--h2-font-family);
        font-size: 1.6em;
        font-style: var(--h2-font-style);
        font-weight: 600;
        letter-spacing: var(--h2-letter-spacing);
        line-height: var(--h2-line-height);
        text-align: center;
        white-space: nowrap;
        width: fit-content;
    }

    .our-success .div {
        color: #010514cc;
        font-family: "Buenos Aires Trial-Regular", Helvetica;
        font-size: 1em;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 28.8px;
        text-align: center;
        width: 650px;
        margin-bottom: 90px;
    }

    .our-success .frame-2 {
        display: inline-flex;
        align-items: flex-start;
        justify-content: center;
        gap: 50px;
        height: 36.80%;
        margin-top: 20px;
        margin-bottom: 94px;
        width: 100%;
    }

    .our-success .frame-3 {
        align-items: center;
        display: inline-flex;
        flex: 0 0 auto;
        flex-direction: column;
    }

    .our-success .text-wrapper-2 {
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent;
        background: linear-gradient(
            90deg,
            rgba(19, 108, 181, 1) 0%,
            rgba(73, 187, 189, 1) 100%
        );
        background-clip: text;
        color: transparent;
        font-family: "Buenos Aires Trial-Light", Helvetica;
        font-size: 52px;
        font-weight: 300;
        letter-spacing: 0;
        line-height: 40px;
        margin-top: -1.00px;
        text-align: center;
        white-space: nowrap;
        width: fit-content;
    }

    .our-success .text-wrapper-3 {
        color: var(--half-dark-text-color);
        font-family: "Buenos Aires Trial-Regular", Helvetica;
        font-size: 20px;
        font-weight: 600;
        letter-spacing: 0;
        line-height: 41.6px;
        white-space: nowrap;
        width: fit-content;
    }

    .our-success .text-wrapper > span {
        color: rgb(0, 218, 171);
        font-family: var(--h2-font-family);
        font-style: var(--h2-font-style);
        font-weight: 600;
        letter-spacing: var(--h2-letter-spacing);
        line-height: var(--h2-line-height);
        text-align: center;
        white-space: nowrap;
        width: fit-content;
    }

    .our-success .element {
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent;
        background: linear-gradient(
            90deg,
            rgba(19, 108, 181, 1) 0%,
            rgba(73, 187, 189, 1) 100%
        );
        background-clip: text;
        color: transparent;
        font-family: "Buenos Aires Trial-Light", Helvetica;
        font-size: 96px;
        font-weight: 300;
        line-height: 96px;
        white-space: nowrap;
        width: fit-content;
    }

    .our-success .span {
        color: #000000;
        letter-spacing: 0;
    }

    .our-success .text-wrapper-4 {
        color: #000000;
        letter-spacing: -19.20px;
    }

    .cards {
        width: 100%;
        display: flex;
        margin-top: 18px;
        flex-direction: row;
        justify-content:space-between;
    }

    .cards .rectangle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0 , 0.10);
        height: 340px;
        width: 30%;
        padding: 15px;
    }

    .cards .online-billing {
        color: #2f327d;
        font-family: "Poppins-Medium", Helvetica;
        font-size: 24px;
        font-weight: 500;
        letter-spacing: 0;
        line-height: normal;
        text-align: center;
        width: 100%;
        padding: 0 12px;
        margin-bottom: 16px;
    }

    .cards .text-wrapper {
        color: #696983;
        font-family: "Poppins-Regular", Helvetica;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0;
        text-align: center;
        width: 100%;
        padding: 0 12px;
    }

    .cards .file-invoice-wrapper {
        background-color: #5b72ee;
        border-radius: 50px;
        box-shadow: 0px 10px 40px #363c880f;
        display: flex;
        justify-content: center;
        justify-items: center;
        height: 60px;
        width: 60px;
        margin: 0 auto 20px;
        padding-top: 16px;
    }

    .row-img {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 103px;
        position: relative;
    }

    .btn-overlay-profesor {
        position: absolute;
        top: 70%;
        left: 30%;
        font-size: 1.1em;
        transform: translate(-50%, -50%);
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
    }

    .btn-overlay-alumno {
        position: absolute;
        top: 70%;
        left: 70%;
        transform: translate(-50%, -50%);
        font-size: 1.1em;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
        background-color: rgb(73, 187, 189) !important;
        color: white;
    }

    /* Diseño Responsivo */
    @media (max-width: 1024px) {
        .header {
            flex-direction: column;
        }

        .header-content {
            width: 100%;
            height: auto;
            padding: 40px 20px;
        }

        .header-content > h1 {
            font-size: 2em;
        }

        .header-img {
            display: none
        }

        .header-bg {
            height: 400px;
            top: 20px;
        }

        .our-success .div {
            width: 100%;
            padding: 0 20px;
        }

        .our-success .frame-2 {
            gap: 30px;
            margin-bottom: 60px;
        }

        .cards {
            gap: 16px;
            padding: 0 16px;
        }

        .cards .rectangle {
            width: 100%;
        }

        .btn-overlay-profesor {
            left: 30%;
            font-size: 1em;
        }

        .btn-overlay-alumno {
            left: 70%;
            font-size: 1em;
        }
    }

    @media (max-width: 768px) {
        .header-content {
            width: 100%;
            padding: 30px 16px;
        }

        .header-content > h1 {
            font-size: 1.6em;
            margin-bottom: 20px;
        }

        .header-content > p {
            margin-bottom: 24px;
            font-size: 0.95em;
        }

        .join-box {
            flex-direction: column;
            gap: 12px;
        }
        .join-box p {
            display: none;
        }


        .join-btn {
            width: 100%;
        }

        .header-bg {
            height: 350px;
            top: 55px;
        }

        .header-img {
            display: none
        }

        .our-success {
            margin-top: 60px;
        }

        .our-success .text-wrapper {
            font-size: 1.3em;
        }

        .our-success .div {
            width: 100%;
            padding: 0 16px;
            font-size: 0.9em;
        }

        .our-success .frame-2 {
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 40px;
        }

        .cards {
            flex-direction: column;
            gap: 12px;
            padding: 0 12px;
        }

        .cards .rectangle {
            width: 100%;
            height: auto;
            padding: 20px 12px;
        }

        .cards .online-billing {
            font-size: 18px;
        }

        .cards .text-wrapper {
            font-size: 14px;
        }

        .row-img {
            margin-top: 20px;
            margin-bottom: 60px;
        }

        .row-img img {
            width: 90% !important;
        }

        .btn-overlay-profesor {
            top: 70%;
            left: 25%;
            font-size: 0.6em;
            padding: 8px 16px !important;
        }

        .btn-overlay-alumno {
            top: 70%;
            left: 75%;
            font-size: 0.6em;
            padding: 8px 16px !important;
        }
    }

    @media (max-width: 480px) {
        .header {
            flex-direction: column;
        }

        .header-content {
            width: 100%;
            padding: 20px 12px;
            height: auto;
        }

        .header-content > h1 {
            font-size: 1.3em;
            margin-bottom: 16px;
            line-height: 1.1em;
        }

        .header-content > p {
            margin-bottom: 16px;
            font-size: 0.85em;
        }

        .join-box {
            flex-direction: column;
            gap: 10px;
        }

        .join-box p {
            display: none;
        }

        .join-btn {
            width: 100%;
            height: 40px !important;
        }

        .header-bg {
            height: 300px;
            top: 55px;
        }

        .header-img {
            width: 100%;
            height: 150px;
        }

        .our-success {
            margin-top: 40px;
        }

        .our-success .text-wrapper {
            font-size: 1.1em;
            white-space: normal;
            width: auto;
        }

        .our-success .div {
            width: 100%;
            padding: 0 12px;
            font-size: 0.85em;
            margin-bottom: 40px;
        }

        .our-success .frame-2 {
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }

        .our-success .frame-3 {
            flex: 1 1 calc(50% - 8px);
            min-width: 140px;
        }

        .our-success .text-wrapper-2 {
            font-size: 36px;
        }

        .our-success .text-wrapper-3 {
            font-size: 14px;
        }

        .cards {
            flex-direction: column;
            gap: 10px;
            padding: 0 8px;
        }

        .cards .rectangle {
            width: 100%;
            height: auto;
            padding: 16px 12px;
        }

        .cards .online-billing {
            font-size: 16px;
        }

        .cards .text-wrapper {
            font-size: 13px;
        }

        .cards .file-invoice-wrapper {
            height: 50px;
            width: 50px;
        }

        .row-img {
            margin-top: 15px;
            margin-bottom: 40px;
        }

        .row-img img {
            width: 95% !important;
        }

        .btn-overlay-profesor {
            top: 70%;
            left: 25%;
            font-size: 0.5em;
            padding: 6px 12px !important;
        }

        .btn-overlay-alumno {
            top: 70%;
            left: 75%;
            font-size: 0.5em;
            padding: 6px 12px !important;
        }
    }

</style>