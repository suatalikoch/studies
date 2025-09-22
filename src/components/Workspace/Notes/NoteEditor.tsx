"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import MarkdownRenderer from "@/components/Workspace/Notes/Markdown";
import TagInput from "@/components/Workspace/Notes/TagInput";
import { Note, NoteEditorProps } from "@/types";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Input,
  Textarea,
} from "@/components/UI";

export default function NoteEditor({ note }: NoteEditorProps) {
  const router = useRouter();

  const [editingNote, setEditingNote] = useState<Note>({ ...note });
  const [isEditing, setIsEditing] = useState(false);
  const [history, setHistory] = useState<Record<string, Note[]>>({});
  const [future, setFuture] = useState<Record<string, Note[]>>({});

  const save = async () => {
    setHistory((prev) => ({
      ...prev,
      [editingNote.id]: [...(prev[editingNote.id] || []), editingNote],
    }));

    setFuture((prev) => ({ ...prev, [editingNote.id]: [] }));

    const updatedNote = {
      ...editingNote,
      updated_at: new Date().toISOString(),
    };

    setIsEditing(false);

    await createClient()
      .from("notes")
      .update(updatedNote)
      .eq("id", updatedNote.id);

    toast.success("Note saved successfully!");
  };

  const undo = () => {
    if (!history[editingNote.id] || history[editingNote.id].length === 0)
      return;

    const prevHistory = history[editingNote.id];
    const prevVersion = prevHistory[prevHistory.length - 1];

    setHistory((prev) => ({
      ...prev,
      [editingNote.id]: prev[editingNote.id].slice(0, -1),
    }));

    setFuture((prev) => ({
      ...prev,
      [editingNote.id]: [editingNote, ...(prev[editingNote.id] || [])],
    }));

    setEditingNote(prevVersion);

    toast.success("Undo applied!");
  };

  const redo = () => {
    if (!future[editingNote.id] || future[editingNote.id].length === 0) return;

    const nextVersion = future[editingNote.id][0];

    setFuture((prev) => ({
      ...prev,
      [editingNote.id]: prev[editingNote.id].slice(1),
    }));

    setHistory((prev) => ({
      ...prev,
      [editingNote.id]: [...(prev[editingNote.id] || []), editingNote],
    }));

    setEditingNote(nextVersion);

    toast.success("Redo applied!");
  };

  const deleteNote = async () => {
    const { error } = await createClient()
      .from("notes")
      .delete()
      .eq("id", editingNote.id);

    if (error) {
      toast.error("Failed to delete note!");

      return;
    }

    router.push("/notes");

    toast.success("Note deleted successfully!");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950">
      <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white dark:bg-neutral-950 z-10">
        <Button
          variant="outline"
          onClick={() => {
            if (isEditing && !confirm("Discard unsaved changes?")) {
              return;
            }

            const searchParams = new URLSearchParams(window.location.search);
            const from = searchParams.get("from");

            if (from) {
              router.back();
            } else {
              router.push("/notes");
            }
          }}
        >
          <ChevronLeft />
          Back
        </Button>
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          ) : (
            <>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
              <Button onClick={undo} variant="outline">
                Undo
              </Button>
              <Button onClick={redo} variant="outline">
                Redo
              </Button>
              <Button onClick={save}>Save</Button>
            </>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete note?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your note will be permanently
                  deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={deleteNote}>
                  Delete
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto flex flex-col gap-4">
        {isEditing ? (
          <Input
            value={editingNote.title}
            onChange={(e) =>
              setEditingNote({ ...editingNote, title: e.target.value })
            }
            className="text-2xl font-bold"
          />
        ) : (
          <h1 className="text-2xl font-bold">{editingNote?.title}</h1>
        )}
        {isEditing ? (
          <Input
            value={editingNote.subject}
            onChange={(e) =>
              setEditingNote({ ...editingNote, subject: e.target.value })
            }
            className="text-2xl"
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            {editingNote?.subject}
          </p>
        )}
        {!isEditing ? (
          <MarkdownRenderer content={editingNote.content || ""} />
        ) : (
          <Textarea
            value={editingNote.content || ""}
            onChange={(e) =>
              setEditingNote({ ...editingNote, content: e.target.value })
            }
            className="flex-1 resize-note"
          />
        )}
        {isEditing && <TagInput note={editingNote} setNote={setEditingNote} />}
      </div>
    </div>
  );
}
