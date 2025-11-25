import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes/index.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/', routes)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servidor trabajando en ${PORT}`)
})