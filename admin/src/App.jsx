import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import {Routes,Route} from "react-router-dom"
import Add from './pages/Add'
import Orders from './pages/Orders'
import List from './pages/List'
import Login from './components/Login'
import {ToastContainer} from "react-toastify"

export const backendUrl= import.meta.env.VITE_BACKEND_URL

function App() {
    
    const [token,setToken]= useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

    // creating the local storage sio that when the page loads it will automatically have the access of the token.
    useEffect(()=>{
      localStorage.setItem("token",token)
    },[token])


  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token=== ""? <Login setToken={setToken }/>
      :
      <>
      <Navbar setToken={setToken}/>
      <hr />
      
      <div className='flex-w-full'>
          <Sidebar/>
          <div className='w-[70%] mx-auto ml-[max(5vw,25vw)] my-8 text-gray-600 text-base'>
           <Routes >
             <Route path='/add' element={<Add token={token}/>}/>
             <Route path='/list' element={<List token={token}/>}/>
             <Route path='/orders' element={<Orders token={token}/>}/>
           </Routes>

          </div>
      </div>
      </>
      }
      
    </div>
  )
}

export default App