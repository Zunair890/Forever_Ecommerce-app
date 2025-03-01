import mongoose from "mongoose";

const userScehma= new mongoose.Schema({
   name:{   
         type:String,
         required:true
    },      
    email:{
        type:String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})  // added the minimize false property to create cartData using emptyu object

const userModel =mongoose.models.user || mongoose.model("user",userScehma);

export default userModel;