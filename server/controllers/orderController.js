

// Placing order using COD method

import orderModel from "../models/orderModel.js";

const placeOrder= async(req,res)=>{

try {
    const {userId,items,amount,address}= req.body;
    const orderData={
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        data:Date.now()
    }

    const newOrder= new orderModel(orderData);
    await newOrder.save(); 
    res.json({success:true, message:"Order Placed!"})
} catch (error) {
    console.log(error);
    res.json({success:false,
        message:error.message
    })
}
}

// Placeing orders uisng stripe method
const placeOrderStripe=async(req,res)=>{

}

// All orders data for admin panel

const allOrders= async(req,res)=>{

}

//uer order data for frontend

const userOrders= async(req,res)=>{

}

// update order status from admin poanel

const updateStatus= async(req,res)=>{

}



export {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus }

