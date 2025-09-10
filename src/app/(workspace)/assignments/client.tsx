"use client";

import { useState } from "react";
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
  const [form, setForm] = useState<AssignmentFormState>({
    title: "",
    subject: "",
    status: "",
    priority: "",
    due_date: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const user = useUser();

  const cancelForm = () => {
    setForm({
      title: "",
      subject: "",
      status: "",
      priority: "",
      due_date: "",
    });
    setShowForm(false);
  };

  const handleSelectAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDetails(true);
  };

  return (
    <div className="flex flex-col h-full">
      <AssignmentsHeader
        showDetails={showDetails}
        showForm={showForm}
        onToggleForm={() => setShowForm((prev) => !prev)}
        onBack={() => setShowDetails(false)}
      />
      {!showForm && !showDetails && (
        <AssignmentsList
          assignments={assignments}
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
