import { TaskFilter, TasksHeaderProps } from "@/types";
import { Funnel, Plus } from "lucide-react";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI";

export default function TasksHeader({
  showForm,
  onToggleForm,
  filter,
  setFilter,
}: TasksHeaderProps) {
  return (
    <div className="p-4 items-center justify-between border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-950 hidden sm:flex">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Tasks
      </h2>
      <div>
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <Funnel className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value as TaskFilter)}
              defaultValue="all"
            >
              <SelectTrigger>
                <SelectValue placeholder="All Tasks" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="starred">Starred</SelectItem>
                  <SelectItem value="high-priority">High Priority</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={onToggleForm}>
            {showForm ? (
              "Cancel"
            ) : (
              <>
                <Plus />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
