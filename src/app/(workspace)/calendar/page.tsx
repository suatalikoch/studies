import { Metadata } from "next";
import CalendarClient from "./client";
import { redirect } from "next/navigation";
import { getCurrentUser, getExams } from "@/lib/supabase/crud";

export const metadata: Metadata = {
  title: "Studies | Calendar",
};

export default async function CalendarPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const exams = await getExams(user.id);

  return <CalendarClient exams={exams} />;
}
