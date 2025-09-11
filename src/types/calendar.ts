import { Exam } from "./exam";

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  color?: string;
  meta?: string;
};

export interface CalendarProps {
  events?: CalendarEvent[];
  exams?: Exam[];
}

export interface EventFormProps {
  event?: CalendarEvent | null;
  onSave: (ev: CalendarEvent) => void;
  onDelete?: () => void;
  selectedDate: string;
}

export interface UpcomingEventsProps {
  exams: Exam[];
}
