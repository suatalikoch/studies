import { Button } from "@/components/UI";
import { Exam } from "@/types";
import { Plus, BookOpen, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function UpcomingEvents({ exams }: { exams: Exam[] }) {
  return (
    <div className="w-full md:w-96 bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>

      <div className="space-y-4 overflow-y-auto">
        {exams.map((exam, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-400 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{exam.subject}</h3>
            <p className="text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-yellow-600" />
              {new Date(exam.date).toLocaleDateString()} •{" "}
              {new Date(exam.date).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex gap-2 items-center">
              <MapPin className="w-4 h-4 text-red-600" />
              <p className="text-gray-500 text-sm">{exam.location}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="border-gray-200 space-y-3">
        <Button variant="secondary" className="w-full">
          <BookOpen className="w-4 h-4" /> Start Revision Session
        </Button>
        <Link href="/exams">
          <Button variant="default" className="w-full">
            <Plus className="w-4 h-4" /> Add Exam
          </Button>
        </Link>
      </div>
    </div>
  );
}
