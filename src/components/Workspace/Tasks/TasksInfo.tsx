import { TasksInfoProps } from "@/types";
import { Check, Clock, Flag, SquareCheck } from "lucide-react";

export default function TasksInfo({
  totalTasks,
  completedCount,
  pendingCount,
  highPriorityCount,
}: TasksInfoProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Total Tasks
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {totalTasks}
            </p>
          </div>
          <SquareCheck className="w-7 sm:w-8 h-7 sm:h-8 text-indigo-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Completed
            </p>
            <p className="text-2xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
          <Check className="w-7 sm:w-8 h-7 sm:h-8 text-green-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Pending
            </p>
            <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <Clock className="w-7 sm:w-8 h-7 sm:h-8 text-yellow-600" />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
              High Priority
            </p>
            <p className="text-2xl font-bold text-red-600">
              {highPriorityCount}
            </p>
          </div>
          <Flag className="w-7 sm:w-8 h-7 sm:h-8 text-red-600" />
        </div>
      </div>
    </div>
  );
}
