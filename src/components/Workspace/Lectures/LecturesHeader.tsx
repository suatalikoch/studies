import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI";
import { ChevronLeft, Plus, Search } from "lucide-react";

interface LecturesHeaderProps {
  showDetails: boolean;
  showForm: boolean;
  onToggleForm: () => void;
  onBack: () => void;
}

export default function LecturesHeader({
  showDetails,
  showForm,
  onToggleForm,
  onBack,
}: LecturesHeaderProps) {
  return (
    <div className="flex-col gap-4 p-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-950 hidden sm:flex">
      <div className="flex items-center justify-between">
        {!showDetails ? (
          <>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Lectures
            </h2>
            <div className="flex gap-2">
              <Select
                onValueChange={(value) =>
                  console.log("Selected subject:", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="math">Math</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => console.log("Selected type:", value)}
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
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
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
          <Button variant="secondary" onClick={onBack}>
            <ChevronLeft />
            Back
          </Button>
        )}
      </div>
    </div>
  );
}
