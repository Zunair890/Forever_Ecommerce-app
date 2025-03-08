import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"

import {backendUrl} from '../App'
import { toast } from 'react-toastify'
function Add({token}) {

  const [image1,setImage1] =useState(false)
  const [image2,setImage2] =useState(false)
  const [image3,setImage3] =useState(false)
  const [image4,setImage4] =useState(false)

  const [name,setName]= useState("")
  const [description,setDescription]= useState("")
  const [price,setPrice]= useState("")
  const [category,setCategory]= useState("Men")
  const [subcategory,setSubCategory]= useState("Topwear")
  const [bestseller,setBestSeller]= useState(false)
  const [sizes,setSizes]= useState([])

  const submitHandler= async(e)=>{
    e.preventDefault();

    try {
      // Validate that at least one image is selected
      if (!image1 && !image2 && !image3 && !image4) {
        toast.error("Please select at least one image");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      
      // Only append images that exist
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      // Log the form data for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': token
        }
      };

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        config
      );

      if (response.data.success) {
        toast.success("Product added successfully!");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestSeller(false);
        setSizes([]);
      } else {
        toast.error(response.data.message || "Failed to add product");
      }
      
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error adding product");
    }
  }
 
  return (
    <form onSubmit={submitHandler} className='flex flex-col items-start gap-4'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id='image1' hidden />
            <img className='w-20 cursor-pointer' src={!image1 ?assets.upload_area: URL.createObjectURL(image1)} alt="" />
          </label>
          <label htmlFor='image2'>
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id='image2' hidden />
            <img className='w-20 cursor-pointer' src={!image2 ?assets.upload_area: URL.createObjectURL(image2)} alt="" />
          </label>
          <label htmlFor='image3'>
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id='image3' hidden />
            <img  className='w-20 cursor-pointer'src={!image3 ?assets.upload_area: URL.createObjectURL(image3)} alt="" />
          </label>
          <label htmlFor='image4'>
            <img className='w-20 cursor-pointer' src={!image4 ?assets.upload_area: URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=> setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 outline-none ' type='text' placeholder='Type here' />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 outline-none' type='text' placeholder='Type here' />
      </div>

     <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
      <div>
        <p className='mb-2'>Product Category</p>
        <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2 bg-white' >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Sub category</p>
        <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2  bg-white' >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="winterwear">Winterwear</option>
        </select>
      </div>
      <div>
        <p className='mb-2'>Product price</p>
        <input onChange={(e)=>setPrice(e.target.value)} value={price} className='w-full px-3 py-1.5 sm:w-[120px]' type="Number" placeholder='25' />
      </div>
      </div>

      <div>
        <p className='mb-2'>Product sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter (item=> item!= "S"): [...prev,"S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>S</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter (item=> item!= "M"): [...prev,"M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>M</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter (item=> item!= "L"): [...prev,"L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter (item=> item!= "XL"): [...prev,"XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter (item=> item!= "XXL"): [...prev,"XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer rounded-sm`}>XXL</p>
          </div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
       <input onChange={()=> setBestSeller(prev=>!prev)} checked={bestseller} type="checkbox" id='bestseller' />
       <label className='cursor-pointer ' htmlFor="bestseller">Add to Bestseller</label>
      </div>
      <button className='text-white bg-black px-8 rounded py-3 cursor-pointer'>Add</button>
    </form>
  )
}

export default Add