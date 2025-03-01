import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"


function CartTotal() {
    const {currency,delivery_fee,getCartAmount}=useContext(ShopContext )
  return (
    <div className="w-full">
     <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
     </div> 
     <div className="felx flex-col gap-2 mt-2 text-sm">
         <div className="flex justify-between p-2">
            <p>SubTotal</p>
            <p>{currency}{getCartAmount()}.00</p>
         </div>
         <hr />
         <div className="flex justify-between p-2">
            <p>Shipping Fee</p>
            <p>{currency}{delivery_fee}.00</p>
         </div>
         <hr />
         <div className="flex justify-between p-2 bg-gray-100">
            <b>Total</b>
            <b>{currency} {getCartAmount()=== 0 ?0 : getCartAmount()+ delivery_fee}.00</b>
            
         </div>
     </div>

    </div>
  )
}

export default CartTotal