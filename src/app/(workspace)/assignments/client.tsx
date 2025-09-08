"use client";

import { Button } from "@/components/UI";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { Assignment, AssignmentFormState } from "@/types";
import { differenceInDays } from "date-fns";
import {
  AlertTriangle,
  Calendar,
  ChevronLeft,
  Download,
  File,
  Plus,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

export default function AssignmentsClient({
  assignmentsDb,
}: {
  assignmentsDb: Assignment[];
}) {
  const [assignments, setAssignments] = useState<Assignment[]>(assignmentsDb);
  const [form, setForm] = useState<AssignmentFormState>({
    title: "",
    subject: "",
    status: "",
    priority: "",
    due_date: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof AssignmentFormState>(
    key: K,
    value: AssignmentFormState[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const user = useUser();

  const addAssignment = async (user_id: string) => {
    const title = form.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }
    const newAssignment: Omit<Assignment, "id"> = {
      user_id,
      title: form.title.trim(),
      subject: form.subject.trim(),
      status: form.status,
      priority: form.priority,
      due_date: form.due_date,
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

    const insertedAssignment = data[0];
    setAssignments((t) => [insertedAssignment, ...t]);
    setForm({
      title: "",
      subject: "",
      status: "",
      priority: "",
      due_date: "",
    });
    titleRef.current?.focus();
    setShowForm(false);
  };

  const cancelForm = () => {
    setForm({
      title: "",
      subject: "",
      status: "",
      priority: "",
      due_date: "",
    });
    setShowForm(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Assignments List */}
      <div className="bg-white dark:bg-gray-950 p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          {!showDetails ? (
            <>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Assignments
              </h2>
              <div className="flex flex-row gap-2">
                <select className="text-sm w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                  <option value="all">All Assignments</option>
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
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
        <div className="flex-1 flex flex-col gap-4 p-4">
          {assignments.map((assignment) => {
            const daysLeft = differenceInDays(assignment.due_date, new Date());
            return (
              <div
                key={assignment.id}
                onClick={() => setShowDetails((prev) => !prev)}
                className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-indigo-400 hover:shadow-md p-4 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">
                    {assignment.title}
                  </h3>
                  <AlertTriangle className="w-4 h-4 text-red-500 ml-2" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {assignment.subject}
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                    {assignment.status}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {assignment.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{assignment.due_date}</span>
                  </div>
                  <span className="font-medium text-gray-600 dark:text-gray-300">
                    {daysLeft < 0
                      ? Math.abs(daysLeft).toString() + " days overdue"
                      : daysLeft.toString() + " days left"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {showDetails && (
        <div className="flex-1 bg-white dark:bg-gray-950">
          {/* If assignment selected */}
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Assignment Title
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    Subject Name
                  </p>

                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800">
                      Status
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      Priority priority
                    </span>
                    <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                      {/* Calendar icon */}
                      <Calendar className="w-4 h-4" />
                      <span>Due: {new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Upload"
                  >
                    <Upload className="w-4 h-4" />
                  </button>
                  <button
                    className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-200 text-gray-800">
                  Not Started
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                  In Progress
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-green-100 text-green-600 hover:bg-green-200">
                  Completed
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                    Assignment description text goes here.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Attachments
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <File className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      <span className="flex-1 text-gray-900 dark:text-gray-100">
                        filename.pdf
                      </span>
                      <button
                        className="text-indigo-600 dark:text-indigo-500 hover:text-indigo-800"
                        title="Download attachment"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Notes
                  </h3>
                  <textarea
                    className="w-full h-32 p-4 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add your notes here..."
                  ></textarea>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Progress Tracking
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                        Completion
                      </span>
                      <span className="text-sm text-gray-600">50%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-400 rounded-full h-2">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
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
                  addAssignment(user.id);
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
                    htmlFor="status"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setField("status", e.target.value)
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
                    htmlFor="priority"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.priority}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setField("priority", e.target.value)
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
                    htmlFor="dueDate"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.due_date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setField("due_date", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="default" type="submit">
                  Add Assignment
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
