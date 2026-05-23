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

  const dateMap = useMemo(() => {
    const map = {};

    tasks
      .filter(
        (task) =>
          task.dueDate &&
          task.status !== "Completed"
      )
      .forEach((task) => {
        const due = new Date(task.dueDate);

        due.setHours(0, 0, 0, 0);

        const key = due.toDateString();

        if (!map[key]) {
          map[key] = {
            due: 0,
            overdue: 0,
          };
        }

        if (due < today) {
          map[key].overdue++;
        } else {
          map[key].due++;
        }
      });

    return map;
  }, [tasks, today]);



  const customComponents = useMemo(
    () => ({
      DayButton: ({
        day,
        children,
        ...props
      }) => {

        const key =
          day.date.toDateString();

        const data =
          dateMap[key] || {
            due: 0,
            overdue: 0,
          };

        let tooltip =
          "No due tasks";

        if (
          data.due > 0 &&
          data.overdue > 0
        ) {
          tooltip =
            `${data.due} task${
              data.due > 1
                ? "s"
                : ""
            } due • ${
              data.overdue
            } overdue task${
              data.overdue > 1
                ? "s"
                : ""
            }`;
        }

        else if (
          data.overdue > 0
        ) {
          tooltip =
            `${data.overdue} overdue task${
              data.overdue > 1
                ? "s"
                : ""
            }`;
        }

        else if (
          data.due > 0
        ) {
          tooltip =
            `${data.due} task${
              data.due > 1
                ? "s"
                : ""
            } due`;
        }

        return (
          <button
            {...props}
            title={tooltip}
            className="
            relative
            w-full
            h-full
            flex
            items-center
            justify-center
            transition
            hover:bg-indigo-50
            overflow-visible
            rounded-xl
            "
          >
            {children}

            <div
              className="
              absolute
              left-1/2
              -translate-x-1/2
              bottom-[4px]
              flex
              gap-1
              z-10
              "
            >
              {data.due > 0 && (
                <div
                  className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-emerald-500
                  "
                />
              )}

              {data.overdue > 0 && (
                <div
                  className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-red-500
                  "
                />
              )}
            </div>
          </button>
        );
      },
    }),
    [dateMap]
  );



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
          onSelect={(date) =>
            date &&
            setSelectedDate(date)
          }
          showOutsideDays
          components={
            customComponents
          }
          classNames={{
            months: "flex",

            month:
              "space-y-4",

            caption:
              "flex justify-between items-center px-2",

            caption_label:
              "text-lg font-bold text-indigo-700",

            nav:
              "flex gap-2",

            button_previous:
              `
              h-8 w-8
              rounded-lg
              hover:bg-indigo-100
              flex items-center
              justify-center
              text-indigo-700
              transition
              `,

            button_next:
              `
              h-8 w-8
              rounded-lg
              hover:bg-indigo-100
              flex items-center
              justify-center
              text-indigo-700
              transition
              `,

            head_row:
              "flex",

            row:
              "flex mt-2",

            head_cell:
              `
              w-11
              text-center
              text-sm
              font-medium
              text-slate-500
              `,

            cell:
              `
              h-11
              w-11
              p-0
              relative
              `,

            day:
              "w-full h-full",

            selected:
              `
              bg-indigo-500
              text-white
              font-semibold
              rounded-xl
              `,

            today:
              `
              border-2
              border-indigo-600
              text-indigo-700
              font-bold
              rounded-xl
              `,

            outside:
              `
              text-slate-400
              opacity-50
              `
          }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
