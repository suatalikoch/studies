import AssignmentDetails from "@/components/Workspace/Assignments/AssignmentDetails";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Assignment({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: assignment } = await supabase
    .from("assignments")
    .select("*")
    .eq("id", id)
    .single();

  if (!assignment) return notFound();

  return <AssignmentDetails assignment={assignment} />;
}
