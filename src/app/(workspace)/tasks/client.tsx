"use client";

import React, { useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge, Button } from "@/components/UI";
import { useUser } from "@/hooks/useUser";
import { Category, Filter, Task, TaskFormState, TaskPriority } from "@/types";
import {
  Check,
  Clock,
  Flag,
  Funnel,
  Plus,
  Square,
  SquareCheck,
  Star,
  Trash,
} from "lucide-react";

export default function TasksClient({ tasksDB }: { tasksDB: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(tasksDB);
  const [filter, setFilter] = useState<Filter>("all");
  const [form, setForm] = useState<TaskFormState>({
    title: "",
    description: "",
    priority: "low",
    category: "Work",
    due_date: "",
  });

  const [showForm, setShowForm] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof TaskFormState>(
    key: K,
    value: TaskFormState[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const user = useUser();

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

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    const { error } = await createClient()
      .from("tasks")
      .update({ completed: !task.completed })
      .eq("id", id);

    if (error) {
      alert("Failed to complete task: " + error.message);
      return;
    }

    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );
  };

  const deleteTask = async (id: string) => {
    const { error } = await createClient().from("tasks").delete().eq("id", id);

    if (error) {
      alert("Failed to delete task: " + error.message);
      return;
    }

    setTasks((t) => t.filter((x) => x.id !== id));
  };

  const toggleStar = async (id: string) => {
    const task = tasks.find((t) => t.id === id);

    if (!task) return;

    const { error } = await createClient()
      .from("tasks")
      .update({ starred: !task.starred })
      .eq("id", id);

    if (error) {
      alert("Failed to star task: " + error.message);
      return;
    }

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
      <div className="p-4 flex items-center justify-between border-b border-gray-200 bg-white dark:bg-gray-950">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Tasks
        </h2>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              {/* Filter icon */}
              <Funnel className="w-5 h-5 text-gray-600 dark:text-gray-300" />
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
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Stat Cards */}
        {!showForm && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Tasks
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {totalTasks}
                  </p>
                </div>
                {/* CheckSquare icon */}
                <SquareCheck className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {completedCount}
                  </p>
                </div>
                {/* Check icon */}
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {pendingCount}
                  </p>
                </div>
                {/* Clock icon */}
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
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
          <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Add New Task
            </h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();

                if (user) {
                  addTask(user.id);
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
                  className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
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
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
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
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
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
                    className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1"
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
                <Button variant="default" type="submit">
                  Add Task
                </Button>
                <Button variant="secondary" onClick={cancelForm} type="button">
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        {!showForm && (
          <div className="flex-1 overflow-y-auto space-y-4">
            {filteredTasks.map((task) => {
              return (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 hover:border-indigo-400 p-4 transition-all hover:shadow-md cursor-pointer"
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
                        <h3
                          className={`font-semibold ${
                            task.completed
                              ? "text-gray-400 dark:text-gray-500 line-through"
                              : "text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {task.title}
                        </h3>
                        <div className="flex gap-3 items-center">
                          <Badge
                            className={`${
                              task.completed
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </Badge>
                          {/* Star toggle */}
                          <button
                            onClick={() => toggleStar(task.id)}
                            className={`text-gray-400 hover:text-yellow-500 cursor-pointer ${
                              task.starred ? "text-yellow-500" : ""
                            }`}
                            aria-label={
                              task.starred ? "Unstar task" : "Star task"
                            }
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
                      <div>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {task.description}
                          </p>
                        )}
                        {!task.description && (
                          <p className="text-xs text-gray-400 mt-1">
                            No content available
                          </p>
                        )}
                      </div>
                      <div className="flex justify-between items-center flex-wrap mt-2">
                        <div className="flex gap-3">
                          <Badge variant="secondary">{task.category}</Badge>
                          <Badge
                            className={`${
                              task.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : task.priority === "medium"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-lime-100 text-lime-800"
                            }`}
                          >
                            {task.priority === "high"
                              ? "High"
                              : task.priority === "medium"
                              ? "Medium"
                              : "Low"}
                          </Badge>
                          {task.starred && (
                            <div className="flex flex-row items-center gap-1">
                              <Badge className="bg-amber-50 text-amber-700">
                                <Star className="w-4 h-4" />
                                <p>Starred</p>
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div>
                          {task.due_date && (
                            <span className="flex gap-1">
                              <Badge variant="secondary">Due:</Badge>
                              <Badge variant="secondary">
                                {new Date(task.due_date).toLocaleDateString()}
                              </Badge>
                            </span>
                          )}
                        </div>
                      </div>
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
