"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Lecture, LectureFormState } from "@/types";
import LecturesHeader from "@/components/Workspace/Lectures/LecturesHeader";
import LecturesList from "@/components/Workspace/Lectures/LecturesList";
import LectureDetails from "@/components/Workspace/Lectures/LectureDetails";
import LectureForm from "@/components/Workspace/Lectures/LectureForm";

export default function LecturesClient({
  lecturesDb,
}: {
  lecturesDb: Lecture[];
}) {
  const [lectures, setLectures] = useState<Lecture[]>(lecturesDb);
  const [form, setForm] = useState<LectureFormState>({
    title: "",
    subject: "",
    professor: "",
    date: "",
    duration: "",
    type: "Live",
    tags: [],
    attended: false,
    checked: false,
  });

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);

  const user = useUser();

  const cancelForm = () => {
    setForm({
      title: "",
      subject: "",
      professor: "",
      date: "",
      duration: "",
      type: "Live",
      tags: [],
      attended: false,
      checked: false,
    });
    setShowForm(false);
  };

  const handleSelectLecture = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    setShowDetails(true);
  };

  return (
    <div className="flex flex-col h-full">
      <LecturesHeader
        showDetails={showDetails}
        showForm={showForm}
        onToggleForm={() => setShowForm((prev) => !prev)}
        onBack={() => setShowDetails(false)}
      />
      {!showForm && !showDetails && (
        <LecturesList lectures={lectures} onSelect={handleSelectLecture} />
      )}
      {showDetails && selectedLecture && (
        <LectureDetails lecture={selectedLecture} />
      )}
      {showForm && (
        <LectureForm
          user={user}
          onAdd={(lecture) => {
            setLectures((prev) => [...prev, lecture]);
          }}
          onCancel={cancelForm}
        />
      )}
    </div>
  );
}
