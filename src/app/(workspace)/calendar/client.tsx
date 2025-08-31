"use client";

import Calendar from "@/components/Workspace/Calendar/Calendar";
import UpcomingEvents from "@/components/Workspace/Calendar/UpcomingEvents";
import { Exam } from "@/types";

export default function CalendarClient({ exams }: { exams: Exam[] }) {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* Calendar Section */}
      <Calendar exams={exams} />

      {/* Exams & Tasks Section */}
      <UpcomingEvents exams={exams} />
    </div>
  );
}
