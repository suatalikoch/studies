import { AssignmentsListProps } from "@/types";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentsList({
  assignments,
  onSelect,
}: AssignmentsListProps) {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-4">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onClick={() => onSelect(assignment)}
        />
      ))}
      {assignments.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No assignments found for this view.
        </div>
      )}
    </div>
  );
}
