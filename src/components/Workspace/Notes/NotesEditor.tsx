import { Button, Input, Textarea } from "@/components/UI";
import MarkdownRenderer from "./Markdown";
import { useNotes } from "./NotesContext";
import TagInput from "./TagInput";
import { ChevronLeft } from "lucide-react";

export default function NotesEditor() {
  const {
    selectedNote,
    setSelectedNote,
    isEditing,
    setIsEditing,
    saveNote,
    deleteNote,
    undo,
    redo,
  } = useNotes();

  if (!selectedNote) return null;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950">
      <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white dark:bg-gray-950 z-10">
        <Button
          variant="outline"
          onClick={() => {
            if (isEditing && !confirm("Discard unsaved changes?")) {
              return;
            }
            setSelectedNote(null);
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
              <Button onClick={() => undo(selectedNote.id)} variant="outline">
                Undo
              </Button>
              <Button onClick={() => redo(selectedNote.id)} variant="outline">
                Redo
              </Button>
              <Button onClick={() => saveNote(selectedNote)}>Save</Button>
            </>
          )}
          <Button
            variant="destructive"
            onClick={() => deleteNote(selectedNote.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-auto flex flex-col gap-4">
        {isEditing ? (
          <Input
            value={selectedNote.title}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, title: e.target.value })
            }
            className="text-2xl font-bold"
          />
        ) : (
          <h1 className="text-2xl font-bold">{selectedNote?.title}</h1>
        )}
        {isEditing ? (
          <Input
            value={selectedNote.subject}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, subject: e.target.value })
            }
            className="text-2xl"
          />
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {selectedNote?.subject}
          </p>
        )}
        {!isEditing ? (
          <MarkdownRenderer
            content={selectedNote.content ? selectedNote.content : ""}
          />
        ) : (
          <Textarea
            value={selectedNote.content ? selectedNote.content : ""}
            onChange={(e) =>
              setSelectedNote({ ...selectedNote, content: e.target.value })
            }
            className="flex-1 resize-note"
          />
        )}
        {isEditing && <TagInput note={selectedNote} />}
      </div>
    </div>
  );
}
