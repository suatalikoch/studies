"use client";

import { Suspense, useCallback, useMemo, useState } from "react";
import { useUser } from "@/hooks";
import { Assignment } from "@/types";
import AssignmentsList from "@/components/Workspace/Assignments/AssignmentsList";
import AssignmentDetails from "@/components/Workspace/Assignments/AssignmentDetails";
import AssignmentForm from "@/components/Workspace/Assignments/AssignmentForm";
import AssignmentsHeader from "@/components/Workspace/Assignments/AssignmentsHeader";

export default function AssignmentsClient({
  assignmentsDb,
}: {
  assignmentsDb: Assignment[];
}) {
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentsDb);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [filter, setFilter] = useState("");

  const { user } = useUser();

  const cancelForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleSelectAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetails(true);
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      switch (filter) {
        case "not-started":
          return assignment.status === "Not Started";
        case "in-progress":
          return assignment.status === "In Progress";
        case "completed":
          return assignment.status === "Completed";
        default:
          return true;
      }
    });
  }, [assignments, filter]);

  return (
    <div className="flex flex-col h-full">
      <AssignmentsHeader
        showDetails={showDetails}
        showForm={showForm}
        onToggleForm={() => setShowForm((prev) => !prev)}
        onBack={() => setShowDetails(false)}
        filter={filter}
        setFilter={setFilter}
      />
      {!showForm && !showDetails && (
        <Suspense fallback={<div>Loading assignments...</div>}>
          <AssignmentsList
            assignments={filteredAssignments}
            onSelect={handleSelectAssignment}
          />
        </Suspense>
      )}
      {showDetails && selectedAssignment && (
        <AssignmentDetails assignment={selectedAssignment} />
      )}
      {showForm && (
        <AssignmentForm
          user={user}
          onAdd={(assignment) => {
            setAssignments((prev) => [assignment, ...prev]);
          }}
          onCancel={cancelForm}
        />
      )}
    </div>
  );
}
