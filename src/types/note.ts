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

export interface ViewModeToggleProps {
  viewMode: "list" | "grid";
  setViewMode: (mode: "list" | "grid") => void;
}

export interface SearchbarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
