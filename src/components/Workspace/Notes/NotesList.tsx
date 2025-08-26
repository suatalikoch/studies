import { Button } from "@/components/UI";
import { useMemo } from "react";
import NoteCard from "./NoteCard";
import { useNotes } from "./NotesContext";
import ViewModeToggle from "./ViewModeToggle";
import Searchbar from "./Searchbar";

export const NotesList = ({ user_id }: { user_id: string }) => {
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
      <div className="p-4 flex items-center justify-between border-b bg-white">
        <h2 className="text-xl font-bold text-gray-900">Notes</h2>
        <div className="flex items-center gap-2">
          <Searchbar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search notes..."
          />
          <Button onClick={() => addNote(user_id)}>+ Add</Button>
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      <div
        className={`flex-1 overflow-y-auto p-4 ${
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
      </div>
    </div>
  );
};
