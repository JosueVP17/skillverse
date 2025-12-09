import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Servir archivos estáticos con caché
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  etag: false
}))

// SPA fallback - todas las rutas van a index.html para que Vue Router las maneje
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), {
    maxAge: 0,
    etag: false
  })
})

app.listen(PORT, () => {
  console.log(`Frontend corriendo en puerto ${PORT}`)
})
