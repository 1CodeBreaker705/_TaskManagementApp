import React, { useEffect } from 'react'
import { taskCategories } from '../utils/constant';
import TaskViewModal from './TaskViewModal';
import Aos from "aos";
import 'aos/dist/aos.css'; 

const TaskCard = ({data}) => {

  const categoryClass=taskCategories[data.category]

 const getPriorityClass = (priority) => {
  switch(priority) {
    case "High":
      return "border-1 border-red-300 text-red-400 bg-red-100";
    case "Medium":
      return "border-1 border-orange-300 text-orange-400 bg-orange-100";
    case "Low":
      return "border-1 border-blue-300 text-blue-400 bg-blue-100";
    default:
      return "border-1 border-gray-300 text-gray-300 bg-gray-100";
  }
}

 // convert HTML to plain text with bullets
const preview = data.description
  .replace(/<li>/gi, '• ')   // bullet
  .replace(/<\/li>/gi, '\n') // new line after item
  .replace(/<ul>/gi, '\n')   // new line before list
  .replace(/<\/ul>/gi, '\n') // new line after list
  .replace(/<br\s*\/?>/gi, '\n') // line breaks
  .replace(/<p>/gi, '\n')
  .replace(/<\/p>/gi, '\n')
  .replace(/<[^>]+>/g, '')  // remove other HTML tags
  .trim();

// limit number of characters but keep line breaks
const previewText = preview.split('\n').map(line => line.slice(0, 50)).join('\n');

  useEffect(() => {
    Aos.init({
      once: true
    })
  },[]);

  return (
    <>
    <div data-aos="fade-right" >
      <div className=" w-full flex flex-col lg:min-h-[270px] bg-white rounded shadow-md py-2 px-3 lg:py-3 lg:px-4 transform transition-all duration-[390ms] ease-in-out hover:scale-105 hover:shadow-xs hover:-translate-y-1 border hover:shadow-indigo-300  border-gray-400 hover:border-indigo-700"  >
        <div className="flex justify-between text-xs lg:text-sm mb-2 text-gray-500">
          <span>Created: {new Date(data.createdAt).toLocaleDateString()}</span>
          {data.dueDate && <span>Due: {new Date(data.dueDate).toLocaleDateString()}</span>}
        </div>
        <p className="truncate text-sm lg:text-xl font-bold mb-2">{data.title}</p>
        <p className="font-semi-bold text-xs lg:text-lg text-zinc-400 py-2 bg-gray-100 rounded-2xl px-3 mb-2 whitespace-pre-line max-h-23 overflow-hidden"> 
          {previewText}
      </p>
        <div className='mt-auto pt-1 lg:pt-3 flex justify-between items-center text-xs lg:text-lg'>
          <span className={categoryClass}>{data.category}</span>
          <span className=' px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300 shadow-sm'>{data.status}</span>
          <TaskViewModal id={data._id}/>
        </div>
        <div className={`${getPriorityClass(data.priority)} text-center rounded mt-4 text-xs lg:text-sm  `}>Priority: {data.priority}</div>
      </div>
     </div>
    </>
  )
}

export default TaskCard
