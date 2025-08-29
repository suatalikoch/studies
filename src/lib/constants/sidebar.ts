import {
  Book,
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  GraduationCap,
  Home,
  PenTool,
} from "lucide-react";

export const sidebarItems = [
  { id: "dashboard", path: "dashboard", label: "Dashboard", icon: Home },
  { id: "notes", path: "notes", label: "Notes", icon: FileText },
  { id: "lectures", path: "lectures", label: "Lectures", icon: Book },
  {
    id: "assignments",
    path: "assignments",
    label: "Assignments",
    icon: BookOpen,
  },
  { id: "tasks", path: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "calendar", path: "calendar", label: "Calendar", icon: Calendar },
  { id: "exams", path: "exams", label: "Exams", icon: GraduationCap },
  {
    id: "drawing",
    path: "drawing-board",
    label: "Drawing Board",
    icon: PenTool,
  },
];
