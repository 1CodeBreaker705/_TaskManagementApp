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

  // Compute task data specifically for the selected day
  const selectedDayData = useMemo(() => {
    if (!selectedDate) return { due: 0, overdue: 0 };
    return dateMap[selectedDate.toDateString()] || { due: 0, overdue: 0 };
  }, [selectedDate, dateMap]);

  // Custom DayButton wrapper (Hover tooltip title attribute removed)
  const customComponents = useMemo(() => ({
    DayButton: ({ day, modifiers, children, ...props }) => {
      const dateKey = day.date.toDateString();
      const data = dateMap[dateKey] || { due: 0, overdue: 0 };

      return (
        <button 
          {...props} 
          className="
            relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex flex-col items-center justify-center transition-all font-medium
            text-slate-800 
            hover:bg-indigo-50 hover:text-black
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
            aria-selected:bg-indigo-600 aria-selected:text-white aria-selected:hover:bg-indigo-100 aria-selected:hover:text-black
          "
        >
          <span className="text-xs sm:text-sm z-10">{children}</span>
          
          {/* Status dots placement */}
          <div className="absolute bottom-[3px] sm:bottom-[5px] flex gap-[2px] sm:gap-[3px] justify-center items-center z-10">
            {data.due > 0 && (
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
            )}
            {data.overdue > 0 && (
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-rose-500 shadow-sm shadow-rose-200" />
            )}
          </div>
        </button>
      );
    }
  }), [dateMap]);

  return (
    <div className="p-4 sm:p-6 lg:p-12 min-h-screen bg-slate-50/50 flex flex-col items-center justify-start antialiased">
      <div className="w-full max-w-md">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6 px-1 text-center sm:text-right">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center sm:text-left">
            Calendar
          </h1>
          
          <div className="flex flex-col items-center sm:items-end gap-1.5">
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
            
            {/* Updated instruction string */}
            <span className="text-[11px] text-slate-400 font-medium tracking-wide sm:mr-1 block">
              Select the date to see number of tasks
            </span>
          </div>
        </div>

        {/* Calendar Card container wrapper */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 p-4 sm:p-6 flex justify-center w-full overflow-hidden">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            showOutsideDays
            components={customComponents}
            classNames={{
              months: "flex flex-col space-y-4 w-full",
              month: "space-y-4 w-full",
              month_caption: "flex justify-center pt-2 relative items-center mb-2",
              caption_label: "text-sm sm:text-base font-bold text-slate-800 mx-auto tracking-wide",
              nav: "flex items-center absolute w-full justify-between left-0 right-0 px-1 pointer-events-none",
              button_previous: "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 transition-all pointer-events-auto text-slate-700 flex items-center justify-center rounded-xl hover:bg-slate-100",
              button_next: "h-8 w-8 bg-transparent p-0 opacity-60 hover:opacity-100 transition-all pointer-events-auto text-slate-700 flex items-center justify-center rounded-xl hover:bg-slate-100",
              weeks: "w-full border-collapse space-y-1",
              weekdays: "flex justify-between border-b border-slate-100/80 pb-2",
              weekday: "text-slate-400 w-9 sm:w-11 font-semibold text-[0.7rem] sm:text-[0.75rem] text-center uppercase tracking-widest first:text-rose-400/80 last:text-rose-400/80",
              week: "flex w-full mt-1.5 justify-between",
              day: "p-0 relative text-center focus-within:relative focus-within:z-20",
              selected: "shadow-lg shadow-indigo-100 font-bold rounded-xl",
              today: "border-[2px] border-indigo-500 font-bold text-indigo-600 rounded-xl aria-selected:border-transparent",
              outside: "text-slate-300 opacity-40 select-none pointer-events-none"
            }}
          />
        </div>

        {/* 
          CONDITIONAL PANEL: Only renders if selected day has > 0 due or overdue tasks.
          Normal dates will display completely blank beneath the calendar wrapper.
        */}
        {selectedDate && (selectedDayData.due > 0 || selectedDayData.overdue > 0) && (
          <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between transition-all duration-200 ease-out animate-fadeIn">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Selected Date
              </span>
              <span className="text-sm font-bold text-slate-800 mt-0.5">
                {selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className="flex gap-3">
              {selectedDayData.due > 0 && (
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1.5 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{selectedDayData.due} Due</span>
                </div>
              )}
              {selectedDayData.overdue > 0 && (
                <div className="flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-bold px-2.5 py-1.5 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>{selectedDayData.overdue} Overdue</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CalendarPage;
