import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Lecture,
  LectureFormProps,
  LectureFormState,
  LectureType,
} from "@/types";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  Checkbox,
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
import { CalendarIcon } from "lucide-react";

export default function LectureForm({
  user,
  onAdd,
  onCancel,
}: LectureFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [tagInput, setTagInput] = useState("");
  const [form, setForm] = useState<LectureFormState>({
    title: "",
    subject: "",
    professor: "",
    date: "",
    duration: "",
    type: "Recorded",
    tags: [],
    attended: false,
    checked: false,
  });

  const setField = <K extends keyof LectureFormState>(
    key: K,
    value: LectureFormState[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const addLecture = async () => {
    if (!user) return;

    const title = form.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }

    const newLecture: Omit<Lecture, "id"> = {
      user_id: user.id,
      title: form.title,
      subject: form.subject,
      professor: form.professor,
      date: form.date,
      duration: form.duration,
      type: form.type,
      tags: form.tags,
      attended: form.attended,
      checked: form.checked,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await createClient()
      .from("lectures")
      .insert([newLecture])
      .select();

    if (error) {
      alert("Failed to add lecture: " + error.message);
      return;
    }

    onAdd(data[0]);
    setForm({
      title: "",
      subject: "",
      professor: "",
      date: "",
      duration: "",
      type: "Recorded",
      tags: [],
      attended: false,
      checked: false,
    });
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      const newTag = tagInput.trim();
      if (form.tags) {
        if (newTag && !form.tags.includes(newTag)) {
          setField("tags", [...form.tags, newTag]);
        }
      }
      setTagInput("");
    }
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Add New Lecture</h3>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              addLecture();
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
                placeholder="Enter lecture title..."
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
                <Label
                  htmlFor="professor"
                  className="text-muted-foreground mb-2"
                >
                  Professor
                </Label>
                <Input
                  type="text"
                  id="professor"
                  placeholder="Enter professor name..."
                  value={form.professor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setField("professor", e.target.value)
                  }
                />
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
                          "date",
                          selectedDate?.toISOString().split("T")[0] || ""
                        );
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label
                  htmlFor="duration"
                  className="text-muted-foreground mb-2"
                >
                  Duration
                </Label>
                <Input
                  id="duration"
                  type="time"
                  value={form.duration}
                  onChange={(e) => setField("duration", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type" className="text-muted-foreground mb-2">
                  Type
                </Label>
                <Select
                  onValueChange={(value) => {
                    setField("type", value as LectureType);
                  }}
                >
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Live">Live</SelectItem>
                    <SelectItem value="Recorded">Recorded</SelectItem>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags" className="text-muted-foreground mb-2">
                  Tags
                </Label>
                <Input
                  id="tags"
                  type="text"
                  value={tagInput}
                  placeholder="Type and press Enter..."
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                />
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="attended"
                  checked={form.attended}
                  onCheckedChange={(checked) =>
                    setField("attended", checked === true)
                  }
                />
                <Label htmlFor="attended">attended</Label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="default" type="submit">
                  Add Lecture
                </Button>
                <Button variant="secondary" onClick={onCancel} type="button">
                  Cancel
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags?.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-neutral-200 dark:bg-neutral-700 rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                      onClick={() =>
                        setField(
                          "tags",
                          form.tags?.filter((t) => t !== tag)
                        )
                      }
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
