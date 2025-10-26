import React from 'react'
import { CgSpinner } from 'react-icons/cg'


const CustomLoaderButton = ({isLoading,text}) => {
  return (
    <>
    <button type='submit' disabled={isLoading} className='w-full py-2 px-3 bg-indigo-700 text-white rounded flex justify-center items-center gap-x-2 cursor-pointer  disabled:bg-indigo-400 duration-300 border border-transparent hover:bg-indigo-100 hover:text-indigo-500 hover:border-indigo-500 transition-all transform hover:scale-105'><span>{text}</span>{isLoading?<CgSpinner className='text-xl animate-spin [animation-duration:0.6s]'/>:null}</button>
    
    </>
  )
}

export default CustomLoaderButton
