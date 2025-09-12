import { Note } from "@/types";
import { createClient } from "@/lib/supabase/server";

export async function getNotes(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch notes");
  }

  return data;
}

export async function createNote(note: Omit<Note, "id">) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("notes").insert(note).select();

  if (error) {
    throw new Error("Failed to create note");
  }

  return data[0];
}

export async function updateNote(note: Partial<Note>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notes")
    .update(note)
    .eq("id", note.id)
    .select();

  if (error) {
    throw new Error("Failed to update note");
  }

  return data[0];
}

export async function deleteNote(noteId: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .select();

  if (error) {
    throw new Error("Failed to delete note");
  }

  return data[0];
}
