"use client";

import { Note } from "@/types";
import NotesList from "@/components/Workspace/Notes/NotesList";

export default function NotesClient({
  user_id,
  notes,
}: {
  user_id: string;
  notes: Note[];
}) {
  return <NotesList user_id={user_id} notes={notes} />;
}
