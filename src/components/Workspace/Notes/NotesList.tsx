import { useMemo } from "react";
import { Plus } from "lucide-react";
import { NotesListProps } from "@/types";
import { Button } from "@/components/UI";
import NoteCard from "./NoteCard";
import { useNotes } from "./NotesContext";
import ViewModeToggle from "./ViewModeToggle";
import Searchbar from "./Searchbar";

export const NotesList = ({ user_id }: NotesListProps) => {
  const {
    notes,
    viewMode,
    searchTerm,
    setSelectedNote,
    addNote,
    toggleFavorite,
    setViewMode,
    setSearchTerm,
  } = useNotes();

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags?.some((tag) => tag.includes(searchTerm.toLowerCase()))
      ),
    [notes, searchTerm]
  );

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
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            viewMode={viewMode}
            onSelect={setSelectedNote}
            onToggleFavorite={toggleFavorite}
          />
        ))}
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
};
