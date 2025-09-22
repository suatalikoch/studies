"use client";

import CalendarHeader from "@/components/Workspace/Calendar/CalendarHeader";
import Calendar from "@/components/Workspace/Calendar/Calendar";
import UpcomingEvents from "@/components/Workspace/Calendar/UpcomingEvents";
import { Exam } from "@/types";

export default function CalendarClient({ exams }: { exams: Exam[] }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950">
      <CalendarHeader />
      <div className="flex flex-row gap-4 p-4">
        <Calendar exams={exams} />
        <UpcomingEvents exams={exams} />
      </div>
    </div>
  );
}
