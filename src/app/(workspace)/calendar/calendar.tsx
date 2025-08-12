import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { CalendarEvent } from "@/types";

type Props = {
  events?: CalendarEvent[];
};

function toISO(d: Date) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export default function Calendar({ events = [] }: Props) {
  const [date, setDate] = useState<string | undefined>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  });

  const todayISO = toISO(new Date());
  const [viewDate, setViewDate] = useState<Date>(new Date());

  const monthMatrix = useMemo(() => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);
    const startWeekDay = (start.getDay() + 6) % 7; // Monday-first
    const daysInMonth = end.getDate();

    const cells: string[] = [];

    // previous month tail
    for (let i = 0; i < startWeekDay; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() - (startWeekDay - i));
      cells.push(toISO(d));
    }

    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(toISO(new Date(start.getFullYear(), start.getMonth(), d)));
    }

    // next month head
    while (cells.length % 7 !== 0) {
      const lastDate = new Date(cells[cells.length - 1]);
      lastDate.setDate(lastDate.getDate() + 1);
      cells.push(toISO(lastDate));
    }

    // split into weeks
    return Array.from({ length: cells.length / 7 }, (_, i) =>
      cells.slice(i * 7, i * 7 + 7)
    );
  }, [viewDate]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const ev of events) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, [events]);

  const label = viewDate.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  const goMonth = (delta: number) => {
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  };

  const isSameMonth = (iso: string) => {
    const d = new Date(iso);
    return (
      d.getMonth() === viewDate.getMonth() &&
      d.getFullYear() === viewDate.getFullYear()
    );
  };

  return (
    <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>
      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">{label}</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => goMonth(-1)}
              className="px-2 py-1 rounded-md hover:bg-gray-200 transition"
              aria-label="Previous month"
            >
              ◀
            </button>
            <button
              onClick={() => setViewDate(new Date())}
              className="px-3 py-1 text-sm rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
            >
              Today
            </button>
            <button
              onClick={() => goMonth(1)}
              className="px-2 py-1 rounded-md hover:bg-gray-200 transition"
              aria-label="Next month"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 text-sm text-gray-500 bg-gray-100 px-4 py-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center font-medium">
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="p-3 grid grid-cols-7 gap-2">
          {monthMatrix.map((week, wi) =>
            week.map((iso, di) => {
              const day = new Date(iso);
              const evs = eventsByDate.get(iso) ?? [];
              const isToday = iso === todayISO;
              const isSelected = date === iso;
              const muted = !isSameMonth(iso);

              return (
                <button
                  key={`${wi}-${di}`}
                  onClick={() => setDate?.(iso)}
                  className={`relative flex flex-col items-start p-2 rounded-lg text-left border hover:shadow transition
                  ${
                    muted
                      ? "text-gray-400 bg-gray-50"
                      : "bg-white text-gray-800"
                  }
                  ${isSelected ? "ring-2 ring-indigo-400 bg-indigo-50" : ""}
                  ${isToday ? "border-indigo-500" : "border-gray-200"}
                `}
                >
                  {/* Date */}
                  <div
                    className={`text-sm font-medium ${
                      isToday ? "text-indigo-600" : ""
                    }`}
                  >
                    {day.getDate()}
                  </div>

                  {/* Event tags */}
                  <div className="mt-2 flex flex-wrap gap-1 w-full">
                    {evs.slice(0, 3).map((e) => (
                      <span
                        key={e.id}
                        title={`${e.time ? e.time + " • " : ""}${e.title}`}
                        className={`text-xs px-2 py-0.5 rounded-full truncate ${
                          e.color ?? "bg-indigo-100 text-indigo-700"
                        }`}
                        style={{ maxWidth: "100%" }}
                      >
                        {e.title}
                      </span>
                    ))}
                    {evs.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{evs.length - 3}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
