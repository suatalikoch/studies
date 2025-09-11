export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  priority: TaskPriority;
  category: TaskCategory;
  due_date?: string | null;
  completed: boolean;
  starred: boolean;
  updated_at: string;
  created_at: string;
}

export type TaskFormState = {
  title: string;
  description: string;
  priority: TaskPriority;
  category: TaskCategory;
  due_date: string;
};

export type TaskPriority = "low" | "medium" | "high";
export type TaskCategory = "Work" | "Personal" | "Shopping" | "Other";
export type TaskFilter =
  | "all"
  | "pending"
  | "completed"
  | "starred"
  | "high-priority";

export interface TaskCardProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onStarTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export interface TaskFormProps {
  user: { id: string } | null;
  onAdd: (assignment: Task) => void;
  onCancel: () => void;
}

export interface TasksHeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
  filter: TaskFilter;
  setFilter: (value: TaskFilter) => void;
}

export interface TasksListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onStar: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface TasksInfoProps {
  totalTasks: number;
  completedCount: number;
  pendingCount: number;
  highPriorityCount: number;
}
