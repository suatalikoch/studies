import React, { useEffect, useMemo, useState } from "react";
import { CalendarIcon, Plus, Triangle, X } from "lucide-react";
import { CalendarEvent, CalendarProps, EventFormProps, Exam } from "@/types";
import {
  Button,
  Calendar as CalendarComponent,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/UI";

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
    color: "bg-red-100 text-red-700",
  }));
}

export default function Calendar({ events = [], exams = [] }: CalendarProps) {
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
    <div className="flex-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Calendar
        </h2>
        <Button onClick={() => openModal()} className="">
          <Plus className="w-4 h-4" /> Add Event
        </Button>
      </div>
      <div className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-950">
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
        <div className="grid grid-cols-7 gap-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-900 p-3 border-b border-gray-200 dark:border-gray-600">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="text-center uppercase font-medium">
              {d}
            </div>
          ))}
        </div>
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
                  ${
                    isToday
                      ? "border-indigo-500"
                      : "border-gray-200 dark:border-gray-600"
                  }
                `}
                >
                  <div
                    className={`text-sm font-medium ${
                      isToday ? "text-indigo-600" : ""
                    }`}
                  >
                    {day.getDate()}
                  </div>
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
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-950 rounded-lg p-6 w-96 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 cursor-pointer"
            >
              <X />
            </Button>
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

function EventForm({ event, onSave, onDelete, selectedDate }: EventFormProps) {
  const [title, setTitle] = useState(event?.title || "");
  const [time, setTime] = useState(event?.time || "");
  const [color, setColor] = useState(
    event?.color || "bg-indigo-100 text-indigo-700"
  );
  const [date, setDate] = useState(event?.date || selectedDate);
  const [open, setOpen] = useState(false);
  const [dateC, setDateC] = useState<Date | undefined>(undefined);

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
      <Input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal"
          >
            {dateC ? dateC.toLocaleDateString() : "Select date"}
            <CalendarIcon className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={dateC}
            onSelect={(date) => {
              setDateC(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <Select value={color} onValueChange={(e) => setColor(e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Colors</SelectLabel>
            <SelectItem value="bg-indigo-100 text-indigo-700">
              Indigo
            </SelectItem>
            <SelectItem value="bg-green-100 text-green-700">Green</SelectItem>
            <SelectItem value="bg-yellow-100 text-yellow-700">
              Yellow
            </SelectItem>
            <SelectItem value="bg-red-100 text-red-700">Red</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
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
