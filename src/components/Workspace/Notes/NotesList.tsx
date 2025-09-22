import { Suspense, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NoteCard from "@/components/Workspace/Notes/NoteCard";
import ViewModeToggle from "@/components/Workspace/Notes/ViewModeToggle";
import Searchbar from "@/components/Workspace/Notes/Searchbar";
import { Note, NotesListProps } from "@/types";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/components/UI";
import { usePersistentState } from "@/hooks";

export default function NotesList({ user_id, notes }: NotesListProps) {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = usePersistentState<"grid" | "list">(
    "view-state",
    "grid"
  );

  const { sharedNotes, ownedNotes } = useMemo(() => {
    const shared: Note[] = [];
    const owned: Note[] = [];

    notes.forEach((note) => {
      // Shared if current user is in shared_with OR note is public
      if (
        note.user_id !== user_id &&
        (note.is_public || note.shared_with?.includes(user_id))
      ) {
        shared.push(note);
      } else if (note.user_id === user_id) {
        owned.push(note);
      }
    });

    return { sharedNotes: shared, ownedNotes: owned };
  }, [notes, user_id]);

  // Filter both lists based on search term
  const filteredShared = useMemo(
    () =>
      sharedNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    [sharedNotes, searchTerm]
  );

  const filteredOwned = useMemo(
    () =>
      ownedNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ),
    [ownedNotes, searchTerm]
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
      toast.error("Failed to add note!");

      return;
    }

    router.refresh();
    toast.success("Note added successfully!");
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
    <div className="w-full h-full flex flex-col bg-white dark:bg-neutral-950">
      <div className="p-4 items-center justify-between border-b bg-white dark:bg-neutral-950 hidden sm:flex">
        <h2 className="text-sm sm:text-xl font-bold">Notes</h2>
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
      {filteredShared.length <= 0 ? (
        <div
          className={`flex-1 overflow-y-auto p-4 ${
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
            <div className="text-center text-muted-foreground py-8">
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
      ) : (
        <div className={`flex-1 overflow-y-auto p-4`}>
          <Suspense fallback={<div>Loading notes...</div>}>
            {/* SHARED NOTES */}
            {filteredShared.length > 0 && (
              <Accordion
                type="single"
                defaultValue="shared"
                collapsible
                className="w-full"
              >
                <AccordionItem value="shared">
                  <AccordionTrigger>
                    <span className="font-semibold mb-2 text-muted-foreground">
                      Shared with you
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-min"
                        : "flex flex-col gap-4"
                    }`}
                  >
                    {filteredShared.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        viewMode={viewMode}
                        onToggleFavorite={toggleFavorite}
                        shared={true}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* OWNED NOTES */}
            {filteredOwned.length > 0 && (
              <Accordion
                type="single"
                defaultValue="owned"
                collapsible
                className="w-full"
              >
                <AccordionItem value="owned">
                  <AccordionTrigger>
                    <span className="font-semibold mb-2 text-muted-foreground">
                      Your Notes
                    </span>
                  </AccordionTrigger>
                  <AccordionContent
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-min"
                        : "flex flex-col gap-4"
                    }`}
                  >
                    {filteredOwned.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        viewMode={viewMode}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}

            {/* EMPTY STATE */}
            {filteredShared.length === 0 && filteredOwned.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                No notes found for this view.
              </div>
            )}
          </Suspense>

          {/* FLOATING ADD BUTTON */}
          <div
            className="fixed bottom-16 right-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 shadow-md block sm:hidden"
            onClick={() => addNote(user_id)}
            title="Add Note"
          >
            <Plus className="w-8 h-8" />
          </div>
        </div>
      )}
    </div>
  );
}
