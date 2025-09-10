import { Lecture } from "@/types";
import { BookType, Calendar, Clock } from "lucide-react";

export default function LectureCard({
  lecture,
  onClick,
}: {
  lecture: Lecture;
  onClick: () => void;
}) {
  return (
    <div
      key={lecture.id}
      onClick={onClick}
      className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
          {lecture.title}
        </h3>
        <div className="flex items-center space-x-1 ml-2">
          <BookType className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
          <input
            type="checkbox"
            checked
            readOnly
            className="ml-2 rounded text-indigo-600 focus:ring-indigo-500"
          />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {lecture.subject} • {lecture.professor}
      </p>
      <div className="flex items-center justify-between mb-2">
        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-800">
          {lecture.type}
        </span>
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(lecture.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>1h 30m</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {lecture.tags?.map((tag, idx) => (
          <span
            key={idx}
            className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg text-xs"
          >
            #{tag}
          </span>
        ))}
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
          +2
        </span>
      </div>
    </div>
  );
}
