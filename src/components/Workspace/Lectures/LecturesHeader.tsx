import { LectureFilter, LecturesHeaderProps } from "@/types";
import { ChevronLeft, Funnel, Plus, Search } from "lucide-react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI";

export default function LecturesHeader({
  showDetails,
  showForm,
  onToggleForm,
  onBack,
  subjectFilter,
  setSubjectFilter,
  typeFilter,
  setTypeFilter,
}: LecturesHeaderProps) {
  return (
    <div className="flex-col gap-4 p-4 bg-white dark:bg-neutral-950 border-b hidden sm:flex">
      <div className="flex items-center justify-between">
        {!showDetails ? (
          <>
            <h2 className="text-xl font-bold">Lectures</h2>
            <div className="flex gap-2">
              <Funnel className="w-5 h-5 text-muted-foreground self-center" />
              <Select
                value={subjectFilter}
                onValueChange={(value) =>
                  setSubjectFilter(value as LectureFilter)
                }
                defaultValue="all"
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={(value) => setTypeFilter(value as LectureFilter)}
                defaultValue="all"
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="recorded">Recorded</SelectItem>
                  <SelectItem value="seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search lectures..."
                  className="w-full max-w-sm pl-10"
                />
              </div>
              <Button onClick={onToggleForm}>
                {showForm ? (
                  "Cancel"
                ) : (
                  <>
                    <Plus />
                    Add
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft />
            Back
          </Button>
        )}
      </div>
    </div>
  );
}
