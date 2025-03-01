
function NewsLetter() {
    const onsubmit=(e)=>{
        e.preventDefault()
    }
  return (
    <div className="text-center">
     <p className="text-2xl md:text-3xl font-medium text-gray-900">Subscribe now & get 20% off</p>
     <p className="text-gray-400 mt-3">Lorem ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia vero aliquid fugiat consequuntur veritatis corporis quisquam sequi nam qui. dolor sit amet consectetur adipisicing elit. Dolores voluptate ut quidem.</p>
     <form onSubmit={onsubmit} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3" >

        <input type="email" className="w-full sm:flex-1 outline-none " placeholder="Enter your Email" required/>
        <button  className="bg-black text-white text-s px-10 py-4 ">SUBSCRIBE</button>
        
         </form>
    
    </div>
  )
}

export default NewsLetter