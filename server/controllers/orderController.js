import orderModel from "../models/orderModel.js";
import Stripe from "stripe"
import userModel from "../models/userModel.js"


// Global variables
const currency ="usd"
const deliveryCharge= 10;
const  stripe_key="sk_test_51R1iMJLurlSMVqmxqzkkptDWdECJ9qge58Fo2E1Wsxn45jLMhE1cHBJkwffMZj7kzZq2P0cGF64LHCcS9zZtdCl600wSBQTLat"
// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || stripe_key);

console.log('Using Stripe Key:', process.env.STRIPE_SECRET_KEY ? 'From .env' : 'Hardcoded');

console.log('Stripe Key Available:',stripe_key);
// Placing order using COD method

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
        date: new Date()
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

   try{
    const {userId,items,amount,address}= req.body;
    
    const orderData={
        userId,
        items,
        address,
        items,
        amount,
        date: new Date(),
        payment: false,
        paymentMethod: "stripe",
        status: "Order Placed"
    }

    // Create new order document properly
    const order = new orderModel(orderData);
    await order.save();

    const line_items= items.map((item)=>({
        price_data:{
            currency: currency,
            product_data:{
                name:item.name
            },
            unit_amount: item.price *100
        },
        quantity: item.quantity
    }))

     line_items.push({
        price_data:{
            currency:currency,
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount: deliveryCharge*100
        },
        quantity:1
     })
   
     // creating a session for line_itens

     const session= await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${order._id}`,
        cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${order._id}`,
        line_items,
        metadata: {
            orderId: order._id.toString()
        }
     })
  
    res.json({
        success: true,
        session_url: session.url
    });

   }

   catch(error){
    console.error("Stripe order error:", error);
    res.status(500).json({
        success: false,
        message: error.message
    });
   }





}

// verify Stripe payment

const verifyStripe= async(req,res)=>{
    const {orderId,success,userId}=req.body;
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({
                success:true
            })
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success:false
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success:false,message:error.message
        })
    }
}



// All orders data for admin panel

const allOrders= async(req,res)=>{
    try {
        const orders= await orderModel.find({});
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }

}

//uer order data for frontend

const userOrders= async(req,res)=>{

   try{
    const {userId}= req.body;
    const orders= await orderModel.find({userId});
    res.json({
        success:true,
        orders
    })
   }
   catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
   }





}

// update order status from admin poanel

const updateStatus= async(req,res)=>{

   try {
    const {orderId,status}=req.body;
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({
        success:true,
        message:"Status Updated!"
    })
   } catch (error) {
    console.log(error)
   }



}



export {verifyStripe,placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus }

