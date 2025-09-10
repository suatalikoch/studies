"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lecture, LectureFormState } from "@/types";
import {
  Button,
  Calendar,
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
}: {
  user: { id: string } | null;
  onAdd: (assignment: Lecture) => void;
  onCancel: () => void;
}) {
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
  const titleRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const setField = <K extends keyof LectureFormState>(
    key: K,
    value: LectureFormState[K]
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

    const newLecture: Omit<Lecture, "id"> = {
      user_id: user.id,
      title: form.title,
      subject: form.subject,
      professor: form.professor,
      date: form.date,
      duration: "",
      type: "Recorded",
      tags: [],
      attended: false,
      checked: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await createClient()
      .from("assignments")
      .insert([newLecture])
      .select();

    if (error) {
      alert("Failed to add assignment: " + error.message);
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

  return (
    <div className="flex-1 p-4 flex flex-col gap-4">
      <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Add New Lecture
        </h3>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            addAssignment();
          }}
        >
          <div>
            <Label
              htmlFor="title"
              className="text-gray-700 dark:text-gray-400 mb-2"
            >
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
            <Label
              htmlFor="subject"
              className="text-gray-700 dark:text-gray-400 mb-2"
            >
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
                className="text-gray-700 dark:text-gray-400 mb-2"
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
              <Label
                htmlFor="dueDate"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
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
                className="text-gray-700 dark:text-gray-400 mb-2"
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
              <Label
                htmlFor="type"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                Type
              </Label>
              <Select
                onValueChange={(value) => {
                  console.log("Selected type: " + value);
                }}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Types</SelectItem>
                  <SelectItem value="Live">Live</SelectItem>
                  <SelectItem value="Recorded">Recorded</SelectItem>
                  <SelectItem value="Seminar">Seminar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="tags"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                Tags
              </Label>
              <Input id="tags" type="text" onChange={(e) => console.log("")} />
            </div>
            <div>
              <Label
                htmlFor="attended"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                Attended
              </Label>
              <Input id="attended" type="checkbox" checked={false} />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="default" type="submit">
              Add Lecture
            </Button>
            <Button variant="secondary" onClick={onCancel} type="button">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
