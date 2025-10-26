import React from 'react'
import { FaTasks } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <>
    <Link to='/' className='flex items-center gap-x-2 '>
     <FaTasks className='text-3xl text-indigo-500'/>
     <span className='font-bold text-2xl'>Taskin</span>
    </Link>
    </>
  )
}

export default Logo
