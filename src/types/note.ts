export interface Note {
  id: number;
  user_id: string;
  title: string;
  subject: string;
  content?: string | null;
  tags?: string[] | null;
  status: "draft" | "published" | "archived";
  priority: 1 | 2 | 3 | 4 | 5;
  is_favourite: boolean;
  updated_at: string;
  created_at: string;
}
