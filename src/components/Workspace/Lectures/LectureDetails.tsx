import { Button, Label, Textarea } from "@/components/UI";
import { Lecture } from "@/types";
import { Download, Play, Upload } from "lucide-react";
import Link from "next/link";

export default function LectureDetails({ lecture }: { lecture: Lecture }) {
  return (
    <div className="flex-1 bg-white dark:bg-gray-950 flex flex-col">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {lecture.title}
              </h1>
              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                <span>{lecture.subject}</span>
                <span>•</span>
                <span>{lecture.professor}</span>
                <span>•</span>
                <span>{new Date(lecture.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{lecture.duration || "1h 30m"}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-800">
                {lecture.type}
              </span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {lecture.attended ? "Attended" : "Not attended"}
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button type="button" className="bg-blue-600 hover:bg-blue-700">
              <Play className="w-4 h-4" />
              Watch Recording
            </Button>
            <Button type="button" className="bg-gray-600 hover:bg-gray-700">
              <Download className="w-4 h-4" />
              Export Notes
            </Button>
            <Button type="button" className="bg-indigo-600 hover:bg-indigo-700">
              <Upload className="w-4 h-4" />
              Upload Files
            </Button>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-14 h-14 mx-auto mb-4" />
              <p className="text-lg">Video Player</p>
              <p className="text-sm text-gray-300">
                Click to play lecture recording
              </p>
            </div>
          </div>
          <div>
            <Label
              htmlFor="lectureNotes"
              className="text-xl font-semibold mb-2"
            >
              Lecture Notes
            </Label>
            <Textarea
              id="lectureNotes"
              rows={10}
              placeholder="Write your notes here..."
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Resources</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                <Link
                  href="https://en.wikipedia.org/wiki/Biology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Biology Textbook PDF
                </Link>
              </li>
              <li>
                <Link
                  href="https://en.wikipedia.org/wiki/Biology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Practice Questions
                </Link>
              </li>
              <li>
                <Link
                  href="https://en.wikipedia.org/wiki/Biology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  Supplementary Videos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
