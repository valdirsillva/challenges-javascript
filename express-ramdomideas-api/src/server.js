import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import express from 'express'
import { router } from './routes/ideas.js'
import { connectionDatabase } from './config/db.js'
dotenv.config()
connectionDatabase()

const PORT = process.env.PORT || 5000
const app = express()

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory


// Static folder
app.use(express.static(path.join(__dirname, '../public')))

// Body parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// cors Middleware
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true
}))

app.get('/', (req, res) => {
    res.send({ message: 'Welcome to ythe RamdomIdeas API' })
})

app.use('/api/ideas', router)

app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`)
})