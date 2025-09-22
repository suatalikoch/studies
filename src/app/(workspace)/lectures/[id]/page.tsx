import LectureDetails from "@/components/Workspace/Lectures/LectureDetails";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Lecture({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: lecture } = await supabase
    .from("lectures")
    .select("*")
    .eq("id", id)
    .single();

  if (!lecture) return notFound();

  return <LectureDetails lecture={lecture} />;
}
