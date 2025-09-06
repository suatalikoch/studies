import { Metadata } from "next";
import AssignmentsClient from "./client";
import { redirect } from "next/navigation";
import { getAssignments, getCurrentUser } from "@/lib/supabase/crud";

export const metadata: Metadata = {
  title: "Studies | Assignments",
};

export default async function AssignmentsPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const assignments = await getAssignments(user.id);

  return <AssignmentsClient assignmentsDb={assignments} />;
}
