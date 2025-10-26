import React, { useEffect, useMemo, useState } from "react";
import { CalendarIcon, Triangle } from "lucide-react";
import { CalendarEvent, CalendarProps, EventFormProps, Exam } from "@/types";
import {
  Button,
  Calendar as CalendarComponent,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

export default function Calendar({
  events = [],
  exams = [],
  modalOpen = false,
  openModal,
  closeModal,
  editingEvent,
}: CalendarProps) {
  const [date, setDate] = useState<string>(toISO(new Date()));

  const todayISO = toISO(new Date());
  const [viewDate, setViewDate] = useState<Date>(new Date());
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

  const saveEvent = (e: CalendarEvent) => {
    setEventList((prev) => {
      if (editingEvent) {
        return prev.map((ev) => (ev.id === editingEvent.id ? e : ev));
      }
      return [...prev, e];
    });
    closeModal();
  };

  const deleteEvent = (id: string) => {
    setEventList((prev) => prev.filter((ev) => ev.id !== id));
    closeModal();
  };

  useEffect(() => {
    setEventList([...events, ...examsToCalendarEvents(exams)]);
  }, []);

  return (
    <div className="flex-1">
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-lg font-semibold">{label}</h2>
            <div className="flex items-center gap-1">
              <Button
                onClick={() => goMonth(-1)}
                variant="ghost"
                aria-label="Previous month"
              >
                <Triangle
                  fill="currentColor"
                  className="w-4 h-4 text-primary rotate-270"
                />
              </Button>
              <Button
                onClick={() => setViewDate(new Date())}
                variant="secondary"
                aria-label="Current Date"
              >
                Today
              </Button>
              <Button
                onClick={() => goMonth(1)}
                variant="ghost"
                aria-label="Next month"
              >
                <Triangle
                  fill="currentColor"
                  className="w-3 h-3 text-primary rotate-90"
                />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-sm text-muted-foreground p-3 border-b">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, idx) => {
                const today = new Date();
                const todayIndex = (today.getDay() + 6) % 7;
                return (
                  <div
                    key={day}
                    className={`text-center uppercase ${
                      idx === todayIndex ? "text-primary" : ""
                    }`}
                  >
                    {day}
                  </div>
                );
              }
            )}
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
                  <Card
                    key={`${wi}-${di}`}
                    onClick={() => setDate(iso)}
                    className={`p-2 relative bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 hover:dark:bg-neutral-700 hover:shadow cursor-pointer transition-colors duration-300
                  ${
                    muted &&
                    "text-muted-foreground bg-white dark:bg-neutral-900 hover:bg-neutral-50 hover:dark:bg-neutral-800"
                  }
                  ${isSelected ? "border-neutral-500 bg-primary/10" : ""}
                  ${
                    isToday
                      ? "border-primary hover:bg-primary/20 hover:dark:bg-primary/20"
                      : "border"
                  }
                `}
                  >
                    <CardContent className="p-0 flex flex-col items-start text-left">
                      <div className={`text-sm ${isToday && "text-primary"}`}>
                        {day.getDate()}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1 w-full">
                        {evs.slice(0, 3).map((e) => (
                          <span
                            key={e.id}
                            title={`${e.time && e.time + " • "}${e.title}`}
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
                          <span className="text-xs text-muted-foreground">
                            +{evs.length - 3}
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
      <Dialog open={modalOpen} onOpenChange={() => closeModal()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? "Edit event" : "Add event"}
            </DialogTitle>
          </DialogHeader>
          <EventForm
            event={editingEvent}
            onSave={saveEvent}
            onDelete={
              editingEvent ? () => deleteEvent(editingEvent.id) : undefined
            }
            selectedDate={date}
          />
          <DialogFooter>
            <Button type="submit" size="sm">
              Save
            </Button>
            {editingEvent && (
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={() => deleteEvent(editingEvent.id)}
              >
                Delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EventForm({ event, onSave, selectedDate }: EventFormProps) {
  const [title, setTitle] = useState(event?.title || "");
  const [time, setTime] = useState(event?.time || "");
  const [color, setColor] = useState(
    event?.color || "bg-primary text-secondary"
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
    </form>
  );
}
