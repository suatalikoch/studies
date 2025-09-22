import { Metadata } from "next";
import { getCurrentUser, getExams } from "@/lib/supabase/crud";
import { redirect } from "next/navigation";
import RevisionSessionClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Revision",
};

export default async function RevisionPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const exams = await getExams(user.id);

  return <RevisionSessionClient examsDb={exams} />;
}
