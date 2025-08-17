"use client";

import { Category, Filter, FormState, Priority, Task } from "@/types";
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

  const titleRef = useRef<HTMLInputElement>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const addTask = () => {
    const title = form.title.trim();
    if (!title) {
      titleRef.current?.focus();
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title,
      description: form.description.trim(),
      priority: form.priority,
      category: form.category,
      due_date: form.due_date,
      completed: false,
      starred: false,
      updated_at: Date.now().toString(),
      created_at: Date.now().toString(),
    };
    setTasks((t) => [newTask, ...t]);
    setForm({
      title: "",
      description: "",
      priority: "low",
      category: "Work",
      due_date: "",
    });
    titleRef.current?.focus();
  };

  const cancelForm = () =>
    setForm({
      title: "",
      description: "",
      priority: "low",
      category: "Work",
      due_date: "",
    });

  const toggleTask = (id: number) =>
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, completed: !x.completed } : x))
    );

  const deleteTask = (id: number) =>
    setTasks((t) => t.filter((x) => x.id !== id));

  const toggleStar = (id: number) =>
    setTasks((t) =>
      t.map((x) => (x.id === id ? { ...x, starred: !x.starred } : x))
    );

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

  const onHeaderAddClick = () => {
    // If the form has a title, add it; otherwise focus the title input
    if (form.title.trim()) addTask();
    else titleRef.current?.focus();
  };

  return (
    <div className="p-6 mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Lists</h1>
          <p className="text-gray-600">Stay organized and track your tasks</p>
        </div>
        <button
          onClick={onHeaderAddClick}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2"
        >
          {/* Plus icon */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          <span>Add Task</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
            </div>
            {/* CheckSquare icon */}
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              ></path>
              <rect
                width="20"
                height="20"
                x="2"
                y="2"
                rx="2"
                ry="2"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
              ></rect>
            </svg>
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
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
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
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              ></circle>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6l4 2"
              ></path>
            </svg>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-red-600">
                {highPriorityCount}
              </p>
            </div>
            {/* Flag icon */}
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v18"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3c7-4 7 4 14 0v14c-7-4-7 4-14 0"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 mb-6">
        {/* Filter icon */}
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
          ></path>
        </svg>
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

      {/* Add Todo Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add New Task
        </h3>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
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
                  setField("priority", e.target.value as Priority)
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

      {/* Todo List */}
      <div className="space-y-3">
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
              className="bg-white rounded-lg border border-gray-200 p-4 transition-all hover:shadow-md"
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
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4"
                      ></path>
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="3"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      ></rect>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="3"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      ></rect>
                    </svg>
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
                        task.completed ? "text-green-600" : "text-yellow-600"
                      }`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-gray-600 mt-1">{task.description}</p>
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
                    <span className={`text-sm font-medium ${priorityColor}`}>
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
                    className={`text-gray-400 hover:text-yellow-500 ${
                      task.starred ? "text-yellow-500" : ""
                    }`}
                    aria-label={task.starred ? "Unstar task" : "Star task"}
                  >
                    <svg
                      className="w-5 h-5"
                      fill={task.starred ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17.27l-5.18 3.05 1-5.82L3 9.75l5.91-.86L12 3.5l3.09 5.39 5.91.86-4.82 4.75 1 5.82z"
                      ></path>
                    </svg>
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-gray-400 hover:text-red-600"
                    aria-label="Delete task"
                  >
                    {/* Trash icon */}
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                      ></path>
                    </svg>
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
    </div>
  );
}
