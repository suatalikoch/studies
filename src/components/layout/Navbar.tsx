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
    <nav className="sticky bottom-0 h-12 bg-white dark:bg-neutral-950 border-t sm:hidden">
      <div className="flex h-full justify-around items-center overflow-x-auto">
        <Link
          href="/dashboard"
          onClick={() => setActiveTab("home")}
          className={
            activeTab === "home" ? "text-primary" : "text-muted-foreground"
          }
        >
          <Home size={24} />
        </Link>
        <Link
          href="/notes"
          onClick={() => setActiveTab("notes")}
          className={
            activeTab === "notes" ? "text-primary" : "text-muted-foreground"
          }
        >
          <Paperclip size={24} />
        </Link>
        <Link
          href="/lectures"
          onClick={() => setActiveTab("lectures")}
          className={
            activeTab === "lectures" ? "text-primary" : "text-muted-foreground"
          }
        >
          <Book size={24} />
        </Link>
        <Link
          href="/assignments"
          onClick={() => setActiveTab("assignments")}
          className={
            activeTab === "assignments"
              ? "text-primary"
              : "text-muted-foreground"
          }
        >
          <BookOpen size={24} />
        </Link>
        <Link
          href="/tasks"
          onClick={() => setActiveTab("tasks")}
          className={
            activeTab === "tasks" ? "text-primary" : "text-muted-foreground"
          }
        >
          <CheckSquare size={24} />
        </Link>
        <Link
          href="/settings"
          onClick={() => setActiveTab("settings")}
          className={
            activeTab === "settings" ? "text-primary" : "text-muted-foreground"
          }
        >
          <Menu size={24} />
        </Link>
      </div>
    </nav>
  );
}
