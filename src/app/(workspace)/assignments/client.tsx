"use client";

import { useCallback, useMemo, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Assignment, AssignmentFormState } from "@/types";
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
  const [form, setForm] = useState<AssignmentFormState>({
    title: "",
    subject: "",
    status: "Not Started",
    priority: "",
    due_date: "",
  });

  const user = useUser();

  const cancelForm = useCallback(() => {
    setForm({
      title: "",
      subject: "",
      status: "Not Started",
      priority: "",
      due_date: "",
    });
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
        <AssignmentsList
          assignments={filteredAssignments}
          onSelect={handleSelectAssignment}
        />
      )}
      {showDetails && selectedAssignment && (
        <AssignmentDetails assignment={selectedAssignment} />
      )}
      {showForm && (
        <AssignmentForm
          user={user}
          onAdd={(assignment) => {
            setAssignments((prev) => [...prev, assignment]);
          }}
          onCancel={cancelForm}
        />
      )}
    </div>
  );
}
