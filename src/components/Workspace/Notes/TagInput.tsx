import { Badge, Input, Label } from "@/components/UI";
import { Note } from "@/types";
import { useNotes } from "./NotesContext";

export default function TagInput({ note }: { note: Note }) {
  const { setSelectedNote } = useNotes();

  const addTag = (tag: string) => {
    if (!(note.tags ?? []).includes(tag)) {
      setSelectedNote({ ...note, tags: [...(note.tags ?? []), tag] });
    }
  };

  const removeTag = (tag: string) => {
    setSelectedNote({
      ...note,
      tags: (note.tags ?? []).filter((t) => t !== tag),
    });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Label>Tags:</Label>
      {note.tags?.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="cursor-pointer"
          onClick={() => removeTag(tag)}
        >
          {tag} &times;
        </Badge>
      ))}
      <Input
        placeholder="Add tag"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value.trim()) {
            addTag(e.currentTarget.value.trim().toLowerCase());
            e.currentTarget.value = "";
          }
        }}
        className="w-32"
      />
    </div>
  );
}
