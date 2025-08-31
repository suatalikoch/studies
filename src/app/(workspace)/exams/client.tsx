"use client";

import { useState } from "react";
import { Trash2, Check, ArrowLeft } from "lucide-react";
import { Badge, Button, Card, Input, Label } from "@/components/UI";
import { CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Exam } from "@/types";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ExamsClient({ examsDB }: { examsDB: Exam[] }) {
  const [exams, setExams] = useState<Exam[]>(examsDB);
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex gap-3 items-center">
        <Link href="/calendar">
          <Button variant="outline">
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Exams</h1>
      </div>

      {/* Add Exam Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Exam</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
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
          <Card key={exam.id} className="flex justify-between items-center">
            <CardContent className="flex items-center gap-4 py-4 w-full justify-between">
              <div>
                <h2 className="text-lg font-semibold">{exam.subject}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(exam.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">{exam.location}</p>
                <Badge
                  variant={
                    exam.status === "completed" ? "secondary" : "outline"
                  }
                >
                  {exam.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => toggleStatus(exam.id)}
                >
                  <Check className="w-4 h-4" />
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
