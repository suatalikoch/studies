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
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <Welcome deadlines={deadlines} />

      {/* Cards */}
      <Cards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
