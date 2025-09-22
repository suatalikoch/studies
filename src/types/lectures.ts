export interface Lecture {
  id: string;
  user_id: string;
  title: string;
  subject: string;
  professor: string;
  date: string;
  duration?: string;
  type: LectureType;
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
  duration?: string;
  type: LectureType;
  tags?: string[];
  attended: boolean;
  checked: boolean;
};

export type LectureType = "Live" | "Recorded" | "Seminar";
export type LectureFilter =
  | "all"
  | "math"
  | "science"
  | "history"
  | "live"
  | "recorded"
  | "seminar";

export interface LectureCardProps {
  lecture: Lecture;
}

export interface LectureDetailsProps {
  lecture: Lecture;
}

export interface LectureFormProps {
  user: { id: string } | null;
  onAdd: (assignment: Lecture) => void;
  onCancel: () => void;
}

export interface LecturesHeaderProps {
  showDetails: boolean;
  showForm: boolean;
  onToggleForm: () => void;
  onBack: () => void;
  subjectFilter: LectureFilter;
  setSubjectFilter: (value: LectureFilter) => void;
  typeFilter: LectureFilter;
  setTypeFilter: (value: LectureFilter) => void;
}

export interface LecturesListProps {
  lectures: Lecture[];
}
