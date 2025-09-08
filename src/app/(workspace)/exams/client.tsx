"use client";

import { useState } from "react";
import {
  Trash2,
  Check,
  ArrowLeft,
  X,
  MapPin,
  Clock,
  CalendarIcon,
} from "lucide-react";
import {
  Badge,
  Button,
  Calendar,
  Card,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/Library/card";
import { Exam } from "@/types";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ExamsClient({ examsDB }: { examsDB: Exam[] }) {
  const [exams, setExams] = useState<Exam[]>(examsDB);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const [open, setOpen] = useState(false);
  const [dateC, setDateC] = useState<Date | undefined>(undefined);

  const addExam = async (user_id: string) => {
    if (!subject || !date) return;
    const newExam: Omit<Exam, "id"> = {
      user_id,
      subject,
      date,
      location,
      status: "upcoming",
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await createClient()
      .from("exams")
      .insert([newExam])
      .select();

    if (error) {
      // showToast("error", "Failed to add task");
      alert("Failed to add task: " + error.message);
      return;
    }

    const insertedExam = data[0];
    setExams((e) => [insertedExam, ...e]);
    setSubject("");
    setDate("");
    setLocation("");
  };

  const toggleStatus = (id: string) => {
    setExams((prev) =>
      prev?.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              status: exam.status === "upcoming" ? "completed" : "upcoming",
            }
          : exam
      )
    );
  };

  const deleteExam = (id: string) => {
    setExams((prev) => prev?.filter((exam) => exam.id !== id));
  };

  return (
    <div className="2xl:max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex gap-3 items-center">
        <Link href="/calendar">
          <Button variant="outline">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Exams</h1>
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Add New Exam</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="grid w-full items-center gap-3">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>

            <div className="grid w-full items-center gap-3">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date" className="px-1">
                  Date
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="justify-between font-normal"
                    >
                      {dateC ? dateC.toLocaleDateString() : "Select date"}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={dateC}
                      onSelect={(date) => {
                        setDateC(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Room 001"
            />
          </div>

          <Button
            onClick={() => addExam("e52e5151-a495-4bda-86bd-43ccf1394c32")}
          >
            Add Exam
          </Button>
        </CardContent>
      </Card>

      {/* Exams List */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <Card
            key={exam.id}
            className="flex justify-between items-center hover:border-indigo-400 shadow-none hover:shadow-md transition-colors"
          >
            <CardContent className="flex items-center gap-4 w-full justify-between">
              <div>
                <h2 className="text-lg font-semibold">{exam.subject}</h2>
                <div className="my-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <p className="text-sm text-muted-foreground">
                      {new Date(exam.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <p className="text-sm text-muted-foreground">
                      {exam.location}
                    </p>
                  </div>
                </div>
                <Badge
                  className={
                    exam.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                  variant="default"
                >
                  {exam.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => toggleStatus(exam.id)}
                >
                  {exam.status === "completed" ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteExam(exam.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
