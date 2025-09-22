import { Card, CardContent } from "@/components/UI";
import { TasksInfoProps } from "@/types";
import { Check, Clock, Flag, SquareCheck } from "lucide-react";

export default function TasksInfo({
  totalTasks,
  completedCount,
  pendingCount,
  highPriorityCount,
}: TasksInfoProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
              <p className="text-2xl font-bold">{totalTasks}</p>
            </div>
            <SquareCheck className="w-7 sm:w-8 h-7 sm:h-8 text-indigo-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {completedCount}
              </p>
            </div>
            <Check className="w-7 sm:w-8 h-7 sm:h-8 text-green-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {pendingCount}
              </p>
            </div>
            <Clock className="w-7 sm:w-8 h-7 sm:h-8 text-yellow-600" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {highPriorityCount}
              </p>
            </div>
            <Flag className="w-7 sm:w-8 h-7 sm:h-8 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
