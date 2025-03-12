import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../../admin/src/App";
import {toast} from "react-toastify"

function Verify() {
    const {navigate,token,setCartItems}=useContext(ShopContext);
    const [searchParams,setSearchParams]= useSearchParams();
    const success= searchParams.get("success")
    const orderId= searchParams.get("orderId");
    
    const verifyPayment = async(req,res)=>{
        try {
            if(!token){
                return null;
            }
            const response= await axios.post(backendUrl +"/api/order/verifyStripe",{success,orderId},{headers:{token}});
            if(response.data.success){
                setCartItems({})
                navigate("/orders")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

  useEffect(()=>{
    verifyPayment()
  },[token])

  
}

export default Verify