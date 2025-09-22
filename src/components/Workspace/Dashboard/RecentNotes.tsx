import { Badge, Card, CardContent } from "@/components/UI";
import { Note } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Notebook } from "lucide-react";
import Link from "next/link";

interface RecentNotesProps {
  notes: Note[];
}

export default function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <Card className="p-0" aria-labelledby="recent-notes-title">
      <CardContent className="p-0">
        <header className="p-6 border-b flex items-center justify-between">
          <h3 id="recent-notes-title" className="text-lg font-semibold">
            Recent Notes
          </h3>
          <div className="flex items-center gap-3">
            <Notebook className="w-5 h-5 text-yellow-600" aria-hidden="true" />
            <Link href="/notes">
              <Badge
                variant="secondary"
                className="hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer transition-colors"
              >
                View All
              </Badge>
            </Link>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-6">
          {notes.length > 0 ? (
            notes.slice(0, 3).map(({ id, title, subject, updated_at }) => (
              <Link
                key={id}
                href={`/notes/${id}?from=dashboard`}
                role="button"
                tabIndex={0}
                aria-pressed="false"
              >
                <Card className="p-4 bg-neutral-50 dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer transition-colors duration-300">
                  <CardContent className="p-0 flex items-center justify-between">
                    <div className="flex-1">
                      <h4>{title}</h4>
                      <p className="text-sm text-muted-foreground">{subject}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Date.parse(updated_at)
                        ? formatDistanceToNow(new Date(updated_at), {
                            addSuffix: true,
                          })
                        : updated_at}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="p-4">
              <CardContent className="p-0 flex items-center justify-between">
                <p>No recent notes data yet.</p>
                <Link href="/notes/new" className="text-indigo-600 underline">
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
