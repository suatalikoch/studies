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
}

export type Status = "draft" | "published" | "archived";
export type NotePriority = 1 | 2 | 3 | 4 | 5;

export interface NoteCardProps {
  note: Note;
  viewMode: "list" | "grid";
  onSelect: (note: Note) => void;
  onToggleFavorite: (id: string) => void;
}

export type NotesContextType = {
  notes: Note[];
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  addNote: (user_id: string) => Promise<void>;
  saveNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => void;
  undo: (id: string) => void;
  redo: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
};

export interface NotesListProps {
  user_id: string;
}

export interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface TagInputProps {
  note: Note;
}

export interface ViewModeToggleProps {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
}
