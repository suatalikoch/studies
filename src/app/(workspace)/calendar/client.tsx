"use client";

import Calendar from "@/components/Workspace/Calendar/Calendar";
import UpcomingEvents from "@/components/Workspace/Calendar/UpcomingEvents";

export default function CalendarClient() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* Calendar Section */}
      <Calendar />

      {/* Exams & Tasks Section */}
      <UpcomingEvents />
    </div>
  );
}
