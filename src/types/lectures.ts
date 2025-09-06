export interface Lecture {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  professor: string;
  date: string;
  duration: string;
  type: "Live" | "Recorded" | "Seminar";
  tags?: string[];
  attended: boolean;
  checked: boolean;
  updated_at: string;
  created_at: string;
}

export type LectureFormState = {
  title: string;
  subject: string;
  professor: string;
  date: string;
  duration: string;
  type: "Live" | "Recorded" | "Seminar";
  tags?: string[];
  attended: boolean;
  checked: boolean;
};
