import express from "express";
import { loginAdmin,loginUser,registerUser } from "../controllers/userController.js";


const userRouter= express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/admin", loginAdmin);


export default userRouter;


