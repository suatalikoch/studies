import React from "react";
import { Badge } from "@/components/UI";
import { TaskCardProps } from "@/types";
import { Square, SquareCheck, Star, Trash } from "lucide-react";

export const TaskCard = React.memo(function TaskCard({
  task,
  onToggleTask,
  onStarTask,
  onDeleteTask,
}: TaskCardProps) {
  return (
    <div
      key={task.id}
      className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start space-x-4">
        <button
          onClick={() => onToggleTask(task.id)}
          className={`mt-1 ${
            task.completed
              ? "text-green-600"
              : "text-gray-400 hover:text-green-600"
          }`}
          aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        >
          {task.completed ? (
            <SquareCheck className="w-5 h-5" />
          ) : (
            <Square className="w-5 h-5" />
          )}
        </button>
        <div className="flex-1">
          <div className="flex justify-between">
            <h3
              className={`font-semibold ${
                task.completed
                  ? "text-gray-400 dark:text-gray-500 line-through"
                  : "text-gray-900 dark:text-gray-100"
              }`}
            >
              {task.title}
            </h3>
            <div className="flex gap-3 items-center">
              <Badge
                className={`${
                  task.completed
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </Badge>
              <button
                onClick={() => onStarTask(task.id)}
                className={`text-gray-400 hover:text-yellow-500 cursor-pointer ${
                  task.starred ? "text-yellow-500" : ""
                }`}
                aria-label={task.starred ? "Unstar task" : "Star task"}
              >
                <Star className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDeleteTask(task.id)}
                className="text-gray-400 hover:text-red-600 cursor-pointer"
                aria-label="Delete task"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            {!task.description && (
              <p className="text-xs text-gray-400 mt-1">No content available</p>
            )}
          </div>
          <div className="flex justify-between items-center flex-wrap mt-2">
            <div className="flex gap-3">
              <Badge variant="secondary">{task.category}</Badge>
              <Badge
                className={`${
                  task.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : task.priority === "medium"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-lime-100 text-lime-800"
                }`}
              >
                {task.priority === "high"
                  ? "High"
                  : task.priority === "medium"
                  ? "Medium"
                  : "Low"}
              </Badge>
              {task.starred && (
                <div className="flex flex-row items-center gap-1">
                  <Badge className="bg-amber-50 text-amber-700">
                    <Star className="w-4 h-4" />
                    <p>Starred</p>
                  </Badge>
                </div>
              )}
            </div>
            <div>
              {task.due_date && (
                <span className="flex gap-1">
                  <Badge variant="secondary">Due:</Badge>
                  <Badge variant="secondary">
                    {new Date(task.due_date).toLocaleDateString()}
                  </Badge>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
