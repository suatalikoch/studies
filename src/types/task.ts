export interface Task {
  id: number;
  title: string;
  description?: string | null;
  priority: Priority;
  category: Category;
  due_date?: string | null;
  completed: boolean;
  starred: boolean;
  created_at: string;
  updated_at: string;
}

export type FormState = {
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  due_date: string;
};

export type Priority = "low" | "medium" | "high";

export type Category = "Work" | "Personal" | "Shopping" | "Other";

export type Filter =
  | "all"
  | "pending"
  | "completed"
  | "starred"
  | "high-priority";
