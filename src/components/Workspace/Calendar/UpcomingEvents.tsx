import { Suspense } from "react";
import { Button, Card, CardContent, ScrollArea } from "@/components/UI";
import { UpcomingEventsProps } from "@/types";
import { Plus, BookOpen, Clock, MapPin } from "lucide-react";
import Link from "next/link";

export default function UpcomingEvents({ exams }: UpcomingEventsProps) {
  return (
    <div className="w-full md:w-96 bg-white dark:bg-neutral-950 border rounded-lg p-6 space-y-6">
      <h2 className="text-xl font-bold">Upcoming Events</h2>
      <ScrollArea className="h-96">
        <Suspense fallback={<div>Loading events...</div>}>
          <div className="flex flex-col gap-4">
            {exams.length > 0 ? (
              exams.map((exam, index) => (
                <Card
                  key={index}
                  className="p-4 hover:border-primary hover:shadow-md cursor-pointer transition-colors duration-300"
                >
                  <CardContent className="p-0">
                    <h3 className="text-lg font-semibold">{exam.subject}</h3>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      {new Date(exam.date).toLocaleDateString()} •{" "}
                      {new Date(exam.date).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <div className="flex gap-2 items-center">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <p className="text-muted-foreground text-sm">
                        {exam.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h3>No upcoming events data yet.</h3>
            )}
          </div>
        </Suspense>
      </ScrollArea>
      <div className="flex flex-col gap-3">
        <Link href="/revision">
          <Button variant="secondary" className="w-full">
            <BookOpen className="w-4 h-4" /> Start Revision Session
          </Button>
        </Link>
        <Link href="/exams">
          <Button variant="default" className="w-full">
            <Plus className="w-4 h-4" /> Add Exam
          </Button>
        </Link>
      </div>
    </div>
  );
}
