import { Metadata } from "next";
import {
  getCurrentUser,
  getDeadlines,
  getNotes,
  getProgress,
} from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const deadlines = await getDeadlines(user.id);
  const notes = await getNotes(user.id);
  const progress = await getProgress(user.id);

  return (
    <DashboardClient deadlines={deadlines} notes={notes} progress={progress} />
  );
}
