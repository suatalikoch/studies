"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Book,
  BookOpen,
  CheckSquare,
  Home,
  Menu,
  Paperclip,
} from "lucide-react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="sticky bottom-0 h-12 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-600 sm:hidden">
      <div className="flex h-full justify-around items-center overflow-x-auto">
        <Link
          href="/dashboard"
          onClick={() => setActiveTab("home")}
          className={activeTab === "home" ? "text-indigo-600" : "text-gray-500"}
        >
          <Home size={24} />
        </Link>
        <Link
          href="/notes"
          onClick={() => setActiveTab("notes")}
          className={
            activeTab === "notes" ? "text-indigo-600" : "text-gray-500"
          }
        >
          <Paperclip size={24} />
        </Link>
        <Link
          href="/lectures"
          onClick={() => setActiveTab("lectures")}
          className={
            activeTab === "lectures" ? "text-indigo-600" : "text-gray-500"
          }
        >
          <Book size={24} />
        </Link>
        <Link
          href="/assignments"
          onClick={() => setActiveTab("assignments")}
          className={
            activeTab === "assignments" ? "text-indigo-600" : "text-gray-500"
          }
        >
          <BookOpen size={24} />
        </Link>
        <Link
          href="/tasks"
          onClick={() => setActiveTab("tasks")}
          className={
            activeTab === "tasks" ? "text-indigo-600" : "text-gray-500"
          }
        >
          <CheckSquare size={24} />
        </Link>
        <Link
          href="/settings"
          onClick={() => setActiveTab("settings")}
          className={
            activeTab === "settings" ? "text-indigo-600" : "text-gray-500"
          }
        >
          <Menu size={24} />
        </Link>
      </div>
    </nav>
  );
}
