import express from 'express';
import dotenv from 'dotenv';
import conn from './databaseConn.js';

const app = express();
dotenv.config()
conn()
const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log("Server running at http://localhost:8000")
})
