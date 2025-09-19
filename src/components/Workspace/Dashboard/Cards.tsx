import { StatsCard } from "@/components/UI";
import { BookOpen, CheckSquare, Clock, FileText } from "lucide-react";

interface CardsProps {
  noteCount: number;
  noteCountWeek: number;
  assignmentsCount: number;
  assignmentsDueSoon: number;
  taskCountCompleted: number;
  taskCountWeek: number;
  studyHours: number;
  studyHoursWeek: number;
}

export default function Cards({
  noteCount,
  noteCountWeek,
  assignmentsCount,
  assignmentsDueSoon,
  taskCountCompleted,
  taskCountWeek,
  studyHours,
  studyHoursWeek,
}: CardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Notes"
        count={noteCount}
        icon={<FileText className="w-8 h-8 text-yellow-600" />}
        changeText={`${noteCountWeek > 0 ? "+" : ""}${noteCountWeek} this week`}
        changeColor={noteCountWeek > 0 ? "text-green-600" : ""}
      />

      <StatsCard
        title="Assignments"
        count={assignmentsCount}
        icon={<BookOpen className="w-8 h-8 text-orange-600" />}
        changeText={`${assignmentsDueSoon} due soon`}
        changeColor={assignmentsDueSoon > 0 ? "text-red-600" : ""}
      />

      <StatsCard
        title="Completed Tasks"
        count={taskCountCompleted}
        icon={<CheckSquare className="w-8 h-8 text-green-600" />}
        changeText={`${taskCountWeek > 0 ? "+" : ""}${taskCountWeek} this week`}
        changeColor={taskCountWeek > 0 ? "text-green-600" : ""}
      />

      <StatsCard
        title="Study Hours"
        count={`${studyHours}h`}
        icon={<Clock className="w-8 h-8 text-purple-600" />}
        changeText={`+${studyHoursWeek}h this week`}
        changeColor={studyHoursWeek > 0 ? "text-green-600" : ""}
      />
    </div>
  );
}
