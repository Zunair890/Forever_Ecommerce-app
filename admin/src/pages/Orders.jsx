import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from "axios"
import {backendUrl,currency} from "../App"
import {toast} from "react-toastify"
import { assets } from '../assets/assets';


function Orders({token}) {
  const [orders,setOrders]=useState([]);
  const fetchAllOrders= async()=>{
    if(!token){
      return null;
    }
    try {
      let response= await axios.post(backendUrl +"/api/order/list",{},{headers:{token}})
     if(response.data.success){
      setOrders(response.data.orders.reverse())
     }
     else{
      toast.error(response.data.message)
     }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[token])

  
  const statusHandler= async(event,orderId)=>{
    try {
      const response= await axios.post(backendUrl + "/api/order/status",{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error);
      
    }
  }




  return (
    <div className="">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Order History</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
          >
            <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr] gap-6 items-start p-6'>
              {/* Order Icon */}
              <div className="flex items-center justify-center">
                <img className='w-16 opacity-80' src={assets.parcel_icon} alt="Order" />
              </div>

              {/* Order Details */}
              <div className="space-y-2">
                {/* Items */}
                <div className="text-sm text-gray-900 py-1 rounded-md">
                  {order.items.map((item, index) => (
                    <p 
                      key={index} 
                      className='py-1 text-gray-700'
                    >
                      {item.name} 
                      <span className="font-medium"> × {item.quantity}</span>
                      <span className="text-gray-500 ml-1">({item.size}){index !== order.items.length-1 ? ',' : ''}</span>
                    </p>
                  ))}
                </div>

                {/* Customer Details */}
                <div className="space-y-2 ">
                  <p className='text-lg text-gray-800'>
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div className='text-gray-600 text-md'>
                    <p>{order.address.street},</p>
                    <p>{`${order.address.city}, ${order.address.state}`}</p>
                    <p>{`${order.address.country}, ${order.address.zipcode}`}</p>
                    <p className="mt-1 text-gray-700">{order.address.phone}</p>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div className="space-y-3 text-sm">
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-block">
                  Items: {order.items.length}
                </div>
                <p className='mt-3'>
                  <span className="text-gray-600">Method:</span> {order.paymentMethod}
                </p>
                <p>
                  <span className="text-gray-600">Payment:</span>{' '}
                  <span className={order.payment ? "text-green-600" : "text-orange-600"}>
                    {order.payment ? "Done" : "Pending"}
                  </span>
                </p>
                <p>
                  <span className="text-gray-600">Date:</span>{' '}
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount and Status */}
              <div className="space-y-4">
                <p className='text-lg font-md text-gray-800'>
                  {currency}{order.amount}
                </p>
                <select 
                onChange={(event)=>statusHandler(event,order._id)}
                  value={order.status} 
                  className='w-full p-2 border  bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  )
}

export default Orders