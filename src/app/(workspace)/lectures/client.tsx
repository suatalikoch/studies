"use client";

import { useMemo, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { Lecture, LectureFilter, LectureFormState } from "@/types";
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
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<LectureFilter>("all");
  const [typeFilter, setTypeFilter] = useState<LectureFilter>("all");
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

  const filteredLectures = useMemo(() => {
    return lectures.filter((lecture) => {
      const subjectMatch =
        subjectFilter === "all" ||
        (subjectFilter === "math" && lecture.subject === "Mathematics") ||
        (subjectFilter === "science" && lecture.subject === "Science") ||
        (subjectFilter === "history" && lecture.subject === "History");

      const typeMatch =
        typeFilter === "all" ||
        (typeFilter === "live" && lecture.type === "Live") ||
        (typeFilter === "recorded" && lecture.type === "Recorded") ||
        (typeFilter === "seminar" && lecture.type === "Seminar");

      return subjectMatch && typeMatch;
    });
  }, [lectures, subjectFilter, typeFilter]);

  return (
    <div className="flex flex-col h-full">
      <LecturesHeader
        showDetails={showDetails}
        showForm={showForm}
        onToggleForm={() => setShowForm((prev) => !prev)}
        onBack={() => setShowDetails(false)}
        subjectFilter={subjectFilter}
        setSubjectFilter={setSubjectFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />
      {!showForm && !showDetails && (
        <LecturesList
          lectures={filteredLectures}
          onSelect={handleSelectLecture}
        />
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
