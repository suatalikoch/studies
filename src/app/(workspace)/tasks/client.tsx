"use client";

import React, { useCallback, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks/useUser";
import { TaskFilter, Task, TaskFormState } from "@/types";
import TasksList from "@/components/Workspace/Tasks/TaskList";
import TasksHeader from "@/components/Workspace/Tasks/TaskHeader";
import TaskForm from "@/components/Workspace/Tasks/TaskForm";
import TasksInfo from "@/components/Workspace/Tasks/TasksInfo";

export default function TasksClient({ tasksDB }: { tasksDB: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(tasksDB);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [form, setForm] = useState<TaskFormState>({
    title: "",
    description: "",
    priority: "low",
    category: "Work",
    due_date: "",
  });

  const user = useUser();

  const totalTasks = tasks.length;
  const completedCount = useMemo(
    () => tasks.filter((t) => t.completed).length,
    [tasks]
  );
  const pendingCount = useMemo(
    () => tasks.filter((t) => !t.completed).length,
    [tasks]
  );
  const highPriorityCount = useMemo(
    () => tasks.filter((t) => t.priority === "high").length,
    [tasks]
  );

  const cancelForm = useCallback(() => {
    setForm({
      title: "",
      description: "",
      priority: "low",
      category: "Work",
      due_date: "",
    });
    setShowForm(false);
  }, []);

  const toggleTask = useCallback(
    async (id: string) => {
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
    },
    [tasks]
  );

  const toggleStar = useCallback(
    async (id: string) => {
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
    },
    [tasks]
  );

  const deleteTask = useCallback(async (id: string) => {
    const { error } = await createClient().from("tasks").delete().eq("id", id);

    if (error) {
      alert("Failed to delete task: " + error.message);
      return;
    }

    setTasks((t) => t.filter((x) => x.id !== id));
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      switch (filter) {
        case "pending":
          return !task.completed;
        case "completed":
          return task.completed;
        case "starred":
          return task.starred;
        case "high-priority":
          return task.priority === "high";
        default:
          return true;
      }
    });
  }, [tasks, filter]);

  return (
    <div className="flex flex-col h-full">
      <TasksHeader
        showForm={showForm}
        onToggleForm={() => setShowForm((prev) => !prev)}
        filter={filter}
        setFilter={setFilter}
      />
      {!showForm && (
        <TasksInfo
          totalTasks={totalTasks}
          completedCount={completedCount}
          pendingCount={pendingCount}
          highPriorityCount={highPriorityCount}
        />
      )}
      {!showForm && (
        <TasksList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onStar={toggleStar}
          onDelete={deleteTask}
        />
      )}
      {showForm && (
        <TaskForm
          user={user}
          onAdd={(task) => {
            setTasks((prev) => [...prev, task]);
          }}
          onCancel={cancelForm}
        />
      )}
    </div>
  );
}
