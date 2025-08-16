import { Metadata } from "next";
import { getCurrentUser, getTasks } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import TasksClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Tasks",
};

export default async function Tasks() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const tasks = await getTasks(user.id);

  return <TasksClient tasksDB={tasks} />;
}
