import { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardClient from "./client";
import {
  getAssignments,
  getCurrentUser,
  getDeadlines,
  getNotesByUserId,
  getProgress,
  getTasks,
} from "@/lib/supabase/crud";

export const metadata: Metadata = {
  title: "Studies | Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const [deadlines, notes, assignments, tasks, progress] = await Promise.all([
    getDeadlines(user.id),
    getNotesByUserId(user.id),
    getAssignments(user.id),
    getTasks(user.id),
    getProgress(user.id),
  ]);

  return (
    <DashboardClient
      deadlines={deadlines}
      notes={notes}
      assignments={assignments}
      tasks={tasks}
      progress={progress}
    />
  );
}
