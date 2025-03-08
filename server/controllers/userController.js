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
   try{
    const{email,password}=req.body;
    const user= await userModel.findOne({email});

    if(!user){
        return res.json({success:false,message:"User doesn't exist"})
    }
 
    const isMatch= await bcrypt.compare(password,user.password);

    if(isMatch){
        const token= createToken(user._id);
        res.json({
            success:true,
            token
        })
    }

    else{
        res.json({
            success:false,
            message:"Invalid credentials"
        })
    }

   }
   catch(error){
       res.json({
           success:false,
           error:error.message
       })
   }








};

// Route for user registration

const registerUser = async (req, res) => {  
  try {
    const {name, email, password} = req.body;

    // Debug log to check received data
    console.log("Registration attempt:", { name, email, password });

    // Check if email is provided
    if (!email) {
      return res.json({
        success: false,
        message: "Email is required"
      });
    }

    // Check if user exists
    const exist = await userModel.findOne({email});
    if(exist){
      return res.json({
        success: false,
        message: "User already exists"
      });
    }

    // Email validation with proper error handling
    const isValidEmail = validator.isEmail(email);
    console.log("Email validation result:", { email, isValid: isValidEmail });

    if(!isValidEmail){
      return res.json({
        success: false,
        message: "Please enter a valid email address"
      });
    }

    // Password validation
    if(password.length < 8){
      return res.json({
        success: false, 
        message: "Password must be at least 8 characters long"
      });
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new userModel({
      name,
      email: email.toLowerCase(), // Convert email to lowercase
      password: hashedPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    
    // Success response
    return res.status(201).json({
      success: true,
      token,
      message: "Registration successful"
    });

  } catch(error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};

//Route for admin login

const loginAdmin = async (req, res) => {   
    
    try{
        const {email,password} =req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token= jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({
                success:true,
                token
            })
        }
        else{
            res.json({
                success:false,
                message:"Invalid credentails!"
            })
        }
        
    }
    catch(error){
        console.error(error.message);
        res.json({
            success:false,
            message:error.message
        })
    }



}

export {loginUser, registerUser, loginAdmin};