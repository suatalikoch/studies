import { Metadata } from "next";
import { redirect } from "next/navigation";
import DashboardClient from "./client";
import {
  getCurrentUser,
  getDeadlines,
  getNotes,
  getProgress,
} from "@/lib/supabase/crud";

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
