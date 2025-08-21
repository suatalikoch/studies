"use client";

import { Note } from "@/types";
import { NotesProvider } from "@/components/Workspace/Notes/NotesContext";
import NotesEditor from "@/components/Workspace/Notes/NotesEditor";
import { useNotes } from "@/components/Workspace/Notes/NotesContext";
import Toast from "@/components/Workspace/Notes/Toast";
import { useToast } from "@/hooks/useToast";
import { NotesList } from "@/components/Workspace/Notes/NotesList";
import { useEffect } from "react";

function NotesInner({ user_id }: { user_id: string }) {
  const { selectedNote, undo, redo } = useNotes();
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedNote) return;

      // Ctrl+Z => Undo
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo(selectedNote.id);
      }

      // Ctrl+Shift+Z => Redo
      if ((e.ctrlKey || e.metaKey) && e.key === "y" && !e.shiftKey) {
        e.preventDefault();
        redo(selectedNote.id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedNote, undo, redo]);

  return (
    <div className="h-full w-full bg-gray-50 flex flex-col">
      {!selectedNote && <NotesList user_id={user_id} />}
      {selectedNote && <NotesEditor />}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}

export default function NotesClient({
  user_id,
  notes,
}: {
  user_id: string;
  notes: Note[];
}) {
  return (
    <NotesProvider initialNotes={notes}>
      <NotesInner user_id={user_id} />
    </NotesProvider>
  );
}
