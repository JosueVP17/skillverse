# Guía de Configuración de Stripe - Modo Test

Esta guía te ayudará a configurar Stripe en modo de prueba para el proyecto Skillverse.

## 📋 Prerrequisitos

- Una cuenta en Stripe (puedes crear una gratis en https://stripe.com)
- Node.js instalado
- Proyecto backend y frontend configurados

## 🔑 Paso 1: Obtener las Claves de API de Stripe

1. Inicia sesión en tu cuenta de Stripe: https://dashboard.stripe.com
2. En el panel lateral, asegúrate de que esté activado el **modo de prueba** (toggle en la esquina superior derecha)
3. Ve a **Desarrolladores** → **Claves de API**
4. Copia la **Clave secreta** (Secret key) que comienza con `sk_test_...`

## 🪝 Paso 2: Configurar el Webhook

Para recibir notificaciones cuando un pago se complete, necesitas configurar un webhook:

### Opción A: Desarrollo Local con Stripe CLI (Recomendado)

1. Instala Stripe CLI:
   ```bash
   # Windows (con Scoop)
   scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
   scoop install stripe
   
   # macOS (con Homebrew)
   brew install stripe/stripe-cli/stripe
   
   # Linux
   # Descarga desde: https://github.com/stripe/stripe-cli/releases/latest
   ```

2. Autentícate con Stripe:
   ```bash
   stripe login
   ```

3. Inicia el servidor backend en una terminal:
   ```bash
   cd backend
   npm run dev
   ```

4. En otra terminal, inicia el forwarding de webhooks:
   ```bash
   stripe listen --forward-to localhost:5000/api/stripe/webhook
   ```

5. Copia el **webhook secret** que aparece (comienza con `whsec_...`)

### Opción B: Webhook en Producción/Testing Público

1. Ve a **Desarrolladores** → **Webhooks** en el dashboard de Stripe
2. Haz clic en **Agregar endpoint**
3. Ingresa la URL: `https://tu-dominio.com/api/stripe/webhook`
4. Selecciona los eventos a escuchar:
   - `checkout.session.completed`
5. Haz clic en **Agregar endpoint**
6. Copia el **Signing secret** (comienza con `whsec_...`)

## ⚙️ Paso 3: Configurar Variables de Entorno

### Backend (.env)

Edita el archivo `backend/.env` y asegúrate de tener:

```env
PORT=5000
JWT_SECRET=tu_jwt_secret

# Firebase (tus credenciales existentes)
FIREBASE_PRIVATE_KEY=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PROJECT_ID=...

# Stripe - Modo Test
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

Edita el archivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## 🚀 Paso 4: Iniciar la Aplicación

### Iniciar Backend

```bash
cd backend
npm install
npm run dev
```

### Iniciar Frontend

```bash
cd frontend
npm install
npm run dev
```

### Iniciar Stripe CLI (solo si usas Opción A)

En una tercera terminal:

```bash
stripe listen --forward-to localhost:5000/api/stripe/webhook
```

## 💳 Paso 5: Probar Pagos

Stripe proporciona tarjetas de prueba. Usa estas credenciales en el checkout:

### Tarjetas de Prueba

**Pago exitoso:**
- Número: `4242 4242 4242 4242`
- Fecha: Cualquier fecha futura (ej: 12/34)
- CVC: Cualquier 3 dígitos (ej: 123)
- ZIP: Cualquier código postal

**Pago rechazado:**
- Número: `4000 0000 0000 0002`

**Requiere autenticación 3D Secure:**
- Número: `4000 0025 0000 3155`

### Flujo de Prueba

1. Inicia sesión como estudiante en el frontend
2. Agrega cursos al carrito
3. Ve al carrito y haz clic en "Proceder al pago"
4. Serás redirigido a la página de checkout de Stripe
5. Usa una tarjeta de prueba
6. Completa el pago
7. Serás redirigido a la página de éxito

## 🔍 Verificar que Funciona

### Verificar Webhook

Si usas Stripe CLI, verás en la terminal los eventos que llegan:

```
2024-11-27 10:30:45   --> checkout.session.completed [evt_xxxxx]
2024-11-27 10:30:45  <--  [200] POST http://localhost:5000/api/stripe/webhook [evt_xxxxx]
```

### Verificar en Dashboard de Stripe

1. Ve a **Pagos** en el dashboard
2. Deberías ver el pago de prueba
3. Ve a **Desarrolladores** → **Eventos**
4. Verifica que el webhook `checkout.session.completed` se envió correctamente

### Verificar en tu Aplicación

1. Los cursos deben moverse del carrito a "Mis Cursos"
2. El carrito debe quedar vacío
3. El usuario debe poder acceder a los cursos comprados

## 🐛 Solución de Problemas

### Error: "No hay token de autenticación"
- Asegúrate de estar logueado en el frontend
- Verifica que el token se guarde en localStorage

### Error: "Webhook signature verification failed"
- Verifica que el `STRIPE_WEBHOOK_SECRET` sea correcto
- Si usas Stripe CLI, asegúrate de que esté corriendo
- Reinicia el servidor backend después de cambiar el secret

### Los cursos no se agregan después del pago
- Verifica que el webhook esté recibiendo eventos (revisa la consola del backend)
- Verifica que `FRONTEND_URL` en el backend sea correcta
- Revisa los logs del servidor para ver si hay errores en el webhook handler

### El checkout no abre
- Verifica que `STRIPE_SECRET_KEY` sea correcta
- Revisa la consola del navegador para errores
- Verifica que el carrito no esté vacío

## 📚 Recursos Adicionales

- [Documentación de Stripe](https://stripe.com/docs)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Testing en Stripe](https://stripe.com/docs/testing)
- [Webhooks en Stripe](https://stripe.com/docs/webhooks)

## 🎯 Modo Producción

Cuando estés listo para producción:

1. Cambia al modo live en el dashboard de Stripe
2. Obtén las claves de producción (empiezan con `sk_live_...`)
3. Configura un webhook con tu URL de producción
4. Actualiza las variables de entorno en tu servidor
5. ¡Realiza pruebas exhaustivas antes de lanzar!

---

## 💡 Notas Importantes

- **NUNCA** compartas tus claves secretas
- **NUNCA** subas el archivo `.env` a Git
- En producción, usa variables de entorno seguras (no archivos .env)
- Mantén Stripe actualizado: `npm update stripe`
- Revisa regularmente el dashboard de Stripe para monitorear pagos

¡Listo! Ahora puedes procesar pagos de prueba con Stripe. 🎉
