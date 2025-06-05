import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    email:{
        type: String,
        required:true,
        unique :true,
    },
    password:{
        type: String,
        required:true,
        minlength:8
    },
    profileImageUrl:{
        type:String,
        default:null 
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema)
export default User