export interface Deadline {
  id: number;
  title: string;
  subject: string;
  due_date: string;
  priority: "high" | "medium" | "low";
}
