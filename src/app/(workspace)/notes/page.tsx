import { Metadata } from "next";
import { redirect } from "next/navigation";
import NotesClient from "./client";
import { getCurrentUser, getNotes } from "@/lib/supabase/crud";

export const metadata: Metadata = {
  title: "Studies | Notes",
};

export default async function NotesPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const notes = await getNotes(user.id);

  return <NotesClient user_id={user.id} notes={notes} />;
}
