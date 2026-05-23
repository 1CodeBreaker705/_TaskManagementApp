import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useMainContext } from "../context/MainContext";

const CalendarPage = () => {
  const { tasks } = useMainContext();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // 1. Build out the structured data map for our tasks
  const dateMap = useMemo(() => {
    const map = {};

    tasks
      .filter((task) => task.dueDate && task.status !== "Completed")
      .forEach((task) => {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        const key = due.toDateString();

        if (!map[key]) {
          map[key] = { due: 0, overdue: 0 };
        }

        if (due < today) {
          map[key].overdue++;
        } else {
          map[key].due++;
        }
      });

    return map;
  }, [tasks, today]);

  // 2. Safely tap into the DayButton sub-component to inject our task dots
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
          className="relative w-11 h-11 rounded-xl transition hover:bg-indigo-50 flex items-center justify-center overflow-visible"
        >
          {children}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[4px] flex gap-[2px] z-[10]">
            {data.due > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            )}
            {data.overdue > 0 && (
              <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </div>
        </button>
      );
    }
  }), [dateMap]);

  return (
    <div className="p-6 lg:p-12">
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
            months: "flex",
            month: "space-y-4",
            caption: "flex justify-between items-center mb-4",
            caption_label: "text-lg font-bold text-indigo-700",
            nav: "flex gap-1",
            button_previous: "h-8 w-8 rounded-lg hover:bg-indigo-100 flex items-center justify-center text-indigo-700",
            button_next: "h-8 w-8 rounded-lg hover:bg-indigo-100 flex items-center justify-center text-indigo-700",
            head_cell: "text-sm font-medium text-slate-500 w-11 pb-2 text-center",
            day: "p-0 text-center",
            selected: "bg-indigo-500 text-white font-semibold rounded-xl",
            today: "border-2 border-indigo-600 font-bold text-indigo-700 rounded-xl",
            outside: "text-slate-400 opacity-50"
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
