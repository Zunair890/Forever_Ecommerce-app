import express from "express"
import authUser from "../middleware/auth.js";
import { placeOrder,userOrders,placeOrderStripe,allOrders,updateStatus, verifyStripe } from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"

const orderRouter= express.Router();

// admin features
orderRouter.post("/list",adminAuth,allOrders );
orderRouter.post("/status",adminAuth,updateStatus);

//paymenmt features

orderRouter.post("/place",authUser,placeOrder); // COD
orderRouter.post("/stripe",authUser,placeOrderStripe)

// verify stripe paymet

orderRouter.post("/verifyStripe",authUser,verifyStripe)

// user features

orderRouter.post("/userorders",authUser,userOrders)

export default orderRouter