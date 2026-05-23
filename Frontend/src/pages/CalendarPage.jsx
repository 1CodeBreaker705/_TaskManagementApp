import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useMainContext } from "../context/MainContext";

const CalendarPage = () => {
  const { tasks } = useMainContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Stable timestamp for midnight today
  const todayMidnightKey = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }, []);

  // Filter tasks excluding completed ones
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

  // Custom DayButton wrapper
  const customComponents = useMemo(() => ({
    DayButton: ({ day, modifiers, children, ...props }) => {
      const dateKey = day.date.toDateString();
      const data = dateMap[dateKey] || { due: 0, overdue: 0 };

      // Tooltip logic
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
          className="
            relative w-11 h-11 rounded-xl flex flex-col items-center justify-center transition-all font-medium
            text-slate-800 
            hover:bg-indigo-50 hover:text-black
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
            aria-selected:bg-indigo-600 aria-selected:text-white aria-selected:hover:bg-indigo-100 aria-selected:hover:text-black
          "
        >
          <span className="text-sm z-10">{children}</span>
          
          {/* Status dots placement */}
          <div className="absolute bottom-[5px] flex gap-[3px] justify-center items-center z-10">
            {data.due > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
            )}
            {data.overdue > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shadow-sm shadow-rose-200" />
            )}
          </div>
        </button>
      );
    }
  }), [dateMap]);

  return (
    <div className="p-6 lg:p-12 min-h-screen bg-slate-50/50 flex flex-col items-center justify-start antialiased">
      <div className="w-full max-w-md">
        
                  {/* Top Header Section with Legend Items & Hover Instruction */}
          <div className="flex items-start justify-between mb-6 px-1">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Calendar
            </h1>
            
            <div className="flex flex-col items-end gap-1.5">
              {/* Active Dot Badges */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-white border border-slate-100 px-3 py-1.5 rounded-xl shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 block" />
                  <span>Tasks Due</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 block" />
                  <span>Overdue</span>
                </div>
              </div>
              
              {/* Your New Instruction Line */}
              <span className="text-[11px] text-slate-400 font-medium tracking-wide mr-1">
                Hover to see number of tasks
              </span>
            </div>
          </div>

        {/* Calendar Core Card wrapper */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 p-6 flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            showOutsideDays
            components={customComponents}
            classNames={{
              months: "flex flex-col space-y-4",
              month: "space-y-4",
              month_caption: "flex justify-center pt-2 relative items-center mb-2",
              caption_label: "text-base font-bold text-slate-800 mx-auto tracking-wide",
              nav: "flex items-center absolute w-full justify-between left-0 right-0 px-1 pointer-events-none",
              button_previous: "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 transition-all pointer-events-auto text-slate-700 flex items-center justify-center rounded-xl hover:bg-slate-100",
              button_next: "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 transition-all pointer-events-auto text-slate-700 flex items-center justify-center rounded-xl hover:bg-slate-100",
              weeks: "w-full border-collapse space-y-1",
              weekdays: "flex justify-between border-b border-slate-100/80 pb-2",
              weekday: "text-slate-400 w-11 font-semibold text-[0.75rem] text-center uppercase tracking-widest first:text-rose-400/80 last:text-rose-400/80",
              week: "flex w-full mt-1.5 justify-between",
              day: "p-0 relative text-center focus-within:relative focus-within:z-20",
              
              // Custom matching selections matching images
              selected: "shadow-lg shadow-indigo-100 font-bold rounded-xl",
              today: "border-[2px] border-indigo-500 font-bold text-indigo-600 rounded-xl aria-selected:border-transparent",
              outside: "text-slate-300 opacity-40 select-none pointer-events-none"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
