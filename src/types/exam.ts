export interface Exam {
  id: string;
  user_id: string;
  subject: string;
  date: string;
  location: string;
  status: "upcoming" | "completed";
  updated_at: string;
  created_at: string;
}
