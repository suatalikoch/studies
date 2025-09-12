import { AssignmentFilter, AssignmentsHeaderProps } from "@/types";
import { ChevronLeft, Funnel, Plus } from "lucide-react";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI";

export default function AssignmentsHeader({
  showDetails,
  showForm,
  onToggleForm,
  onBack,
  filter,
  setFilter,
}: AssignmentsHeaderProps) {
  return (
    <div className="flex-col gap-4 p-4 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-600 hidden sm:flex">
      <div className="flex items-center justify-between">
        {!showDetails ? (
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Assignments
            </h2>
            <div className="flex gap-2">
              <Funnel className="w-5 h-5 text-gray-600 dark:text-gray-300 self-center" />
              <Select
                value={filter}
                onValueChange={(value) => setFilter(value as AssignmentFilter)}
                defaultValue="all"
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Assignments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Assignments</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
          </>
        ) : (
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft />
            Back
          </Button>
        )}
      </div>
    </div>
  );
}
