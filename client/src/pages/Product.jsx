import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";


function Product() {
  const {productId}= useParams();
  const {products,currency,addToCart}=useContext(ShopContext);
  const [productData,setProductData]=useState(false);
  const [image,setImage]=useState("")
  const [size,setSize]=useState("")

  const fetchProductsData=()=>{
    products.map((item)=>{
      if(item._id===productId){
        setProductData(item);
        // console.log(item)
        setImage(item.image[0]);
        return null
      }
    })
  }
    useEffect(()=>{
   fetchProductsData()
    },[productId,products])

  
  return productData? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
         {/* product images */}
         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
             {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} alt="" className="w-[25%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"/>
              ))
             }
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
         </div>

         {/* Product Info */}
         <div className="flex-1">
            <h1 className="font-medium text-2xl ">{productData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className="pl-2">(122)</p>
            </div>
            <p className="mt-4 text-3xl font-medium ">{currency}{productData.price}</p>
            <p className="mt-4 text-gray-500 md:w-4/5 ">{productData.description}</p>
            <div className="flex flex-col gap-4 my-6">
              <p >Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item,index)=>(
                 <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item ===size?"border-gray-400": ""} `} key={index}>{item}</button>
                ))}
              </div>
            </div>

            
              <button onClick={()=>addToCart(productId, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">Add to cart</button>
              <hr  className="mt-5 sm:w-4/5"/>
              <div className="text-sm text-gray-500 mt-3 flex flex-col gap-1">
               <p>. 100 % original product</p>
               <p>. cash on delivery is avalaible in this product</p>
               
              </div>
         </div>
      </div>

      {/* description and reviews section */}
      <div className=" mt-20 ">
        <div className="flex">
        <b className="border text-sm px-6 py-3">Description</b>
        <p className="border text-sm px-6 py-3">Reviews (122)</p>
        </div>
        <div className=" flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
          <p>
            Ane-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a vietual marketplace where businesses and individuals.com
            showcase ther produch, interact with customers, and conduct
            fransactions without the need for a physical presence. E-commerce
            websites have goned immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with defailed descriptions, images, prices, and any ovalable
            variations (eg, sizes colors). Each product uwaly has its ww
            dedicated page with relevant infurroution
          </p>
        </div>
      </div>
    </div>





  ): <div className="opacity-0"></div>
}

export default Product