import { TasksListProps } from "@/types";
import { TaskCard } from "./TaskCard";

export default function TasksList({
  tasks,
  onToggle,
  onStar,
  onDelete,
}: TasksListProps) {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-4 pb-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleTask={() => onToggle(task.id)}
          onStarTask={() => onStar(task.id)}
          onDeleteTask={() => onDelete(task.id)}
        />
      ))}
      {tasks.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No tasks found for this view.
        </div>
      )}
    </div>
  );
}
