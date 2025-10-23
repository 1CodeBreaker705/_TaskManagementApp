import React, { useState } from 'react'
import { taskCategories } from '../utils/constant';
import { FaTrash } from 'react-icons/fa';
import { CgSpinner } from "react-icons/cg";
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-toastify';
import { useMainContext } from '../context/MainContext';

const TaskView = ({data,close}) => {
  const categoryClass=taskCategories[data.category]

  const {fetchAllTasks}=useMainContext()

  const [loading,setLoading]=useState(false)
  
  const deleteHandler=async()=>{
          try {
            
            setLoading(true)
          
            const response=await axiosClient.delete('/task/'+data._id,{
              headers:{
                user:localStorage.getItem('user') || ''
              }
            })

            const res=response.data
            toast.success(res.message)
            await fetchAllTasks()
            close()
  
          } catch (error) {
            toast.error(error?.response?.data?.error || error.message)
          }finally{
             setLoading(false)
          }
  }

  return (
    <>
      <h3 className=' text-sm lg:text-xl font-bold text-black mb-3 w-full break-words'>{data.title}</h3>
      <p className=' text-xs lg:text-lg font-semi-bold text-zinc-700 mb-3 w-full break-words'>{data.description}</p>
      <p className='mb-5 text-sm'>Category:   <span className={`${categoryClass}`}>{data.category}</span></p>
      <p className='mb-3 text-sm'>Status:  <span className='text-xs lg:sm px-2 py-1 lg:px-3 lg:py-1.5 rounded-full font-medium bg-gray-100 text-gray-700 border border-gray-300 shadow-sm '>{data.status}</span></p>
      <div className="flex items-center justify-center">
      <button onClick={deleteHandler} disabled={loading} className='text-xs lg:text-base flex items-center justify-center gap-x-1 lg:gap-x-2 bg-red-600 disabled:bg-red-700 text-white px-2 lg:py-1 rounded shadow cursor-pointer'>Delete{loading?<CgSpinner className='text-xs lg:text-xl animate-spin'/>:<FaTrash/>}</button>
      </div>
    </>
    
  )
}

export default TaskView
