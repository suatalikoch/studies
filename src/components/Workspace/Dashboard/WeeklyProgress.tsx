import { Card, CardContent } from "@/components/UI";
import type { ProgressDay } from "@/types";
import { TrendingUp } from "lucide-react";

interface WeeklyProgressProps {
  progress: ProgressDay[];
}

export default function WeeklyProgress({ progress }: WeeklyProgressProps) {
  return (
    <Card className="p-0" aria-labelledby="weekly-progress-title">
      <CardContent className="p-0">
        <header className="p-4 border-b flex items-center justify-between">
          <h3 id="weekly-progress-title" className="text-lg font-semibold">
            Weekly Progress
          </h3>
          <TrendingUp className="w-5 h-5 text-green-500" aria-hidden="true" />
        </header>
        <div className="p-6">
          <div className="flex items-end justify-between gap-2">
            {progress.length > 0 ? (
              progress.map(({ day, completed, total }) => (
                <div key={day} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 hover:dark:bg-neutral-700 rounded-t-lg relative transition-colors duration-300 cursor-pointer"
                    style={{ height: "84px" }}
                    aria-label={`${day} progress`}
                  >
                    <div
                      className="bg-primary rounded-t-lg absolute bottom-0 w-full transition-all duration-300"
                      style={{ height: `${(completed / total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs mt-2">{day}</p>
                  <p className="text-xs text-muted-foreground">
                    {completed}/{total}
                  </p>
                </div>
              ))
            ) : (
              <h3>No weekly progress data yet.</h3>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
