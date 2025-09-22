import { Plus } from "lucide-react";
import { Button } from "@/components/UI";

export default function CalendarHeader() {
  return (
    <div className="p-4 items-center justify-between border-b bg-white dark:bg-neutral-950 hidden sm:flex">
      <h2 className="text-xl font-bold">Calendar</h2>
      <div className="flex items-center gap-2">
        <Button onClick={() => alert("Soon")}>
          <>
            <Plus />
            Add
          </>
        </Button>
      </div>
    </div>
  );
}
