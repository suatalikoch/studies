"use client";

import { Suspense, useMemo, useState } from "react";
import { useUser } from "@/hooks";
import { Lecture, LectureFilter } from "@/types";
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

  const user = useUser();

  const cancelForm = () => {
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
        lecture.subject.toLowerCase() === subjectFilter;

      const typeMatch =
        typeFilter === "all" || lecture.type.toLowerCase() === typeFilter;

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
        <Suspense fallback={<div>Loading lectures...</div>}>
          <LecturesList
            lectures={filteredLectures}
            onSelect={handleSelectLecture}
          />
        </Suspense>
      )}
      {showDetails && selectedLecture && (
        <LectureDetails lecture={selectedLecture} />
      )}
      {showForm && (
        <LectureForm
          user={user}
          onAdd={(lecture) => {
            setLectures((prev) => [lecture, ...prev]);
          }}
          onCancel={cancelForm}
        />
      )}
    </div>
  );
}
