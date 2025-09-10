"use client";

import Calendar from "@/components/Workspace/Calendar/Calendar";
import UpcomingEvents from "@/components/Workspace/Calendar/UpcomingEvents";
import { Exam } from "@/types";

export default function CalendarClient({ exams }: { exams: Exam[] }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 flex flex-col md:flex-row gap-4">
      <Calendar exams={exams} />
      <UpcomingEvents exams={exams} />
    </div>
  );
}
