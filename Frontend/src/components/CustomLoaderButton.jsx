import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaArrowRight } from 'react-icons/fa'

const CustomLoaderButton = ({isLoading,text}) => {
  return (
    <>
    <button type='submit' disabled={isLoading} className='w-full py-2 px-3 bg-indigo-700 text-white rounded flex justify-center items-center gap-x-2 cursor-pointer  disabled:bg-indigo-400 duration-100'><span>{text}</span>{isLoading?<CgSpinner className='text-xl animate-spin [animation-duration:0.6s]'/>:<FaArrowRight/>}</button>
    
    </>
  )
}

export default CustomLoaderButton
