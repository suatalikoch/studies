import { Calendar, AlertTriangle } from "lucide-react";
import { differenceInDays } from "date-fns";
import { AssignmentCardProps } from "@/types";
import { Badge } from "@/components/UI";

export default function AssignmentCard({
  assignment,
  onClick,
}: AssignmentCardProps) {
  const daysLeft = differenceInDays(new Date(assignment.due_date), new Date());
  const isOverdue = daysLeft < 0;

  return (
    <div
      id={assignment.id}
      onClick={onClick}
      className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400 hover:shadow-md p-4 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
          {assignment.title}
        </h3>
        <AlertTriangle
          className={`w-4 h-4 ml-2 ${
            isOverdue ? "text-red-500" : "text-yellow-500"
          }`}
        />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {assignment.subject}
      </p>
      <div className="flex items-center justify-between mb-2">
        <Badge
          variant="secondary"
          className={`transition-colors ${
            assignment.status === "Not Started"
              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
              : assignment.status === "In Progress"
              ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
              : assignment.status === "Completed"
              ? "bg-green-100 text-green-600 hover:bg-green-200"
              : ""
          }`}
        >
          {assignment.status}
        </Badge>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          {assignment.priority}
        </Badge>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{new Date(assignment.due_date).toLocaleDateString()}</span>
        </div>
        <span className="font-medium text-gray-600 dark:text-gray-300">
          {daysLeft < 0
            ? Math.abs(daysLeft) + " days overdue"
            : daysLeft + " days left"}
        </span>
      </div>
    </div>
  );
}
