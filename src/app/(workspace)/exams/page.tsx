import { Metadata } from "next";
import ExamsClient from "./client";
import { getCurrentUser, getExams } from "@/lib/supabase/crud";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Studies | Exams",
};

export default async function ExamsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const exams = await getExams(user.id);

  return <ExamsClient examsDB={exams} />;
}
