<template>
    <v-footer class="footer text-center d-flex flex-column ga-0 py-3">
        <div class="footer-logo">
            <img src="@/assets/PageLogoLight.png" />
            <v-divider color="grey-lighten-2" class="my-2" thickness="2" width="50" vertical />
            <p class="poppins-bold">Sesiones Virtuales por Zoom</p>
        </div>

        <div class="footer-contact">
            <p>Suscribete para recibir nuestras ofertas</p>
            <div class="footer-input">
                <v-text-field 
                    v-model="email"
                    class="input-text" 
                    color="grey-darken-2" 
                    rounded="xl" 
                    variant="outlined"
                    placeholder="E-mail" 
                    :focused="true"
                    type="email"
                ></v-text-field>
                <v-btn 
                    class="footer-btn" 
                    color="teal-lighten-2" 
                    rounded="xl" 
                    density="comfortable"
                    variant="flat"
                    @click="handleSubscribe"
                >Suscribirse</v-btn>
            </div>
        </div>

        <div class="footer-glossary">
            <p>Carreras</p>
            <v-divider color="grey-lighten-2" class="my-2" thickness="2" width="50" vertical />
            <p>Politica de Privacidad</p>
            <v-divider color="grey-lighten-2" class="my-2" thickness="2" width="50" vertical />
            <p>Terminos y Condiciones</p>
        </div>
        <p class="last">&copy; {{ new Date().getFullYear() }} Class Technologies Inc.</p>
    </v-footer>
</template>

<script setup>
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'

const sessionStore = useSessionStore()
const email = ref('')

const handleSubscribe = () => {
    if (!email.value) {
        sessionStore.snackbar = {
          show: true,
          message: 'Por favor ingresa un correo electrónico',
          color: 'warning',
        }
        return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        sessionStore.snackbar = {
          show: true,
          message: 'Por favor ingresa un correo electrónico válido',
          color: 'warning',
        }
        return
    }
    
    sessionStore.snackbar = {
      show: true,
      message: `¡Gracias por suscribirte! Te enviaremos nuestras ofertas a ${email.value}`,
      color: 'success',
    }
    email.value = ''
}
</script>

<style lang="scss" scoped>
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

.footer {
    background-color: rgb(37, 38, 65);
    color: white;
}

.footer-logo {
    display: flex;
    align-items: center;
    height: 84px;
    margin-top: 45px;
    margin-bottom: 45px;
}

.footer-logo>img {
    height: 60%;
    margin-right: 30px;
}

.footer-logo>p {
    width: 150px;
    margin-left: 30px;
    text-align: left;
}

.footer-contact>p {
    color: rgb(184, 184, 202);
    font-size: 1.2em;
    margin-bottom: 20px;
}

.footer-input {
    display: flex;
    flex-direction: horizontal;
}

.input-text {
    color: white !important;
}

.footer-btn {
    height: 56px;
    margin-left: 20px;
    font-size: 0.9em;
}

.footer-glossary {
    display: flex;
    height: 40px;
    margin-top: 35px;
    flex-direction: horizontal;
    align-items: center;
    color: rgb(184, 184, 202);
}

.footer-glossary>p {
    margin: 0 15px;
    font-size: 0.9em;
}

.last {
    color: rgb(184, 184, 202);
    margin: 0 15px;
    font-size: 0.9em;
    margin-bottom: 40px;
}

@media (max-width: 1024px) {
    .footer-logo {
        flex-direction: column;
        gap: 12px;
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .footer-logo > img {
        margin-right: 0;
    }

    .footer-logo > p {
        margin-left: 0;
        width: auto;
    }

    .footer-input {
        flex-direction: column;
        gap: 12px;
    }

    .footer-btn {
        margin-left: 0;
    }

    .footer-glossary {
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }
}

@media (max-width: 768px) {
    .footer-logo {
        height: auto;
        margin-top: 25px;
        margin-bottom: 25px;
    }

    .footer-logo > img {
        height: 50px;
    }

    .footer-contact > p {
        font-size: 1em;
        margin-bottom: 15px;
    }

    .footer-input {
        gap: 10px;
    }

    .footer-btn {
        height: 48px;
        font-size: 0.85em;
    }

    .footer-glossary {
        margin-top: 25px;
        gap: 8px;
    }

    .footer-glossary > p {
        margin: 0 8px;
        font-size: 0.85em;
    }

    .last {
        margin: 0 10px;
        font-size: 0.8em;
        margin-bottom: 30px;
    }
}

@media (max-width: 480px) {
    .footer {
        padding: 12px !important;
    }

    .footer-logo {
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;
        margin-bottom: 15px;
        height: auto;
    }

    .footer-logo > img {
        height: 40px;
    }

    .footer-logo > p {
        font-size: 0.85em;
        width: auto;
        margin: 0;
    }

    .footer-contact > p {
        font-size: 0.9em;
        margin-bottom: 12px;
    }

    .footer-input {
        flex-direction: column;
        gap: 8px;
    }

    :deep(.input-text) {
        font-size: 12px !important;
    }

    .footer-btn {
        height: 40px;
        font-size: 0.8em;
        width: 100%;
    }

    .footer-glossary {
        flex-direction: column;
        align-items: center;
        margin-top: 15px;
        gap: 6px;
    }

    .footer-glossary > p {
        margin: 0;
        font-size: 0.75em;
    }

    .v-divider {
        display: none;
    }

    .last {
        margin: 0;
        font-size: 0.7em;
        margin-bottom: 15px;
    }
}
</style>