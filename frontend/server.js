import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 10000

console.log('🚀 Iniciando servidor...')
console.log('📁 Directorio actual:', __dirname)
console.log('🔢 Puerto:', PORT)

const distPath = path.join(__dirname, 'dist')
console.log('📂 Buscando dist en:', distPath)

// Servir archivos estáticos
app.use(express.static(distPath))

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor escuchando en 0.0.0.0:${PORT}`)
})
