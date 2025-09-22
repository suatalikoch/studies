import { Calendar, AlertTriangle } from "lucide-react";
import { differenceInDays } from "date-fns";
import { AssignmentCardProps } from "@/types";
import { Badge, Card, CardContent } from "@/components/UI";
import { useRouter } from "next/navigation";

export default function AssignmentCard({ assignment }: AssignmentCardProps) {
  const router = useRouter();

  const daysLeft = differenceInDays(new Date(assignment.due_date), new Date());
  const isOverdue = daysLeft < 0;

  return (
    <Card
      id={assignment.id}
      onClick={() =>
        router.push(`/assignments/${assignment.id}?from=assignments`)
      }
      className="p-4 hover:border-primary dark:hover:border-primary hover:shadow-md cursor-pointer transition-colors duration-300"
    >
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold flex-1">{assignment.title}</h3>
          <AlertTriangle
            className={`w-4 h-4 ml-2 ${
              isOverdue ? "text-red-500" : "text-yellow-500"
            }`}
          />
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {assignment.subject}
        </p>
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant="secondary"
            className={`transition-colors ${
              assignment.status === "Not Started"
                ? "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                : assignment.status === "In Progress"
                ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                : assignment.status === "Completed"
                ? "bg-green-100 text-green-600 hover:bg-green-200"
                : ""
            }`}
          >
            {assignment.status}
          </Badge>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {assignment.priority}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(assignment.due_date).toLocaleDateString()}</span>
          </div>
          <span className="text-muted-foreground">
            {daysLeft < 0
              ? Math.abs(daysLeft) + " days overdue"
              : daysLeft + " days left"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
