import PropTypes from 'prop-types';
import { createContext,  useEffect,  useState } from 'react';
import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import axios from "axios"

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl= import.meta.env.VITE_BACKEND_URL

  // before the products come from asset file, 
  // now it will come from the api
  

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [orders, setOrders] = useState([]); // New state to hold orders
  const navigate = useNavigate(); // to navigate to different pages
  const [token,setToken]=useState("")


  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Please select a size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size]
        ? (cartData[itemId][size] += 1)
        : (cartData[itemId][size] = 1);
        
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    
   if(token){
    try {
      await axios.post(backendUrl+ "/api/cart/add",{itemId,size},{headers:{token}})
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
   }



  };

  const addOrder = () => {
    let tempOrders = structuredClone(orders);
    let newOrder = [];

    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          newOrder.push({
            _id: item,
            size,
            quantity: cartItems[item][size],
          });
        }
      }
    }
    setOrders([...tempOrders, ...newOrder]);
    //setCartItems({}); // Clear cart after placing the order
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        if (cartItems[item][size] > 0) {
          totalCount += cartItems[item][size];
        }
      }
    }
    console.log(cartItems)
    return totalCount;
  };

  const updateQuantity=async(itemId,size,quantity)=>{
      let cartData= structuredClone(cartItems);
      cartData[itemId][size]= quantity;
      setCartItems(cartData);

      if(token){
        try {
          await axios.post(backendUrl +"/api/cart/update",{itemId,size,quantity},{headers:{token}})
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
  }

  const getCartAmount = ()=>{
    let totalAmount=0;
    for(const items in cartItems){
      let itemInfo= products.find((product)=>product._id=== items);
      for(const item in cartItems[items]){
        try{
          if(cartItems[items][item]>0){
            totalAmount+= itemInfo.price* cartItems[items][item];

          }
        }
        catch(error)
        {
          console.log(error)
        }
      }
    }
    return totalAmount
  }

  // const getProductData = async () => {
  //   try {
      
  //     const response = await axios.get(backendUrl + "/api/product/list");
  //     console.log("API Response:", response.data);
      
  //     if (response.data.success) {
  //       setProducts(response.data.products);
  //     } else {
  //       toast.error("Failed to fetch products");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     toast.error(error.response?.data?.message || "Error fetching products");
  //   }
  // };
 
  // browser has the access of token so that it will not open the login page
  useEffect(()=>{
     
     if(!token && localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      getUserCart(localStorage.getItem("token"))
     }
  },[])

   // keep the cart data updated if page get reloaded

   const getUserCart=async(token)=>{
    try {
      const response= await axios.post(backendUrl+"/api/cart/get",{},{headers:{token}});
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
   }
 



  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    addOrder, // Add this to allow placing orders
    orders,
    navigate,
    backendUrl,
    token,
    setToken
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ShopContextProvider;