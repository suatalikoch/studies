"use client";

import Cards from "@/components/Workspace/Dashboard/Cards";
import RecentNotes from "@/components/Workspace/Dashboard/RecentNotes";
import UpcomingDeadlines from "@/components/Workspace/Dashboard/UpcomingDeadlines";
import WeeklyProgress from "@/components/Workspace/Dashboard/WeeklyProgress";
import Welcome from "@/components/Workspace/Dashboard/Welcome";
import { Assignment, Deadline, Note, ProgressDay, Task } from "@/types";
import { Suspense } from "react";

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

  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const notesCreatedThisWeek = notes.filter((note) => {
    const created = new Date(note.created_at);
    return created >= startOfWeek && created <= endOfWeek;
  }).length;

  const soonThreshhold = new Date();
  soonThreshhold.setDate(now.getDate() + 7);
  soonThreshhold.setHours(23, 59, 59, 999);

  const assignmentsDueSoon = assignments.filter((assignment) => {
    const due = new Date(assignment.due_date);
    return due >= now && due <= soonThreshhold;
  }).length;

  const taskCountCompleted = tasks.filter((task) => task.completed).length;

  const tasksCreatedThisWeek = tasks.filter((task) => {
    const created = new Date(task.created_at);
    return created >= startOfWeek && created <= endOfWeek;
  }).length;

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
