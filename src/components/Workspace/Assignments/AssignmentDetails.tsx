import { Badge, Label, Progress, Textarea } from "@/components/UI";
import { AssignmentDetailsProps } from "@/types";
import { Calendar, Download, File, Upload } from "lucide-react";

export default function AssignmentDetails({
  assignment,
}: AssignmentDetailsProps) {
  return (
    <div className="flex-1 bg-white dark:bg-gray-950">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {assignment.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {assignment.subject}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Badge
                  variant="secondary"
                  className={`text-sm transition-colors ${
                    assignment.status === "Not Started"
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Due: {new Date(assignment.due_date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Upload"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                Assignment description text goes here.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Attachments
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <File className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="flex-1 text-gray-900 dark:text-gray-100">
                    filename.pdf
                  </span>
                  <button
                    className="text-indigo-600 dark:text-indigo-500 hover:text-indigo-800"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Progress Tracking
              </h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    Completion
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-500">
                    33%
                  </span>
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
