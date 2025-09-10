"use client";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI";
import { ChevronLeft, Plus } from "lucide-react";

interface AssignmentsHeaderProps {
  showDetails: boolean;
  showForm: boolean;
  onToggleForm: () => void;
  onBack: () => void;
}

export default function AssignmentsHeader({
  showDetails,
  showForm,
  onToggleForm,
  onBack,
}: AssignmentsHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-4 border-b border-gray-200 dark:border-gray-600 hidden sm:block">
      <div className="flex items-center justify-between">
        {!showDetails ? (
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Assignments
            </h2>
            <div className="flex flex-row gap-2">
              <Select
                onValueChange={(value) => {
                  console.log("Selected:", value);
                }}
                defaultValue="all"
              >
                <SelectTrigger className="w-full text-sm px-3 py-2 rounded-lg">
                  <SelectValue placeholder="All Assignments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignments</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
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
          <Button variant="secondary" onClick={onBack}>
            <ChevronLeft />
            Back
          </Button>
        )}
      </div>
    </div>
  );
}
