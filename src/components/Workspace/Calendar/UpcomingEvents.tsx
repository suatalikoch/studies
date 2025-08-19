import { Plus, BookOpen, Clock } from "lucide-react";

export default function UpcomingEvents() {
  const upcomingExams = [
    {
      subject: "Mathematics",
      date: "2025-08-14",
      time: "10:00 AM",
      location: "Room 202",
    },
    {
      subject: "Physics",
      date: "2025-08-18",
      time: "1:00 PM",
      location: "Hall B",
    },
    {
      subject: "Computer Science",
      date: "2025-08-21",
      time: "9:00 AM",
      location: "Lab 3",
    },
  ];

  return (
    <div className="w-full md:w-96 bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Upcoming Exams</h2>

      <div className="space-y-4">
        {upcomingExams.map((exam, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-indigo-600">
              {exam.subject}
            </h3>
            <p className="text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> {exam.date} •{" "}
              {exam.time}
            </p>
            <p className="text-gray-500 text-sm">📍 {exam.location}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="pt-6 border-t border-gray-200 space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
          <BookOpen className="w-4 h-4" /> Start Revision Session
        </button>
        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
          <Plus className="w-4 h-4" /> Add Exam
        </button>
      </div>
    </div>
  );
}
