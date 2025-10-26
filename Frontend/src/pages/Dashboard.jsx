import React, { useState } from 'react'
import TaskCard from '../components/TaskCard'
import { BiSearchAlt } from "react-icons/bi";
import { useMainContext } from '../context/MainContext';

const Dashboard = () => {

  const {tasks}=useMainContext()
  const [search,setSearch]=useState('')
  const [priorityFilter, setPriorityFilter] = useState('All'); // All, High, Medium, Low
  const [statusFilter, setStatusFilter] = useState('All'); // All, Completed, Active, Pending
  const [sortOrder, setSortOrder] = useState('Newest'); 

  const filterResults = tasks
  .filter(task => {
    const x = search.toLowerCase();
    const matchesSearch = task.title.toLowerCase().includes(x) || task.description.toLowerCase().includes(x);
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  })
  .sort((a, b) => {
  if (sortOrder === 'Newest') return new Date(b.createdAt) - new Date(a.createdAt);
  if (sortOrder === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt);
  if (sortOrder === 'DueDate') {
    const dateA = a.dueDate ? new Date(a.dueDate) : Infinity; // tasks without due date go last
    const dateB = b.dueDate ? new Date(b.dueDate) : Infinity;
    return dateA - dateB; // closest due date on top
  }
});


  return (
    <>
       <div className="mb-2 mt-1 mx-auto w-[80%] flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 flex items-center bg-white px-4 md:px-6 py-2 rounded-xl shadow-md border-2 border-gray-100 focus-within:border-indigo-400 focus-within:shadow-indigo-200 transition-all duration-200">
            <BiSearchAlt className="text-2xl mr-2" />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Tasks"
              className="w-full py-2 outline-none"
            />
          </div>

        {/* Priority Filter */}
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="py-2 px-3 bg-white border-gray-200 outline-none rounded-xl shadow-md border-2 hover:border-indigo-400 hover:shadow-indigo-200 transition-all duration-200"
          >
            <option value="All">Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Sort Order */}
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="py-2 px-3 bg-white border-gray-200 outline-none rounded-xl shadow-md border-2 hover:border-indigo-400 hover:shadow-indigo-200 transition-all duration-200"
          >
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="DueDate">Due Date</option>
          </select>
      </div>

       {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="py-2 px-4 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
        >
          <option value="All">Status</option>
          <option value="Completed">Completed</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
        </select>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 w-[97%] lg:w-[80%] mx-auto py-10'>
       {
        (filterResults.length>0)?filterResults.map((task,i)=>{
              return <TaskCard data={task} key={i} />
              }):
              <>
                <div className="col-span-3 text-center">
                  <h1 className='text-center text-3xl font-black'>No Tasks📝 Use + Add Task Page</h1>
                </div>
              </>
       }
      </div>
    </>
  )
}

export default Dashboard
