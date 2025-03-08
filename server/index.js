import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';

dotenv.config();
const app= express();
const port= process.env.PORT || 6000;

//mongodb connection
await connectDB()
 connectCloudinary()

// middlewares
app.use(cors());
app.use(express.json());

//api endpoints
app.use("/api/user", userRouter); 
app.use("/api/product",productRouter)

app.get('/', (req, res) => {    
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});