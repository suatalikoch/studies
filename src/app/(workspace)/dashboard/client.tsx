"use client";

import { Suspense } from "react";
import {
  addDays,
  endOfDay,
  endOfWeek,
  isWithinInterval,
  startOfWeek,
} from "date-fns";
import { Assignment, Deadline, Note, ProgressDay, Task } from "@/types";
import Cards from "@/components/Workspace/Dashboard/Cards";
import RecentNotes from "@/components/Workspace/Dashboard/RecentNotes";
import UpcomingDeadlines from "@/components/Workspace/Dashboard/UpcomingDeadlines";
import WeeklyProgress from "@/components/Workspace/Dashboard/WeeklyProgress";
import Welcome from "@/components/Workspace/Dashboard/Welcome";

export default function DashboardClient({
  deadlines,
  notes,
  assignments,
  tasks,
  progress,
}: {
  deadlines: Deadline[];
  notes: Note[];
  assignments: Assignment[];
  tasks: Task[];
  progress: ProgressDay[];
}) {
  const now = new Date();

  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const notesCreatedThisWeek = notes.filter((note) =>
    isWithinInterval(new Date(note.created_at), {
      start: weekStart,
      end: weekEnd,
    })
  ).length;

  const soonThreshold = endOfDay(addDays(now, 7));

  const assignmentsDueSoon = assignments.filter((assignment) =>
    isWithinInterval(new Date(assignment.due_date), {
      start: now,
      end: soonThreshold,
    })
  ).length;

  const taskCountCompleted = tasks.filter((task) => task.completed).length;

  const tasksCreatedThisWeek = tasks.filter((task) =>
    isWithinInterval(new Date(task.created_at), {
      start: weekStart,
      end: weekEnd,
    })
  ).length;

  const totalStudyHours = 32;
  const weekStudyHours = 5;

  return (
    <div className="p-4 space-y-4">
      <Welcome deadlinesCount={deadlines.length} />
      <Cards
        noteCount={notes.length}
        noteCountWeek={notesCreatedThisWeek}
        assignmentsCount={assignments.length}
        assignmentsDueSoon={assignmentsDueSoon}
        taskCountCompleted={taskCountCompleted}
        taskCountWeek={tasksCreatedThisWeek}
        studyHours={totalStudyHours}
        studyHoursWeek={weekStudyHours}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading deadlines...</div>}>
          <UpcomingDeadlines deadlines={deadlines} />
        </Suspense>
        <Suspense fallback={<div>Loading notes...</div>}>
          <RecentNotes notes={notes} />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading progress...</div>}>
        <WeeklyProgress progress={progress} />
      </Suspense>
    </div>
  );
}
