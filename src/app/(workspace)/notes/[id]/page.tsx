import NotesEditor from "@/components/Workspace/Notes/NoteEditor";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Note({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: note } = await supabase
    .from("notes")
    .select("*")
    .eq("id", id)
    .single();

  if (!note) return notFound();

  return <NotesEditor note={note} />;
}
