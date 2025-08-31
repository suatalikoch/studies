import { Metadata } from "next";
import { redirect } from "next/navigation";
import TasksClient from "./client";
import { getCurrentUser, getTasks } from "@/lib/supabase/crud";

export const metadata: Metadata = {
  title: "Studies | Tasks",
};

export default async function TasksPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const tasks = await getTasks(user.id);

  return <TasksClient tasksDB={tasks} />;
}
