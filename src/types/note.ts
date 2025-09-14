export interface Note {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  content?: string | null;
  tags?: string[] | null;
  status: Status;
  priority: NotePriority;
  is_favourite: boolean;
  updated_at: string;
  created_at: string;
  color?: string;
  is_public: boolean;
  shared_with: string[];
}

export type Status = "draft" | "published" | "archived";
export type NotePriority = 1 | 2 | 3 | 4 | 5;

export interface NoteCardProps {
  note: Note;
  viewMode: "list" | "grid";
  onToggleFavorite: (id: string) => void;
}

export interface NoteEditorProps {
  note: Note;
}

export interface NotesListProps {
  user_id: string;
  notes: Note[];
}

export interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface TagInputProps {
  note: Note;
  setNote: (note: Note) => void;
}

export interface ViewModeToggleProps {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
}
