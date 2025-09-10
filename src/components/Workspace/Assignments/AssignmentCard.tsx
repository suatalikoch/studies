import { Assignment } from "@/types";
import { Calendar, AlertTriangle } from "lucide-react";
import { differenceInDays } from "date-fns";

export default function AssignmentCard({
  assignment,
  onClick,
}: {
  assignment: Assignment;
  onClick: () => void;
}) {
  const daysLeft = differenceInDays(new Date(assignment.due_date), new Date());

  return (
    <div
      id={assignment.id}
      onClick={onClick}
      className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-400 hover:shadow-md p-4 cursor-pointer transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
          {assignment.title}
        </h3>
        <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {assignment.subject}
      </p>
      <div className="flex items-center justify-between mb-2">
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
          {assignment.status}
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {assignment.priority}
        </span>
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
