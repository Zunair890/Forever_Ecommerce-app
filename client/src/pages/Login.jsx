import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import {toast} from "react-toastify"

function Login() {
  const [currentState,setCurrentState]= useState("Sign Up");
  const {token,setToken,navigate,backendUrl}=useContext(ShopContext)
  // seeting input field for loin and sign up form
  const [name,setName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      if(currentState ==="Sign Up"){
        const response= await axios.post(backendUrl + "/api/user/register",{name,email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }
        else{
         toast.error(response.data.message)
        }
      }
      else{
        const response= await axios.post(backendUrl +"/api/user/login",{email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
      </div>
      {currentState==="Login" ?"": <input onChange={(e)=>setName(e.target.value)} value={name}  type="text" className="w-full px-3 py-2 border border-gray-800 outline-none" placeholder="Username" />}
      
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className="w-full px-3 py-2 border border-gray-800 outline-none" placeholder="Email" />
      <input onChange={(e)=>setPassword(e.target.value)} value={password}  type="password" className="w-full px-3 border py-2 border-gray-800 outline-none" placeholder="Password" />
      <div className="w-full flex justify-between text-sm ">
        <p className="cursor-pointer">Forgot your password?</p>
        {
          currentState==="Login"
          ? <p onClick={()=>setCurrentState("Sign Up")} className="cursor-pointer p-2 bg-gray-50 border rounded ">Create account</p>
          : <p onClick={()=>setCurrentState("Login")} className="cursor-pointer p-2 bg-gray-50 border rounded">Login here</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-3">{currentState==="Login"? "Sign In": "Sign Up"}</button>
    </form>
  )
}

export default Login