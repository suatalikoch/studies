import React, { useEffect, useMemo, useState } from "react";
import { Plus, Triangle, X } from "lucide-react";
import { CalendarEvent, Exam } from "@/types";
import { Button } from "@/components/UI";

type Props = {
  events?: CalendarEvent[];
  exams?: Exam[];
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

function examsToCalendarEvents(exams: Exam[]): CalendarEvent[] {
  return exams.map((exam) => ({
    id: `exam-${exam.subject}-${exam.date}`,
    title: exam.subject,
    date: new Date(exam.date).toISOString().split("T")[0], // just YYYY-MM-DD
    time: new Date(exam.date).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
    color: "bg-red-100 text-red-700", // mark exams in red
  }));
}

export default function Calendar({ events = [], exams = [] }: Props) {
  const [date, setDate] = useState<string>(toISO(new Date()));

  const todayISO = toISO(new Date());
  const [viewDate, setViewDate] = useState<Date>(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [eventList, setEventList] = useState<CalendarEvent[]>(events);

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
    for (const ev of eventList) {
      const list = map.get(ev.date) ?? [];
      list.push(ev);
      map.set(ev.date, list);
    }
    return map;
  }, [eventList]);

  const label = viewDate.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  const goMonth = (delta: number) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1)
    );
  };

  const isSameMonth = (iso: string) => {
    const d = new Date(iso);
    return (
      d.getMonth() === viewDate.getMonth() &&
      d.getFullYear() === viewDate.getFullYear()
    );
  };

  // --- Modal handlers ---
  const openModal = (ev?: CalendarEvent) => {
    setEditingEvent(ev ?? null);
    setModalOpen(true);
  };

  const saveEvent = (e: CalendarEvent) => {
    setEventList((prev) => {
      if (editingEvent) {
        // edit existing
        return prev.map((ev) => (ev.id === editingEvent.id ? e : ev));
      }
      return [...prev, e];
    });
    setModalOpen(false);
  };

  const deleteEvent = (id: string) => {
    setEventList((prev) => prev.filter((ev) => ev.id !== id));
    setModalOpen(false);
  };

  useEffect(() => {
    setEventList([...events, ...examsToCalendarEvents(exams)]);
  }, []);

  return (
    <div className="flex-1 bg-white dark:bg-gray-950 border border-gray-200 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Calendar
        </h2>
        <Button onClick={() => openModal()} className="">
          <Plus className="w-4 h-4" /> Add Event
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-lg border border-gray-200 bg-white dark:bg-gray-950">
        {/* Month controls */}
        <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-50 dark:bg-gray-800 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
            {label}
          </h2>
          <div className="flex items-center gap-1">
            <Button
              onClick={() => goMonth(-1)}
              variant="ghost"
              aria-label="Previous month"
            >
              <Triangle fill="currentColor" className="w-4 h-4 rotate-270" />
            </Button>
            <Button
              onClick={() => setViewDate(new Date())}
              variant="outline"
              className="shadow-none"
              aria-label="Current Date"
            >
              Today
            </Button>
            <Button
              onClick={() => goMonth(1)}
              variant="ghost"
              aria-label="Next month"
            >
              <Triangle fill="currentColor" className="w-3 h-3 rotate-90" />
            </Button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-900 p-3 border-b border-gray-200">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center uppercase font-medium">
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
                  onClick={() => setDate(iso)}
                  className={`relative flex flex-col items-start p-2 rounded-lg text-left border hover:shadow transition
                  ${
                    muted
                      ? "text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-50"
                  }
                  ${isSelected ? "border-gray-500 bg-indigo-50" : ""}
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
                        className={`text-xs px-2 py-0.5 rounded-lg truncate ${
                          e.color ?? "bg-indigo-100 text-indigo-700"
                        }`}
                        style={{ maxWidth: "100%" }}
                        onClick={(ev) => {
                          ev.stopPropagation();
                          openModal(e);
                        }}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setModalOpen(false)}
            >
              <X />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {editingEvent ? "Edit Event" : "Add Event"}
            </h3>

            <EventForm
              event={editingEvent}
              onSave={saveEvent}
              onDelete={
                editingEvent ? () => deleteEvent(editingEvent.id) : undefined
              }
              selectedDate={date}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// --- Event Form Component ---
type EventFormProps = {
  event?: CalendarEvent | null;
  onSave: (ev: CalendarEvent) => void;
  onDelete?: () => void;
  selectedDate: string;
};

function EventForm({ event, onSave, onDelete, selectedDate }: EventFormProps) {
  const [title, setTitle] = useState(event?.title || "");
  const [time, setTime] = useState(event?.time || "");
  const [color, setColor] = useState(
    event?.color || "bg-indigo-100 text-indigo-700"
  );
  const [date, setDate] = useState(event?.date || selectedDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: event?.id || crypto.randomUUID(),
      title,
      time,
      color,
      date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Event title"
        className="border p-2 rounded-lg"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        className="border p-2 rounded-lg"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        className="border p-2 rounded-lg"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <select
        className="border p-2 rounded-lg"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="bg-indigo-100 text-indigo-700">Indigo</option>
        <option value="bg-green-100 text-green-700">Green</option>
        <option value="bg-yellow-100 text-yellow-700">Yellow</option>
        <option value="bg-red-100 text-red-700">Red</option>
      </select>
      <div className="flex justify-between items-center">
        {onDelete && (
          <Button type="button" onClick={onDelete} variant="destructive">
            Delete
          </Button>
        )}
        <Button type="submit" variant="default">
          Save
        </Button>
      </div>
    </form>
  );
}
