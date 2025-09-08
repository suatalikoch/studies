"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button, Input } from "@/components/UI";
import { useUser } from "@/hooks/useUser";
import { Lecture, LectureFormState } from "@/types";
import {
  BookType,
  Calendar,
  ChevronLeft,
  Clock,
  Download,
  Play,
  Plus,
  Search,
  Upload,
} from "lucide-react";

export default function LecturesClient({
  lecturesDb,
}: {
  lecturesDb: Lecture[];
}) {
  const [lectures, setLectures] = useState<Lecture[]>(lecturesDb);
  const [form, setForm] = useState<LectureFormState>({
    title: "",
    subject: "",
    professor: "",
    date: "",
    duration: "",
    type: "Live",
    tags: [],
    attended: false,
    checked: false,
  });

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof LectureFormState>(
    key: K,
    value: LectureFormState[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const user = useUser();

  const addLecture = async (user_id: string) => {
    const title = form.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }
    const newAssignment: Omit<Lecture, "id"> = {
      user_id,
      title: form.title.trim(),
      subject: form.subject.trim(),
      professor: form.professor.trim(),
      date: form.date,
      duration: form.duration,
      type: form.type,
      tags: form.tags,
      attended: form.attended,
      checked: form.checked,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const { data, error } = await createClient()
      .from("assignments")
      .insert([newAssignment])
      .select();

    if (error) {
      alert("Failed to add assignment: " + error.message);
      return;
    }

    const insertedLecture = data[0];
    setLectures((t) => [insertedLecture, ...t]);
    setForm({
      title: "",
      subject: "",
      professor: "",
      date: "",
      duration: "",
      type: "Live",
      tags: [],
      attended: false,
      checked: false,
    });
    titleRef.current?.focus();
    setShowForm(false);
  };

  const cancelForm = () => {
    setForm({
      title: "",
      subject: "",
      professor: "",
      date: "",
      duration: "",
      type: "Live",
      tags: [],
      attended: false,
      checked: false,
    });
    setShowForm(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 p-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between">
          {!showDetails ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Lectures
              </h2>
              <div className="flex gap-2">
                <select className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option value="all">All Subjects</option>
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                </select>
                <select className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm">
                  <option value="all">All Types</option>
                  <option value="live">Live</option>
                  <option value="recorded">Recorded</option>
                  <option value="seminar">Seminar</option>
                </select>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search lectures..."
                    className="w-full max-w-sm pl-10"
                  />
                </div>
                <Button
                  onClick={() => {
                    setShowForm((prev) => !prev);
                  }}
                >
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
            <Button
              variant="secondary"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              <ChevronLeft />
              Back
            </Button>
          )}
        </div>
      </div>
      {!showForm && !showDetails && (
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            {lectures.map((lecture) => (
              <div
                key={lecture.id}
                onClick={() => setShowDetails((prev) => !prev)}
                className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
                    {lecture.title}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <BookType className="w-5 h-5 text-indigo-600 dark:text-indigo-500" />
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="ml-2 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {lecture.subject} • {lecture.professor}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-800">
                    {lecture.type}
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(lecture.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>1h 30m</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {lecture.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs">
                    +2
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDetails && (
        <div className="flex-1 bg-white dark:bg-gray-950 flex flex-col">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Introduction to Biology
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300">
                    <span>Science</span>
                    <span>•</span>
                    <span>Prof. Smith</span>
                    <span>•</span>
                    <span>{new Date("2025-08-07").toLocaleDateString()}</span>
                    <span>•</span>
                    <span>1h 30m</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-lg text-sm font-medium bg-indigo-100 text-indigo-800">
                    Recorded
                  </span>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked
                      readOnly
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Attended
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button type="button" className="bg-blue-600 hover:bg-blue-700">
                  <Play className="w-4 h-4" />
                  Watch Recording
                </Button>
                <Button type="button" className="bg-gray-600 hover:bg-gray-700">
                  <Download className="w-4 h-4" />
                  Export Notes
                </Button>
                <Button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Upload className="w-4 h-4" />
                  Upload Files
                </Button>
              </div>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-14 h-14 mx-auto mb-4" />
                  <p className="text-lg">Video Player</p>
                  <p className="text-sm text-gray-300">
                    Click to play lecture recording
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Lecture Notes</h2>
                <textarea
                  rows={10}
                  className="w-full border border-gray-300 dark:border-gray-500 rounded-lg p-4 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Write your notes here..."
                ></textarea>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Resources</h2>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Biology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Biology Textbook PDF
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Biology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Practice Questions
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://en.wikipedia.org/wiki/Biology"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline"
                    >
                      Supplementary Videos
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {showForm && (
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Add New Assignment
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                if (user) {
                  addLecture(user.id);
                }
              }}
            >
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter assignment title..."
                  value={form.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setField("title", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <textarea
                  id="subject"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter subject subject..."
                  value={form.subject}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setField("subject", e.target.value)
                  }
                ></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                    htmlFor="professor"
                  >
                    Professor
                  </label>
                  <select
                    id="professor"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.professor}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setField("professor", e.target.value)
                    }
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                    htmlFor="date"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setField("date", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                    htmlFor="duration"
                  >
                    Duration
                  </label>
                  <select
                    id="duration"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.date}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setField("duration", e.target.value)
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="default" type="submit">
                  Add Lecture
                </Button>
                <Button variant="secondary" onClick={cancelForm} type="button">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
