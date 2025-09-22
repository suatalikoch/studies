import { Badge, Button, Label, Progress, Textarea } from "@/components/UI";
import { AssignmentDetailsProps } from "@/types";
import { Calendar, Download, File, Upload } from "lucide-react";

export default function AssignmentDetails({
  assignment,
}: AssignmentDetailsProps) {
  return (
    <div className="flex-1 bg-white dark:bg-neutral-950">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {assignment.subject}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant="secondary"
                  className={`text-sm transition-colors ${
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
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 text-sm"
                >
                  {assignment.priority}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Due: {new Date(assignment.due_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10 transition-colors"
                title="Upload"
              >
                <Upload className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:bg-primary/10 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Assignment description text goes here.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Attachments</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                  <File className="w-5 h-5" />
                  <span className="flex-1">filename.pdf</span>
                  <button
                    className="text-primary hover:text-primary/75 cursor-pointer"
                    title="Download attachment"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="grid w-full gap-3">
                <Label htmlFor="message" className="text-lg font-semibold">
                  Notes
                </Label>
                <Textarea
                  placeholder="Add your notes here..."
                  id="message"
                  className="h-32"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Progress Tracking</h3>
              <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Completion
                  </span>
                  <span className="text-sm text-muted-foreground">33%</span>
                </div>
                <Progress value={33} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
