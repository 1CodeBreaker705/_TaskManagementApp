import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useMainContext } from "../context/MainContext";

const CalendarPage = () => {

  const { tasks } = useMainContext();

  const [selectedDate,setSelectedDate] = useState(new Date());

  const today = new Date();
  today.setHours(0,0,0,0);

  return (
    <div className="p-6 lg:p-12">

      <h1 className="text-2xl lg:text-4xl font-bold text-indigo-700 mb-8">
        Calendar
      </h1>

     <div className="w-fit mx-auto bg-white rounded-3xl shadow-xl border border-indigo-200 p-8">

        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}

          tileContent={({date})=>{

            const dayTasks = tasks.filter(task=>{

              if(!task.dueDate) return false;

              return (
                new Date(task.dueDate).toDateString() ===
                date.toDateString()
              );

            });

            if(dayTasks.length===0) return null;

            const hasOverdue = dayTasks.some(task=>{

              const due = new Date(task.dueDate);

              due.setHours(0,0,0,0);

              return (
                due < today &&
                task.status !== "Completed"
              );

            });

           return (


  <div className="group relative flex justify-center mt-1">

    <div
      className={`w-2 h-2 rounded-full ${
        hasOverdue
        ? "bg-red-500"
        : "bg-emerald-500"
      }`}
    />

    <div
      className="
      absolute left-1/2
      -translate-x-1/2
      -translate-y-full
      bottom-7
      opacity-0
      group-hover:opacity-100
      transition-all duration-150
      bg-gray-800 text-white
      text-[10px]
      px-2 py-1 rounded-md
      whitespace-nowrap
      pointer-events-none
      z-50 shadow-lg
    "
    >
      {
        hasOverdue
        ? `${dayTasks.length} overdue task${
            dayTasks.length!==1 ? "s" : ""
          }`

        : `${dayTasks.length} task${
            dayTasks.length!==1 ? "s" : ""
          } due`
      }
    </div>

  </div>


                
                );

          }}

        />

      </div>

    </div>
  );
};

export default CalendarPage;
