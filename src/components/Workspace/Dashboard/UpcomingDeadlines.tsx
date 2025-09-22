import { useState } from "react";
import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import type { Deadline } from "@/types";
import { AlertCircle } from "lucide-react";
import {
  Badge,
  Card,
  CardContent,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/UI";

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export default function UpcomingDeadlines({
  deadlines,
}: UpcomingDeadlinesProps) {
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(
    null
  );

  return (
    <Card className="p-0" aria-labelledby="upcoming-deadlines-title">
      <CardContent className="p-0">
        <header className="p-6 border-b flex items-center justify-between">
          <h3 id="upcoming-deadlines-title" className="text-lg font-semibold">
            Upcoming Deadlines
          </h3>
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
            <Link href="/calendar">
              <Badge
                variant="secondary"
                className="hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer transition-colors"
              >
                View All
              </Badge>
            </Link>
          </div>
        </header>
        <div className="p-6 space-y-4">
          {deadlines.length > 0 ? (
            deadlines.slice(0, 3).map((deadline) => (
              <Sheet key={deadline.id}>
                <SheetTrigger asChild>
                  <Card
                    role="button"
                    tabIndex={0}
                    aria-pressed="false"
                    onClick={() => setSelectedDeadline(deadline)}
                    className="p-4 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors duration-300"
                  >
                    <CardContent className="p-0 flex items-center justify-between">
                      <div className="flex-1">
                        <h4>{deadline.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {deadline.subject}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Due{" "}
                          {formatDistanceToNow(new Date(deadline.due_date), {
                            addSuffix: true,
                          })}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            deadline.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : deadline.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {deadline.priority}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </SheetTrigger>
                {selectedDeadline?.id === deadline.id && (
                  <SheetContent side="right" className="w-96">
                    <SheetHeader>
                      <SheetTitle>{deadline.title}</SheetTitle>
                      <SheetDescription>
                        {deadline.subject} - due{" "}
                        {formatDistanceToNow(new Date(deadline.due_date), {
                          addSuffix: true,
                        })}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="p-4 space-y-2 text-sm">
                      <p>
                        <strong>Due Date:</strong>{" "}
                        {format(parseISO(deadline.due_date), "PPP")}
                      </p>
                      <p>
                        <strong>Priority:</strong> {deadline.priority}
                      </p>
                      <p>
                        <strong>Description:</strong> Lorem ipsum dolor sit
                        amet.
                      </p>
                    </div>
                  </SheetContent>
                )}
              </Sheet>
            ))
          ) : (
            <Card className="p-4">
              <CardContent className="p-0 flex items-center justify-between">
                <p>No upcoming deadlines data yet.</p>
                <Link
                  href="/calendar/new"
                  className="text-indigo-600 underline"
                >
                  <Badge className="bg-primary border border-primary/50 hover:bg-primary/80 text-white transition-colors">
                    Create
                  </Badge>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
