import { Badge, Button, Checkbox, Label, Textarea } from "@/components/UI";
import { LectureDetailsProps } from "@/types";
import { Download, Play, Upload } from "lucide-react";
import Link from "next/link";

export default function LectureDetails({ lecture }: LectureDetailsProps) {
  return (
    <div className="flex-1 bg-white dark:bg-neutral-950 flex flex-col">
      <div className="h-full flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{lecture.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{lecture.subject}</span>
                <span>•</span>
                <span>{lecture.professor}</span>
                <span>•</span>
                <span>{new Date(lecture.date).toLocaleDateString()}</span>
                {lecture.duration && (
                  <div className="flex items-center gap-4">
                    <span>•</span>
                    <span>{lecture.duration}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {lecture.type}
              </Badge>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={lecture.attended} />
                <span className="text-sm text-muted-foreground">
                  {lecture.attended ? "Attended" : "Not attended"}
                </span>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button type="button">
              <Play className="w-4 h-4" />
              Watch Recording
            </Button>
            <Button type="button" variant="secondary">
              <Download className="w-4 h-4" />
              Export Notes
            </Button>
            <Button type="button" variant="secondary">
              <Upload className="w-4 h-4" />
              Upload Files
            </Button>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="bg-neutral-100 dark:bg-neutral-900 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <Play className="w-14 h-14 mx-auto mb-4" />
              <p className="text-lg">Video Player</p>
              <p className="text-sm text-muted-foreground">
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
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                <Link
                  href="https://en.wikipedia.org/wiki/Biology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Biology Textbook PDF
                </Link>
              </li>
              <li>
                <Link
                  href="https://en.wikipedia.org/wiki/Biology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Practice Questions
                </Link>
              </li>
              <li>
                <Link
                  href="https://en.wikipedia.org/wiki/Biology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
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
