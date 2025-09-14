import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NoteCard from "@/components/Workspace/Notes/NoteCard";
import ViewModeToggle from "@/components/Workspace/Notes/ViewModeToggle";
import Searchbar from "@/components/Workspace/Notes/Searchbar";
import { Note, NotesListProps } from "@/types";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Plus } from "lucide-react";
import { Button } from "@/components/UI";
import { usePersistentState } from "@/hooks";

export default function NotesList({ user_id, notes }: NotesListProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = usePersistentState<"grid" | "list">(
    "view-state",
    "grid"
  );

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    [notes, searchTerm]
  );

  const addNote = async (user_id: string) => {
    const newNote: Omit<Note, "id"> = {
      user_id,
      title: "Untitled Note",
      subject: "General",
      content: "",
      tags: [],
      status: "draft",
      priority: 3,
      is_favourite: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      color: "#fef3c7",
      is_public: false,
      shared_with: [],
    };

    const { error } = await createClient()
      .from("notes")
      .insert([newNote])
      .select();

    if (error) {
      toast.error("Failed to add note!", {
        duration: 5000,
        position: "bottom-right",
        richColors: true,
        closeButton: true,
        action: {
          label: "Close",
          onClick: () => console.log("Closed toast."),
        },
      });

      return;
    }

    router.refresh();

    toast.success("Note added successfully!", {
      duration: 5000,
      position: "bottom-right",
      richColors: true,
      closeButton: true,
      action: {
        label: "Close",
        onClick: () => console.log("Closed toast."),
      },
    });
  };

  const toggleFavorite = async (id: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, is_favourite: !note.is_favourite } : note
    );

    const noteToUpdate = updatedNotes.find((n) => n.id === id);
    if (!noteToUpdate) return;

    const { error } = await createClient()
      .from("notes")
      .update({ is_favourite: noteToUpdate.is_favourite })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update favorite!");
    } else {
      router.refresh();

      toast.success(
        noteToUpdate.is_favourite
          ? "Marked as favorite!"
          : "Removed from favorites!"
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 items-center justify-between border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-950 hidden sm:flex">
        <h2 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-gray-100">
          Notes
        </h2>
        <div className="flex items-center gap-2">
          <Searchbar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search notes..."
          />
          <Button onClick={() => addNote(user_id)}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800 ${
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-min"
            : "flex flex-col gap-4"
        }`}
      >
        <Suspense fallback={<div>Loading notes...</div>}>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              viewMode={viewMode}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </Suspense>
        {filteredNotes.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No notes found for this view.
          </div>
        )}
        <div
          className="fixed bottom-16 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-md block sm:hidden"
          onClick={() => addNote(user_id)}
          title="Add Note"
        >
          <Plus className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
