"use client";

import Cards from "@/components/Workspace/Dashboard/Cards";
import RecentNotes from "@/components/Workspace/Dashboard/RecentNotes";
import UpcomingDeadlines from "@/components/Workspace/Dashboard/UpcomingDeadlines";
import WeeklyProgress from "@/components/Workspace/Dashboard/WeeklyProgress";
import Welcome from "@/components/Workspace/Dashboard/Welcome";
import { Deadline, Note, ProgressDay } from "@/types";

export default function DashboardClient({
  deadlines,
  notes,
  progress,
}: {
  deadlines: Deadline[];
  notes: Note[];
  progress: ProgressDay[];
}) {
  const now = new Date();

  // Get start of the week (Monday) and end of the week (Sunday)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Count notes created this week
  const notesCreatedThisWeek = notes.filter((note) => {
    const created = new Date(note.created_at);
    return created >= startOfWeek && created <= endOfWeek;
  }).length;

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Section */}
      <Welcome deadlines={deadlines} />

      {/* Cards */}
      <Cards noteCount={notes.length} noteCountWeek={notesCreatedThisWeek} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Upcoming Deadlines */}
        <UpcomingDeadlines deadlines={deadlines} />

        {/* Recent Notes */}
        <RecentNotes notes={notes} />
      </div>

      {/* Weekly Progress */}
      <WeeklyProgress progress={progress} />
    </div>
  );
}
