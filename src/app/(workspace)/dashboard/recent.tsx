import { Note } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";

export default function RecentNotes({ notes }: { notes: Note[] }) {
  return (
    <section
      className="bg-white rounded-lg border border-gray-200"
      aria-labelledby="recent-notes-title"
    >
      <header className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3
          id="recent-notes-title"
          className="text-lg font-semibold text-gray-900"
        >
          Recent Notes
        </h3>
        <Star className="w-5 h-5 text-yellow-500" aria-hidden="true" />
      </header>
      <div className="p-6 space-y-4">
        {notes.map(({ id, title, subject, updated_at }) => (
          <div
            key={id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            role="button"
            tabIndex={0}
            aria-pressed="false"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                alert(`Clicked on note ${title}`);
              }
            }}
            onClick={() => alert(`Clicked on note ${title}`)}
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{title}</h4>
              <p className="text-sm text-gray-600">{subject}</p>
            </div>
            <p className="text-sm text-gray-500">
              {Date.parse(updated_at)
                ? formatDistanceToNow(new Date(updated_at), { addSuffix: true })
                : updated_at}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
