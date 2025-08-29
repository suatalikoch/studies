"use client";

import { Button } from "@/components/UI";
import { createClient } from "@/lib/supabase/client";
import { Category, Filter, FormState, Task, TaskPriority } from "@/types";
import {
  Check,
  Clock,
  Flag,
  Funnel,
  Square,
  SquareCheck,
  Star,
  Trash,
} from "lucide-react";
import React, { useMemo, useRef, useState } from "react";

export default function TasksClient({ tasksDB }: { tasksDB: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(tasksDB);
  const [filter, setFilter] = useState<Filter>("all");
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    priority: "low",
    category: "Work",
    due_date: "",
  });

  const [showForm, setShowForm] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
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
      // showToast("error", "Failed to add task");
      alert("Failed to add task: " + error.message);
      return;
    }

    const insertedTask = data[0];
    setTasks((t) => [insertedTask, ...t]);
    setForm({
      title: "",
      description: "",
      priority: "low",
      category: "Work",
      due_date: "",
    });
    titleRef.current?.focus();
    setShowForm(false);
  };

  const cancelForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "low",
      category: "Work",
      due_date: "",
    });
    setShowForm(false);
  };

  const toggleTask = (id: string) => {
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((t) => t.filter((x) => x.id !== id));
  };

  const toggleStar = (id: string) => {
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, starred: !x.starred } : x))
    );
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      switch (filter) {
        case "completed":
          return t.completed;
        case "pending":
          return !t.completed;
        case "starred":
          return t.starred;
        case "high-priority":
          return t.priority === "high";
        default:
          return true;
      }
    });
  }, [tasks, filter]);

  const totalTasks = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.filter((t) => !t.completed).length;
  const highPriorityCount = tasks.filter((t) => t.priority === "high").length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b bg-white">
        <h2 className="text-xl font-bold text-gray-900">Tasks</h2>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              {/* Filter icon */}
              <Funnel className="w-5 h-5 text-gray-600" />
              <select
                value={filter}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFilter(e.target.value as Filter)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="starred">Starred</option>
                <option value="high-priority">High Priority</option>
              </select>
            </div>
            <Button onClick={() => setShowForm((prev) => !prev)}>
              <span>{showForm ? "Cancel" : "+ Add"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Stat Cards */}
        {!showForm && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Tasks
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalTasks}
                  </p>
                </div>
                {/* CheckSquare icon */}
                <SquareCheck className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {completedCount}
                  </p>
                </div>
                {/* Check icon */}
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingCount}
                  </p>
                </div>
                {/* Clock icon */}
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    High Priority
                  </p>
                  <p className="text-2xl font-bold text-red-600">
                    {highPriorityCount}
                  </p>
                </div>
                {/* Flag icon */}
                <Flag className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        )}

        {/* Add Task Form */}
        {showForm && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Task
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                addTask("e52e5151-a495-4bda-86bd-43ccf1394c32");
              }}
            >
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter task title..."
                  value={form.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setField("title", e.target.value)
                  }
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter task description..."
                  value={form.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setField("description", e.target.value)
                  }
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="priority"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.priority}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setField("priority", e.target.value as TaskPriority)
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.category}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setField("category", e.target.value as Category)
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
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="dueDate"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={form.due_date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setField("due_date", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        {!showForm && (
          <div className="flex-1 overflow-y-auto space-y-3">
            {filteredTasks.map((task) => {
              const priorityColor =
                task.priority === "high"
                  ? "text-red-600"
                  : task.priority === "medium"
                  ? "text-yellow-600"
                  : "text-gray-500";

              return (
                <div
                  key={task.id}
                  className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 ${
                        task.completed
                          ? "text-green-600"
                          : "text-gray-400 hover:text-green-600"
                      }`}
                      aria-label={
                        task.completed ? "Mark as pending" : "Mark as completed"
                      }
                    >
                      {/* Toggle square/checked square */}
                      {task.completed ? (
                        <SquareCheck className="w-5 h-5" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4
                          className={`text-lg font-semibold ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-gray-900"
                          }`}
                        >
                          {task.title}
                        </h4>
                        <span
                          className={`text-sm font-medium ${
                            task.completed
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-gray-600 mt-1">{task.description}</p>
                      )}
                      {!task.description && (
                        <p className="text-xs text-gray-400 mt-1">
                          No content available
                        </p>
                      )}
                      <div className="flex items-center flex-wrap gap-3 mt-2">
                        <span className="text-sm text-gray-500">
                          {task.category}
                        </span>
                        {task.due_date && (
                          <span className="text-sm text-gray-500">
                            Due: {task.due_date}
                          </span>
                        )}
                        <span
                          className={`text-sm font-medium ${priorityColor}`}
                        >
                          {task.priority === "high"
                            ? "High"
                            : task.priority === "medium"
                            ? "Medium"
                            : "Low"}
                        </span>
                        {task.starred && (
                          <span className="text-sm text-yellow-600 font-medium">
                            ★ Starred
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-3">
                      {/* Star toggle */}
                      <button
                        onClick={() => toggleStar(task.id)}
                        className={`text-gray-400 hover:text-yellow-500 cursor-pointer ${
                          task.starred ? "text-yellow-500" : ""
                        }`}
                        aria-label={task.starred ? "Unstar task" : "Star task"}
                      >
                        <Star className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-400 hover:text-red-600 cursor-pointer"
                        aria-label="Delete task"
                      >
                        {/* Trash icon */}
                        <Trash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Empty state */}
            {filteredTasks.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                No tasks found for this view.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
