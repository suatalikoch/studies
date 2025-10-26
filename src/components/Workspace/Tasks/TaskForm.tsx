import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CalendarIcon } from "lucide-react";
import {
  TaskCategory,
  Task,
  TaskFormProps,
  TaskFormState,
  TaskPriority,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/UI";

export default function TaskForm({ user, onAdd, onCancel }: TaskFormProps) {
  const [form, setForm] = useState<TaskFormState>({
    title: "",
    description: "",
    priority: "low",
    category: "Other",
    due_date: "",
  });
  const titleRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const setField = <K extends keyof TaskFormState>(
    key: K,
    value: TaskFormState[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const addTask = async (user_id: string) => {
    const title = form.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }

    const newTask: Omit<Task, "id"> = {
      user_id,
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      category: form.category,
      due_date: form.due_date,
      completed: false,
      starred: false,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await createClient()
      .from("tasks")
      .insert([newTask])
      .select();

    if (error) {
      alert("Failed to add task: " + error.message);
      return;
    }

    onAdd(data[0]);
    setForm({
      title: "",
      description: "",
      priority: "low",
      category: "Other",
      due_date: "",
    });
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();

              if (user) {
                addTask(user.id);
              }
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
                placeholder="Enter task title..."
                value={form.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setField("title", e.target.value)
                }
              />
            </div>
            <div>
              <Label
                htmlFor="description"
                className="text-muted-foreground mb-2"
              >
                Description
              </Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Enter task description..."
                value={form.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setField("description", e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label
                  htmlFor="priority"
                  className="text-muted-foreground mb-2"
                >
                  Priority
                </Label>
                <Select
                  value={form.priority}
                  onValueChange={(value) =>
                    setField("priority", value as TaskPriority)
                  }
                >
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="category"
                  className="text-muted-foreground mb-2"
                >
                  Category
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setField("category", value as TaskCategory)
                  }
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
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
                Add Task
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
