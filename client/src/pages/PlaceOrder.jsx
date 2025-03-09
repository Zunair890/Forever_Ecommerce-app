import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

function PlaceOrder() {
  const {navigate,backendUrl,token,cartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContext)
  const [method, setMethod] = useState("cod")
  const [name,setName]= useState("")
  const [formData,setFormData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  // to handle above state

  const onChangeHanlder=(event)=>{
     const name= event.target.name;
     const value= event.target.value;

     setFormData(data=>({...data,[name]:[value]}))
  }

  const onsubmitHanlder=async (e)=>{
    e.preventDefault();
    try {
      let orderItems=[];
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo= structuredClone(products.find(product=> product._id=== items));
            if(itemInfo){
              itemInfo.size= item;
              itemInfo.quantity= cartItems[items][item];
              orderItems.push(itemInfo)
            }
          }
        }
      }
      console.log(orderItems)
    } catch (error) {
      console.log(error)
    }
     
  }


  return (
    <form onSubmit={onsubmitHanlder} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Left Side */}
      <div className="flex flex-col gap-4  w-full sm:max-w-[480px]">
         <div className="text-xl sm:text-2xl my-3">
           <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
         </div>
         <div className='flex gap-3'>
            <input required onChange={onChangeHanlder} name='firstName' value={formData.firstName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder='First name' />
            <input required onChange={onChangeHanlder} name='lastName' value={formData.lastName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder='Last name'/>
         </div>
         <input required onChange={onChangeHanlder} name='email' value={formData.email} type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder='Email address' />
         <input required onChange={onChangeHanlder} name='street' value={formData.street} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder="Street no." />
         <div className='flex gap-3'>
            <input required onChange={onChangeHanlder} name='city' value={formData.city} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder='City' />
            <input required onChange={onChangeHanlder} name='state' value={formData.state} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder='State'/>
         </div>
         <div className='flex gap-3'>
            <input required onChange={onChangeHanlder} name='zipcode' value={formData.zipcode} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder="Zipcode" />
            <input required onChange={onChangeHanlder} name='country' value={formData.country} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder='Country'/>
         </div>
          <input required onChange={onChangeHanlder} name='phone' value={formData.phone} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-none ' placeholder='Phone number' />
      </div>

      {/* Right Side */}

      <div className='mt-8'>
        <div className='mt-5 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
          {/* Payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod("stripe")} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==="stripe" ? "bg-green-400":"" }`}></p>
               <img className='h-5 mx-4' src={assets.stripe_logo} alt="Stripe Logo" />
            </div>
            <div onClick={()=>setMethod("cod")} className='flex items-center gap-3 border p-2 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==="cod" ? "bg-green-500":"" }`}></p>
               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-5'>
            <button type='submit' className='bg-black mt-3 rounded-sm text-white px-9 py-2.5 text-xs'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder