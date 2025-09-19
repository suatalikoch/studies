import { Suspense } from "react";
import { Button, ScrollArea } from "@/components/UI";
import { UpcomingEventsProps } from "@/types";
import { Plus, BookOpen, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function UpcomingEvents({ exams }: UpcomingEventsProps) {
  return (
    <div className="w-full md:w-96 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-600 rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Upcoming Events
      </h2>
      <ScrollArea className="h-100">
        <Suspense fallback={<div>Loading events...</div>}>
          <div className="flex flex-col gap-4">
            {exams.length > 0 ? (
              exams.map((exam, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-indigo-400 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold">{exam.subject}</h3>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    {new Date(exam.date).toLocaleDateString()} •{" "}
                    {new Date(exam.date).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="flex gap-2 items-center">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {exam.location}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h3>No upcoming events data yet.</h3>
            )}
          </div>
        </Suspense>
      </ScrollArea>
      <div className="border-gray-200 dark:border-gray-600 space-y-3">
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
