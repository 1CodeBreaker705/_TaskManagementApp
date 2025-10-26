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

   const getPriorityClass = (priority) => {
  switch(priority) {
    case "High":
      return "border-1 border-red-300 text-red-400 bg-red-100";
    case "Medium":
      return "border-1 border-orange-300 text-orange-400 bg-orange-100";
    case "Low":
      return "border-1 border-blue-300 text-blue-400 bg-blue-100";
    default:
      return "border-1 border-gray-300 text-gray-700 bg-gray-100";
  }
}

  return (
    <>
        <div className='relative min-h-[40vh] p-2'>
          <div className="pb-16">
            <h3 className=' text-base lg:text-xl font-bold text-black mb-3 w-full break-words'>{data.title}</h3>
            <div className="quill-content mb-7 w-full lg:p-2" dangerouslySetInnerHTML={{ __html: data.description }}></div>
            <p className='mb-5 text-sm'>Category:   <span className={`${categoryClass}`}>{data.category}</span></p>
            <p className='mb-3 text-sm'>Status:  <span className='text-xs lg:sm px-2 py-1 lg:px-3 lg:py-1.5 rounded-full font-medium bg-gray-100 text-gray-700 border border-gray-300 shadow-sm '>{data.status}</span></p> 
            <div className={`${getPriorityClass(data.priority)} text-center rounded text-xs lg:text-sm w-1/4 absolute bottom-4 left-0 right-0 ml-2 lg:ml-5`}>Priority: {data.priority}</div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">  
          <button onClick={deleteHandler} disabled={loading} className='text-xs lg:text-base flex items-center justify-center gap-x-1 lg:gap-x-2 bg-red-600 disabled:bg-red-700 text-white px-1 lg:px-2 py-1 rounded shadow cursor-pointer transform transition duration-300 hover:scale-105' >Delete{loading?<CgSpinner className='text-xs lg:text-xl animate-spin'/>:<FaTrash className='text-sm lg:text-base'/>}</button>
          </div>
        </div>
    </>
    
  )
}

export default TaskView
