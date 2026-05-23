import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { CgSpinner } from "react-icons/cg";
import { axiosClient } from '../utils/axiosClient';
import { toast } from 'react-toastify';
import { useMainContext } from '../context/MainContext';


const TaskView = ({data,close}) => {

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
        <div className='relative min-h-[40vh] p-2 pb-20'>
          <div className="pb-16">
            <h3 className=' text-base lg:text-xl font-bold text-black mb-3 w-full break-words'>{data.title}</h3>
            <div className="quill-content mb-7 w-full lg:p-1" dangerouslySetInnerHTML={{ __html: data.description }}></div>
                  {/* Left details */}
                  <div className="mt-6 md:absolute md:bottom-8 md:left-4 text-xs md:text-sm text-gray-500 space-y-1">
                    <p><span className="font-medium text-gray-600">Category:</span> {data.category}</p>
                    <p><span className="font-medium text-gray-600">Status:</span> {data.status}</p>
                    <p><span className="font-medium text-gray-600">Priority:</span> {data.priority}</p>
                  </div>
                  
                  {/* Right dates */}
                  <div className="mt-4 md:mt-6 md:absolute md:bottom-8 md:right-4 text-xs md:text-sm text-gray-500 space-y-1">
                    <p>
                      <span className="font-medium text-gray-600">Created:</span>{" "}
                      {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                  
                    {data.dueDate && (
                      <p className="text-indigo-500">
                        <span className="font-medium text-gray-600">Due:</span>{" "}
                        {new Date(data.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">  
          <button onClick={deleteHandler} disabled={loading} className='text-xs lg:text-base flex items-center justify-center gap-x-1 lg:gap-x-2 bg-red-600 disabled:bg-red-700 text-white px-1 lg:px-2 py-1 rounded shadow cursor-pointer transform transition duration-300 hover:scale-105' >Delete{loading?<CgSpinner className='text-xs lg:text-xl animate-spin'/>:<FaTrash className='text-sm lg:text-base'/>}</button>
          </div>
        </div>
    </>
    
  )
}

export default TaskView
