import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

const distPath = path.join(__dirname, 'dist')
const indexPath = path.join(distPath, 'index.html')

// Verificar que el directorio dist existe
if (!existsSync(distPath)) {
  console.error('❌ Error: El directorio dist no existe')
  process.exit(1)
}

if (!existsSync(indexPath)) {
  console.error('❌ Error: El archivo index.html no existe en dist')
  process.exit(1)
}

console.log('✅ Directorio dist encontrado:', distPath)
console.log('✅ Archivo index.html encontrado:', indexPath)

// Servir archivos estáticos con caché
app.use(express.static(distPath, {
  maxAge: '1d',
  etag: false
}))

// Log de todas las solicitudes
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`)
  next()
})

// SPA fallback - todas las rutas van a index.html para que Vue Router las maneje
app.get('*', (req, res) => {
  console.log(`📄 Sirviendo index.html para: ${req.url}`)
  res.sendFile(indexPath, {
    maxAge: 0,
    etag: false
  }, (err) => {
    if (err) {
      console.error('❌ Error sirviendo index.html:', err)
      res.status(500).send('Error del servidor')
    }
  })
})

app.listen(PORT, () => {
  console.log(`✅ Frontend corriendo en puerto ${PORT}`)
  console.log(`🌐 Sirviendo desde: ${distPath}`)
})
