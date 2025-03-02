import React from 'react'
import {assets} from "../assets/assets.js"

function Navbar({setToken}) {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img src={assets.logo} className='w-[80px]' alt="" />
        <button onClick={()=>setToken("")} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-xl'>Logout</button>
    </div>
  )
}
 
export default Navbar