export interface Assignment {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  status: AssignmentStatus;
  priority: string;
  due_date: string;
  updated_at: string;
  created_at: string;
}

export type AssignmentFormState = {
  title: string;
  subject: string;
  status: AssignmentStatus;
  priority: string;
  due_date: string;
};

export type AssignmentStatus = "Not Started" | "In Progress" | "Completed";
export type AssignmentFilter =
  | "all"
  | "not-started"
  | "in-progress"
  | "completed";

export interface AssignmentCardProps {
  assignment: Assignment;
  onClick: () => void;
}

export interface AssignmentDetailsProps {
  assignment: Assignment;
}

export interface AssignmentFormProps {
  user: { id: string } | null;
  onAdd: (assignment: Assignment) => void;
  onCancel: () => void;
}

export interface AssignmentsHeaderProps {
  showDetails: boolean;
  showForm: boolean;
  onToggleForm: () => void;
  onBack: () => void;
  filter: string;
  setFilter: (value: string) => void;
}

export interface AssignmentsListProps {
  assignments: Assignment[];
  onSelect: (assignment: Assignment) => void;
}
