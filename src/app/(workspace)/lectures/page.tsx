import { Metadata } from "next";
import LecturesClient from "./client";
import { getCurrentUser, getLectures } from "@/lib/supabase/crud";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Studies | Lectures",
};

export default async function LecturesPage() {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  const lectures = await getLectures(user.id);

  return <LecturesClient lecturesDb={lectures} />;
}
