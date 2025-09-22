import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Assignment,
  AssignmentFormProps,
  AssignmentFormState,
  AssignmentStatus,
} from "@/types";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/UI";

export default function AssignmentForm({
  user,
  onAdd,
  onCancel,
}: AssignmentFormProps) {
  const [form, setForm] = useState<AssignmentFormState>({
    title: "",
    subject: "",
    status: "Not Started",
    priority: "",
    due_date: "",
  });
  const titleRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const setField = <K extends keyof AssignmentFormState>(
    key: K,
    value: AssignmentFormState[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const addAssignment = async () => {
    if (!user) return;

    const title = form.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }

    const newAssignment: Omit<Assignment, "id"> = {
      user_id: user.id,
      title: form.title,
      subject: form.subject,
      status: form.status,
      priority: form.priority,
      due_date: form.due_date,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await createClient()
      .from("assignments")
      .insert([newAssignment])
      .select();

    if (error) {
      alert("Failed to add assignment: " + error.message);

      toast.error("Failed to add assignment!");

      return;
    }

    onAdd(data[0]);
    setForm({
      title: "",
      subject: "",
      status: "Not Started",
      priority: "",
      due_date: "",
    });

    toast.success("Note added successfully!");
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Add New Assignment</h3>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              addAssignment();
            }}
          >
            <div>
              <Label htmlFor="title" className="text-muted-foreground mb-2">
                Title
              </Label>
              <Input
                ref={titleRef}
                type="text"
                id="title"
                placeholder="Enter assignment title..."
                value={form.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setField("title", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="subject" className="text-muted-foreground mb-2">
                Subject
              </Label>
              <Textarea
                id="subject"
                rows={3}
                placeholder="Enter subject..."
                value={form.subject}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setField("subject", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status" className="text-muted-foreground mb-2">
                  Status
                </Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setField("status", value as AssignmentStatus)
                  }
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="priority"
                  className="text-muted-foreground mb-2"
                >
                  Priority
                </Label>
                <Select
                  value={form.priority}
                  onValueChange={(value) => setField("priority", value)}
                >
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate" className="text-muted-foreground mb-2">
                  Due Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild className="w-full">
                    <Button
                      variant="outline"
                      id="dueDate"
                      className="justify-between font-normal"
                    >
                      {date ? date.toLocaleDateString() : "Select date"}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        setOpen(false);
                        setField(
                          "due_date",
                          selectedDate?.toISOString().split("T")[0] || ""
                        );
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="default" type="submit">
                Add Assignment
              </Button>
              <Button variant="secondary" onClick={onCancel} type="button">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
