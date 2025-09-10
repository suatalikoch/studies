import { Lecture } from "@/types";
import LectureCard from "./LectureCard";

export default function LecturesList({
  lectures,
  onSelect,
}: {
  lectures: Lecture[];
  onSelect: (lecture: Lecture) => void;
}) {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-4">
      {lectures.map((lecture) => (
        <LectureCard
          key={lecture.id}
          lecture={lecture}
          onClick={() => onSelect(lecture)}
        />
      ))}
    </div>
  );
}
