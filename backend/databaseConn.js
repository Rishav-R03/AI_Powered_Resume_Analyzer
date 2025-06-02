import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config()

const conn = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Database connected!"))
        .catch((err) => { console.log("Error connecting database", err.message), process.exit(1) })

}

export default conn;
