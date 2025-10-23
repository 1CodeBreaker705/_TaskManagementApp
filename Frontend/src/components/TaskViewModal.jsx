import React,{ useState } from 'react'
import { IoMdClose, IoMdOpen } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import TaskUpdateView from './TaskUpdateView';
import TaskView from './TaskView';
import { toast } from 'react-toastify';
import LoaderComponent from './LoaderComponent'
import { axiosClient } from '../utils/axiosClient';

const TaskViewModal = ({id}) => {

  const [isUpdating,setIsUpdating]=useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [loading,setLoading]=useState(false)
  const [task,setTask]=useState({})

  const fetchData=async()=>{
    try {
      setLoading(true)
      const response= await axiosClient.get('/task/'+id,{
        headers:{
          user:localStorage.getItem('user') || ''
        }
      })
      const data=response.data
      setTask(data)

    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }finally{
      setLoading(false)
    }
  }

  async function open() {
    await fetchData()
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return (
    <>
    <button onClick={open} className='px-3 py-1 text-white bg-indigo-500 rounded-full flex items-center justify-center gap-x-1 cursor-pointer'>View<span><IoMdOpen></IoMdOpen></span></button>
     <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-2xl rounded-xl bg-[#FFD700] border shadow p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="div" className="text-base/7 font-medium text-black flex items-center justify-between">
                <h3 className='flex items-center justify-center gap-x-2 lg:gap-x-3 '>
                  <span className='text-xs lg:text-lg'>Task {isUpdating?'Edit':'Details'}</span>
                </h3>
                <button onClick={()=>setIsUpdating(!isUpdating)} title='update' className=' text-xs lg:text-lg flex items-center justify-center gap-x-2 mr-15 cursor-pointer border rounded px-1 ml-4' >
                  <span className='text-xs lg:text-lg'>{isUpdating?'Show Details':'Update'}</span>{isUpdating?<FaEye/>:<CiEdit/>}
                </button>
                <button onClick={close} className='text-xl p-1 bg-black rounded-full text-white'><IoMdClose/></button>
              </DialogTitle>
              {loading?<>
               <div className=' w-full min-h-[40vh] flex items-center justify-center'>
                 <LoaderComponent/>
               </div>
              </>:
              <section className='w-full min-h-[40vh] bg-gray-100 rounded-2xl p-2 py-4 mt-3'>
                {isUpdating?<TaskUpdateView data={task} fetchData={fetchData} close={close} />:<TaskView data={task} close={close} />}
              </section>  }
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default TaskViewModal
