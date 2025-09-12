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
  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      <NotesList user_id={user_id} notes={notes} />
    </div>
  );
}
