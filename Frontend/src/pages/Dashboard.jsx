import React, { useState } from 'react'
import TaskCard from '../components/TaskCard'
import { BiSearchAlt } from "react-icons/bi";
import { useMainContext } from '../context/MainContext';

const Dashboard = () => {

  const {tasks}=useMainContext()
  const [search,setSearch]=useState('')
  const filterResults= tasks.length>0?tasks.filter((cur)=>{
    const x=search.toLowerCase()
    const y=cur.title.trim().toLowerCase()
    const z=cur.description.trim().toLowerCase()
    return y.includes(x) || y.startsWith(x) || y.endsWith(x) || z.includes(x) || z.startsWith(x) || z.endsWith(x)
  }):[]

  return (
    <>
      <div className="mb-3 mx-auto w-[80%] flex items-center justify-center bg-white px-10 hover:shadow hover:border hover:border-1 hover:border-yellow-500 ">
        <BiSearchAlt className='text-2xl'/>
        <input onChange={(e)=>{setSearch(e.target.value)}} type="text" className='w-full py-3 px-4 outline-none' value={search} placeholder='Search Tasks' />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 w-[97%] lg:w-[80%] mx-auto py-10'>
       {
        (filterResults.length>0)?filterResults.map((task,i)=>{
              return <TaskCard data={task} key={i} />
              }):
              <>
                <div className="col-span-3 text-center">
                  <h1 className='text-center text-3xl font-black'>No Tasks📝</h1>
                </div>
              </>
       }
      </div>
    </>
  )
}

export default Dashboard
