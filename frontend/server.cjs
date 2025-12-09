import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para logs
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Servir archivos estáticos desde dist
const distPath = path.join(__dirname, 'dist');
console.log(`Sirviendo archivos estáticos desde: ${distPath}`);
app.use(express.static(distPath));

// Fallback SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
});

