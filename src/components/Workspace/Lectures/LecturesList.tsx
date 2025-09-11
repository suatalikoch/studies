import { LecturesListProps } from "@/types";
import LectureCard from "./LectureCard";

export default function LecturesList({
  lectures,
  onSelect,
}: LecturesListProps) {
  return (
    <div className="flex-1 flex flex-col gap-4 overflow-y-auto p-4">
      {lectures.map((lecture) => (
        <LectureCard
          key={lecture.id}
          lecture={lecture}
          onClick={() => onSelect(lecture)}
        />
      ))}
      {lectures.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No lectures found for this view.
        </div>
      )}
    </div>
  );
}
