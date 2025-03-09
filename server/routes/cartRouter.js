import express from "express"

import {addToCart,getUserCart, updateCart} from "../controllers/cartController.js"
import authRouter from "../middleware/auth.js";

const cartRouter= express.Router();

cartRouter.post("/get",authRouter,getUserCart)
cartRouter.post("/add",authRouter,addToCart)
cartRouter.post("/update",authRouter,updateCart)

export default cartRouter;