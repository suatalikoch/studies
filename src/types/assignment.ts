export interface Assignment {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  status: string;
  priority: string;
  due_date: string;
  updated_at: string;
  created_at: string;
}

export type AssignmentFormState = {
  title: string;
  subject: string;
  status: string;
  priority: string;
  due_date: string;
};
