"use client";

import UpcomingEvents from "./upcoming";
import Calendar from "./calendar";

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
