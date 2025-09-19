import { Badge } from "@/components/UI";
import { Note } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Notebook } from "lucide-react";
import Link from "next/link";

interface RecentNotesProps {
  notes: Note[];
}

export default function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <section
      className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600"
      aria-labelledby="recent-notes-title"
    >
      <header className="p-6 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
        <h3
          id="recent-notes-title"
          className="text-lg font-semibold text-gray-900 dark:text-gray-100"
        >
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
      <div className="p-6 space-y-4">
        {notes.length > 0 ? (
          notes.slice(0, 3).map(({ id, title, subject, updated_at }) => (
            <Link
              key={id}
              href={`/notes/${id}?from=dashboard`}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              role="button"
              tabIndex={0}
              aria-pressed="false"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {subject}
                </p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {Date.parse(updated_at)
                  ? formatDistanceToNow(new Date(updated_at), {
                      addSuffix: true,
                    })
                  : updated_at}
              </p>
            </Link>
          ))
        ) : (
          <div className="flex items-center justify-between">
            <p>No recent notes data yet.</p>
            <Link href="/notes/new" className="text-indigo-600 underline">
              <Badge className="bg-green-600 border border-green-500 hover:border-green-300 text-white transition-colors">
                Create
              </Badge>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
