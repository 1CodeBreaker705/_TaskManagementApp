import React, { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useMainContext } from "../context/MainContext";

const CalendarPage = () => {

  const { tasks } = useMainContext();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const today = new Date();
  today.setHours(0,0,0,0);

  const dateMap = useMemo(() => {

    const map = {};

    tasks
      .filter(task =>
        task.dueDate &&
        task.status !== "Completed"
      )
      .forEach(task => {

        const due = new Date(task.dueDate);
        due.setHours(0,0,0,0);

        const key = due.toDateString();

        if (!map[key]) {
          map[key] = {
            due: 0,
            overdue: 0
          };
        }

        if (due < today) {
          map[key].overdue++;
        } else {
          map[key].due++;
        }

      });

    return map;

  }, [tasks]);



  function DayContent({ date }) {

    const data = dateMap[date.toDateString()] || {
      due: 0,
      overdue: 0
    };

    let tooltip = "No due tasks";

    if(data.due > 0 && data.overdue > 0){

      tooltip =
      `${data.due} task${
        data.due > 1 ? "s" : ""
      } due • ${
        data.overdue
      } overdue task${
        data.overdue > 1 ? "s" : ""
      }`;

    }

    else if(data.overdue > 0){

      tooltip =
      `${data.overdue} overdue task${
        data.overdue > 1 ? "s" : ""
      }`;

    }

    else if(data.due > 0){

      tooltip =
      `${data.due} task${
        data.due > 1 ? "s" : ""
      } due`;

    }

    return (
      <div
        title={tooltip}
        className="
        relative
        flex
        items-center
        justify-center
        w-full
        h-full
        "
      >

        <span>
          {date.getDate()}
        </span>

        <div
          className="
          absolute
          bottom-1
          flex
          gap-1
          "
        >

          {data.due > 0 && (
            <div
              className="
              w-2
              h-2
              rounded-full
              bg-emerald-500
              "
            />
          )}

          {data.overdue > 0 && (
            <div
              className="
              w-2
              h-2
              rounded-full
              bg-red-500
              "
            />
          )}

        </div>

      </div>
    );
  }



  return (

    <div className="p-6 lg:p-12">

      <h1 className="
      text-2xl
      lg:text-4xl
      font-bold
      text-indigo-700
      mb-8
      ">
        Calendar
      </h1>

      <div
        className="
        w-fit
        mx-auto
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-indigo-100
        p-8
        "
      >

        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          showOutsideDays
          components={{
            DayContent
          }}
          classNames={{
            months:
            "flex",

            month:
            "space-y-4",

            caption:
            "flex justify-between items-center",

            caption_label:
            "text-lg font-bold text-indigo-700",

            nav_button:
            `
            h-8
            w-8
            rounded-lg
            hover:bg-indigo-100
            transition
            `,

            head_cell:
            `
            text-sm
            font-medium
            text-slate-500
            `,

            day:
            `
            h-11
            w-11
            rounded-xl
            hover:bg-indigo-50
            transition
            cursor-pointer
            `,

            selected:
            `
            bg-indigo-500
            text-white
            rounded-xl
            `,

            today:
            `
            border-2
            border-indigo-600
            text-indigo-700
            font-bold
            rounded-xl
            `
          }}
        />

      </div>

    </div>

  );
};

export default CalendarPage;