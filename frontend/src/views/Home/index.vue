<template>
    <div>
        <div class="header">
            <div class="header-bg"></div>
            <div class="header-content">
                <h1 class="poppins-bold"><span class="poppins-bold" style="color: orange !important">Estudiar</span> en linea ahora es mucho mas facil</h1>
                <p>Skillverse es una plataforma interesante que te ense&ntilde;ara de una forma mucho mas interactiva.</p>
                <div class="join-box">
                    <v-btn class="join-btn" rounded="xl" density="comfortable" variant="tonal">Unete Gratis</v-btn>
                    <v-btn class="ma-2" style="margin-right: 15px !important" color="white" icon="mdi-play" variant="flat"></v-btn>
                    <p>Ver como funciona</p>
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
                    Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae
                    sollicitudin at nec nam et pharetra gravida. Adipiscing a quis
                    ultrices eu ornare tristique vel nisl orci.
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
                    Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae
                    sollicitudin at nec nam et pharetra gravida. Adipiscing a quis
                    ultrices eu ornare tristique vel nisl orci. Diam vitae
                    sollicitudin at nec nam et pharetra gravida.
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
                    <v-icon color="white" icon="mdi-calendar-month-outline" size="large"></v-icon>
                </div>
                <p class="online-billing">
                    Programacion Facil y Seguimiento de Asistencias
                </p>
                <p class="text-wrapper">
                    Programa y reserva aulas en un campus o en varios. Manten registros detallados de la asistencia de los estudiantes.
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
        top: 80px;
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
    }
</style>