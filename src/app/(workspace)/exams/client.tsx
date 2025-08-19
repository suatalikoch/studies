"use client";

import { useState } from "react";
import { Trash2, Check } from "lucide-react";
import { Badge, Button, Card, Input, Label } from "@/components/UI";
import { CardContent, CardHeader, CardTitle } from "@/components/UI/card";

interface Exam {
  id: number;
  subject: string;
  date: string;
  status: "upcoming" | "completed";
}

export default function ExamsClient() {
  const [exams, setExams] = useState<Exam[]>([
    { id: 1, subject: "Mathematics", date: "2025-08-20", status: "upcoming" },
    { id: 2, subject: "Physics", date: "2025-08-25", status: "upcoming" },
  ]);

  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  const addExam = () => {
    if (!subject || !date) return;
    const newExam: Exam = {
      id: Date.now(),
      subject,
      date,
      status: "upcoming",
    };
    setExams([newExam, ...exams]);
    setSubject("");
    setDate("");
  };

  const toggleStatus = (id: number) => {
    setExams((prev) =>
      prev.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              status: exam.status === "upcoming" ? "completed" : "upcoming",
            }
          : exam
      )
    );
  };

  const deleteExam = (id: number) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">📅 Exams</h1>

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

          <Button onClick={addExam}>Add Exam</Button>
        </CardContent>
      </Card>

      {/* Exams List */}
      <div className="space-y-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="flex justify-between items-center">
            <CardContent className="flex items-center gap-4 py-4 w-full justify-between">
              <div>
                <h2 className="text-lg font-semibold">{exam.subject}</h2>
                <p className="text-sm text-muted-foreground">{exam.date}</p>
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
