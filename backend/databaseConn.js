import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config()

const conn = async () => {
    if (!process.env.MONGO_URI) {
        console.error('CRITICAL ERROR: MONGODB_URI environment variable not set.');
        // Exit the process if the crucial environment variable is missing
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Exit process with failure
        process.exit(1);
    }
};

export default conn;
