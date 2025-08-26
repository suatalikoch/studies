export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  priority: TaskPriority;
  category: Category;
  due_date?: string | null;
  completed: boolean;
  starred: boolean;
  updated_at: string;
  created_at: string;
}

export type FormState = {
  title: string;
  description: string;
  priority: TaskPriority;
  category: Category;
  due_date: string;
};

export type TaskPriority = "low" | "medium" | "high";
export type Category = "Work" | "Personal" | "Shopping" | "Other";
export type Filter =
  | "all"
  | "pending"
  | "completed"
  | "starred"
  | "high-priority";
