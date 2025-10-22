import React from 'react'
import { Link } from 'react-router-dom'
import { FaTasks } from 'react-icons/fa'
import Logo from './Logo'
import { useMainContext } from '../context/MainContext'

const Navbar = () => {
  
  const {user,logoutHandler}=useMainContext()
  
  return (
    <>
     <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-2 lg:p-5 items-center justify-between ">
    <Logo/>
    {(user)?
    <ul className='flex items-center justify-center gap-x-1 lg:gap-x-2'>
      <li>
         <Link to={'/'} className="px-3 py-1 lg:px-4 lg:py-2 rounded-sm border border-transparent hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 transition-all duration-300 cursor-pointer">Home</Link> 
      </li>
      <li>
         <Link to={'/add-task'} className="px-3 py-1 lg:px-4 lg:py-2  rounded-sm border border-transparent hover:border-indigo-500 hover:bg-indigo-100 hover:text-indigo-500 transition-all duration-300 cursor-pointer">Add Task</Link> 
      </li>
      <li>
         <button onClick={logoutHandler} className="px-3 py-1 lg:px-4 lg:py-2  bg-zinc-600 hover:bg-zinc-400 hover:border hover:border-black hover:text-black text-white rounded-sm cursor-pointer transition-all">Logout</button>
      </li>
      </ul>:<Link to={'/login'} className="px-3 py-1 lg:px-4 lg:py-2  bg-indigo-600 text-white rounded-sm cursor-pointer">Login</Link>}
  </div>
</header>
    </>
  )
}

export default Navbar
