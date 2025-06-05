import mongoose from 'mongoose' 

const conn = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connected!`)
    }
    catch(err){
        console.log("Unable to connect the database!",err.message)
    }
}

export default conn;