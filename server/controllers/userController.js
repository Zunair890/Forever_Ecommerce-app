import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";


// creating jwt token
 const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
 }

// Route for user login

const loginUser = async (req, res) => {
};

// Route for user registration

const registerUser = async (req, res) => {  
     
    try{

    
    const {name,email,password}= req.body;

    // check if user exist or not
    const exist= await userModel.findOne({email});
    if(exist){
        return res.json({success:false,message:"User already exist"})
    }

    // validating email format and strong password
    if(!validator.isEmail(email)){
        return res.json(
            {success:false,message:"Invalid email"}
        )
    }
    if(password.length<8){
        return res.json(
            {success:false, message:"Please enter a strong password!"}
        )
    }

    //handling userPasssword

    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);
    const newUser= new userModel({
        name,
        email,
        password:hashedPassword
    });

    const user = await newUser.save();
    
    // craeting token so that user can login after registration
    
    const token = createToken(user._id);
    res.json(
        {success:true,
        token
        }
    )
    }
    catch(error){
        res.json({
            success:false,
            error:error.message
        })
    }

};

//Route for admin login

const loginAdmin = async (req, res) => {    
}

export {loginUser, registerUser, loginAdmin};