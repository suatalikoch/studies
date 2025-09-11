import { Badge, Checkbox } from "@/components/UI";
import { LectureCardProps } from "@/types";
import { BookType, Calendar, Clock } from "lucide-react";

export default function LectureCard({ lecture, onClick }: LectureCardProps) {
  return (
    <div
      key={lecture.id}
      onClick={onClick}
      className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
          {lecture.title}
        </h3>
        <div className="flex items-center space-x-3">
          <BookType className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
          <Checkbox checked={lecture.attended} />
        </div>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        {lecture.subject} • {lecture.professor}
      </p>
      <div className="flex items-center justify-between mb-2">
        <Badge variant="secondary">{lecture.type}</Badge>
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(lecture.date).toLocaleDateString()}</span>
          </div>
          {lecture.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{lecture.duration}</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-1">
        {lecture.tags?.map((tag, idx) => (
          <Badge key={idx} variant="outline">
            #{tag}
          </Badge>
        ))}
        <Badge variant="outline">+2</Badge>
      </div>
    </div>
  );
}
