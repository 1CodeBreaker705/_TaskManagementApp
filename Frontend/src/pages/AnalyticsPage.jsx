import React from "react";
import { useMainContext } from "../context/MainContext";

const AnalyticsPage = () => {
  const { tasks } = useMainContext();

  // Status counts
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  const activeCount = tasks.filter((t) => t.status === "Active").length;
  const pendingCount = tasks.filter((t) => t.status === "Pending").length;

  // Priority counts
  const highPriority = tasks.filter((t) => t.priority === "High").length;
  const mediumPriority = tasks.filter((t) => t.priority === "Medium").length;
  const lowPriority = tasks.filter((t) => t.priority === "Low").length;

  // Category counts
  const studyPriority = tasks.filter((t) => t.category === "Study").length;
  const professionalPriority = tasks.filter((t) => t.category === "Professional").length;
  const healthPriority = tasks.filter((t) => t.category === "Health").length;
  const personalPriority = tasks.filter((t) => t.category === "Personal").length;
  const socialPriority = tasks.filter((t) => t.category === "social").length;
  const othersPriority = tasks.filter((t) => t.category === "others").length;

  //task completion rate
   const completionRate = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);
  
  //overdue count
  const overdueCount = tasks.filter(task => {
  if (!task.dueDate) return false;
  return new Date(task.dueDate) < new Date();
}).length;

  return (
    <div className="p-6 lg:p-12">
      <div className="flex flex-col gap-10">
      <h1 className="text-2xl lg:text-4xl font-bold text-indigo-700 ">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Status */}
        <div className="bg-white shadow-lg rounded-2xl p-4 border-2 border-indigo-400">
          <h2 className="font-semibold text-lg mb-3 text-indigo-500">Task Status</h2>
          <p>Completed: <span className="font-bold text-indigo-500">{completedCount}</span></p>
          <p>Active: <span className="font-bold text-indigo-500">{activeCount}</span></p>
          <p>Pending: <span className="font-bold text-indigo-500">{pendingCount}</span></p>
        </div>

        {/* Priority */}
        <div className="bg-white shadow-lg  rounded-2xl p-4 border-2 border-indigo-400">
          <h2 className="font-semibold text-lg mb-3 text-indigo-500">Task Priority</h2>
          <p>High: <span className="text-red-500 font-bold">{highPriority}</span></p>
          <p>Medium: <span className="text-orange-500 font-bold">{mediumPriority}</span></p>
          <p>Low: <span className="text-blue-500 font-bold">{lowPriority}</span></p>
        </div>

        {/* Status */}
        <div className="bg-white shadow-lg rounded-2xl p-4 border-2 border-indigo-400">
          <h2 className="font-semibold text-lg mb-3 text-indigo-500">Task Categories</h2>
          <p>Study: <span className="font-bold text-blue-400">{completedCount}</span></p>
          <p>Professional: <span className="font-bold text-green-400">{activeCount}</span></p>
          <p>Health: <span className="font-bold text-red-400">{pendingCount}</span></p>
          <p>Personal: <span className="font-bold text-yellow-400">{pendingCount}</span></p>
          <p>Social: <span className="font-bold text-pink-400">{pendingCount}</span></p>
          <p>Others: <span className="font-bold text-gray-400">{pendingCount}</span></p>
        </div>
        
          {/* OverDue */}
          <div className="bg-white shadow-lg  rounded-2xl p-4 flex flex-col justify-center items-center border-2 border-indigo-400">
          <h2 className="font-semibold text-lg mb-3 text-red-500">Overdue Tasks</h2>
          <span className="text-4xl lg:text-5xl font-bold text-red-400">{overdueCount}</span>
        </div>

        {/* Total Tasks */}
        <div className="bg-white shadow-lg  rounded-2xl p-4 flex flex-col justify-center items-center border-2 border-indigo-400 ">
          <h2 className="font-semibold text-lg mb-3 text-indigo-500">Total Tasks</h2>
          <span className="text-4xl lg:text-5xl font-bold text-indigo-500">{tasks.length}</span>
        </div>

        {/* Completion Rate */}
        <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-center items-center border-2 border-indigo-400">
          <h2 className="font-semibold text-lg mb-3 text-green-500">Completion Rate</h2>
          <div className="w-full bg-gray-200 rounded-full h-4 outline-2 outline-indigo-300">
            <div
              className="bg-green-500 h-4 shadow-sm rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <span className="mt-3 text-2xl font-bold text-green-600">
            {completionRate}%
          </span>
        </div>


      </div>
    </div>
  </div>
            
  );
};

export default AnalyticsPage;
