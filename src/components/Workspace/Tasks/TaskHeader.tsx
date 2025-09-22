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
    <div className="p-4 items-center justify-between border-b bg-white dark:bg-neutral-950 hidden sm:flex">
      <h2 className="text-xl font-bold">Tasks</h2>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Funnel className="w-5 h-5 text-muted-foreground" />
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
  );
}
