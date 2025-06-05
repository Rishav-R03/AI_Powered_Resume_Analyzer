import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import conn from './database.js'
import authRoutes from './routes/authRoutes.route.js'
import { fileURLToPath, pathToFileURL } from 'url'

const app = express();
app.use(express.urlencoded({ extended: false }));
dotenv.config()
// path to url 
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName)


// middlewares
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
// database call 
conn()
// auth router 
app.use("/api/auth", authRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{}))

// serve uploads folder 
// app.use('/uploads', express.static(path.join(__dirname, "uploads"), {}));

//start the server

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running at port http://localhost:8000`)
})

