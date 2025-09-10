import { Assignment } from "@/types";
import AssignmentCard from "./AssignmentCard";

export default function AssignmentsList({
  assignments,
  onSelect,
}: {
  assignments: Assignment[];
  onSelect: (assignment: Assignment) => void;
}) {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-4">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onClick={() => onSelect(assignment)}
        />
      ))}
    </div>
  );
}
