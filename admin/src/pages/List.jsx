import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import axios from 'axios';

function List({token}) {
  let currency= "$"
  const [list,setList]=useState([]);
  const fetchList= async()=>{
    try{
     const response = await axios.get(backendUrl + "/api/product/list",{headers:{token}})
     console.log(response)
     if(response.data.success){
      setList(response.data.products);
       
     }
     else{
      toast.error(response.data.message)
     }
    }
    catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }

   useEffect(()=>{
    fetchList()
   },[])
   const defaultImage = "https://via.placeholder.com/150"; // You can replace this with your default image

   const removeProuct=async(id)=>{
     try{
      const response= await axios.post(backendUrl +"/api/product/remove",{id},{headers:{token}});
      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }
      else{
        toast.error(response.data.message)
      }
     }
     catch(error){
      console.log(error);
      toast.error(error.message)
     }
   }




  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='flex flex-col gap-2'>
      {/* { List Table Title} */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
        
      </div>
      {/* Product List */}
      {
        list.map((item,index)=>(
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 gap-3 px-2 text-sm' key={index}>
            <img className='w-12' src={item.image[0]|| defaultImage}/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeProuct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default List