import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useMainContext } from "../context/MainContext";

const CalendarPage = () => {
  const { tasks } = useMainContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 1. Fixed & stable primitive logic timestamp
  const todayMidnightKey = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  const dateMap = useMemo(() => {
    const map = {};

    tasks
      .filter((task) => task.dueDate && task.status !== "Completed")
      .forEach((task) => {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        
        const key = due.toDateString();
        const dueTime = due.getTime();

        if (!map[key]) {
          map[key] = { due: 0, overdue: 0 };
        }

        if (dueTime < todayMidnightKey) {
          map[key].overdue++;
        } else {
          map[key].due++;
        }
      });

    return map;
  }, [tasks, todayMidnightKey]);

  // 2. Custom DayButton component with fixed hover states
  const customComponents = useMemo(() => ({
    DayButton: ({ day, modifiers, children, ...props }) => {
      const dateKey = day.date.toDateString();
      const data = dateMap[dateKey] || { due: 0, overdue: 0 };

      let tooltip = "No due tasks";
      if (data.due > 0 && data.overdue > 0) {
        tooltip = `${data.due} task${data.due > 1 ? "s" : ""} due • ${data.overdue} overdue task${data.overdue > 1 ? "s" : ""}`;
      } else if (data.overdue > 0) {
        tooltip = `${data.overdue} overdue task${data.overdue > 1 ? "s" : ""}`;
      } else if (data.due > 0) {
        tooltip = `${data.due} task${data.due > 1 ? "s" : ""} due`;
      }

      return (
        <button 
          {...props} 
          title={tooltip} 
          /* 
            FIX: Added text-slate-800, hover:text-indigo-900, and aria-selected:text-white 
            to explicitly lock down the font colors during hover and selection states.
          */
          className="relative w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-colors text-slate-800 hover:bg-indigo-50 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 aria-selected:text-white aria-selected:hover:bg-indigo-600 aria-selected:hover:text-white"
        >
          <span className="text-sm font-medium">{children}</span>
          
          <div className="absolute bottom-[4px] flex gap-[2px] justify-center items-center">
            {data.due > 0 && (
              <div className="w-1 h-1 rounded-full bg-emerald-500" />
            )}
            {data.overdue > 0 && (
              <div className="w-1 h-1 rounded-full bg-red-500" />
            )}
          </div>
        </button>
      );
    }
  }), [dateMap]);

  return (
    <div className="p-6 lg:p-12 min-h-screen bg-slate-50">
      <h1 className="text-2xl lg:text-4xl font-bold text-indigo-700 mb-8">
        Calendar
      </h1>

      <div className="w-fit mx-auto bg-white rounded-3xl shadow-xl border border-indigo-100 p-8">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          showOutsideDays
          components={customComponents}
          classNames={{
            months: "flex flex-col space-y-4",
            month: "space-y-4",
            month_caption: "flex justify-center pt-1 relative items-center mb-4",
            caption_label: "text-base font-semibold text-indigo-900 mx-auto",
            nav: "flex items-center absolute w-full justify-between left-0 right-0 px-2 pointer-events-none",
            button_previous: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 transition-opacity pointer-events-auto text-indigo-700 flex items-center justify-center rounded-lg hover:bg-indigo-50",
            button_next: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 transition-opacity pointer-events-auto text-indigo-700 flex items-center justify-center rounded-lg hover:bg-indigo-50",
            weeks: "w-full border-collapse space-y-1",
            weekdays: "flex justify-between",
            weekday: "text-slate-400 w-11 font-normal text-[0.8rem] text-center uppercase tracking-wider",
            week: "flex w-full mt-2 justify-between",
            day: "p-0 relative text-center focus-within:relative focus-within:z-20",
            selected: "bg-indigo-600 text-white rounded-xl font-semibold shadow-md shadow-indigo-200",
            today: "border-2 border-indigo-600 font-bold text-indigo-700 rounded-xl",
            outside: "text-slate-300 opacity-40 select-none pointer-events-none"
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
