import type { Deadline } from "@/types";
import { format, parseISO } from "date-fns";
import { AlertCircle } from "lucide-react";

export default function UpcomingDeadlines({
  deadlines,
}: {
  deadlines: Deadline[];
}) {
  return (
    <section
      className="bg-white rounded-lg border border-gray-200"
      aria-labelledby="upcoming-deadlines-title"
    >
      <header className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3
          id="upcoming-deadlines-title"
          className="text-lg font-semibold text-gray-900"
        >
          Upcoming Deadlines
        </h3>
        <AlertCircle className="w-5 h-5 text-red-500" aria-hidden="true" />
      </header>
      <div className="p-6 space-y-4">
        {deadlines
          .slice(0, 3)
          .map(({ id, title, subject, due_date, priority }) => (
            <div
              key={id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              role="button"
              tabIndex={0}
              aria-pressed="false"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  alert(`Clicked on ${title}`);
                }
              }}
              onClick={() => alert(`Clicked on ${title}`)}
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{title}</h4>
                <p className="text-sm text-gray-600">{subject}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {format(parseISO(due_date), "MMM d, yyyy")}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    priority === "high"
                      ? "bg-red-100 text-red-800"
                      : priority === "medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {priority}
                </span>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
