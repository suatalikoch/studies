import type { ProgressDay } from "@/types";
import { TrendingUp } from "lucide-react";

export default function WeeklyProgress({
  progress,
}: {
  progress: ProgressDay[];
}) {
  return (
    <section
      className="bg-white rounded-lg border border-gray-200"
      aria-labelledby="weekly-progress-title"
    >
      <header className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3
          id="weekly-progress-title"
          className="text-lg font-semibold text-gray-900"
        >
          Weekly Progress
        </h3>
        <TrendingUp className="w-5 h-5 text-green-500" aria-hidden="true" />
      </header>
      <div className="p-6">
        <div className="flex items-end justify-between space-x-2 h-32">
          {progress.map(({ day, completed, total }) => (
            <div key={day} className="flex flex-col items-center flex-1">
              <div
                className="w-full bg-gray-200 rounded-t-lg relative"
                style={{ height: "80px" }}
                aria-label={`${day} progress`}
              >
                <div
                  className="bg-indigo-600 rounded-t-lg absolute bottom-0 w-full transition-all duration-300"
                  style={{ height: `${(completed / total) * 100}%` }}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 mt-2">{day}</p>
              <p className="text-xs text-gray-500">
                {completed}/{total}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
