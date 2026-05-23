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

      <div className="bg-white rounded-2xl shadow-lg border border-indigo-300 p-6">

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

              <div
                title={
                  hasOverdue
                  ? `${dayTasks.length} overdue task${
                      dayTasks.length!==1 ? "s" : ""
                    } on this date`

                  : `${dayTasks.length} task${
                      dayTasks.length!==1 ? "s" : ""
                    } due on this date`
                }

                className="flex justify-center mt-1"
              >

                <div
                  className={`w-2 h-2 rounded-full ${
                    hasOverdue
                    ? "bg-red-500"
                    : "bg-indigo-500"
                  }`}
                />

              </div>

            );

          }}

        />

      </div>

    </div>
  );
};

export default CalendarPage;