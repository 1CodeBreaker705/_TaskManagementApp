import React, { useEffect } from 'react'
import { taskCategories } from '../utils/constant';
import TaskViewModal from './TaskViewModal';
import Aos from "aos";
import 'aos/dist/aos.css'; 

const TaskCard = ({data}) => {

  const categoryClass=taskCategories[data.category]

  useEffect(() => {
    Aos.init({
      once: true
    })
  },[]);

  return (
    <>
    <div data-aos="fade-right" >
     <div className=" w-full flex flex-col lg:min-h-[220px] bg-white rounded shadow py-2 px-3 lg:py-3 lg:px-4 transform transition-all duration-[390ms] ease-in-out hover:scale-105 hover:shadow-lg hover:-translate-y-1 hover:shadow-indigo-200 border"  >
      <p className="truncate text-sm lg:text-xl font-bold mb-2">{data.title}</p>
      <p className="truncate font-semi-bold text-xs lg:text-lg text-zinc-400 py-2 bg-gray-100 rounded-2xl px-3 mb-2">{data.description}</p>
      <div className='mt-auto pt-1 lg:pt-3 flex justify-between items-center text-xs lg:text-lg'>
         <span className={categoryClass}>{data.category}</span>
         <span className=' px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 shadow-sm'>{data.status}</span>
         <TaskViewModal id={data._id}/>
      </div>
     </div>
     </div>
    </>
  )
}

export default TaskCard
