"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Search, Settings } from "lucide-react";
import { Button, NotificationMenu, ThemeToggle } from "@/components/UI";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      alert(`You searched for: ${searchQuery}`);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-600 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Student Hub
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              aria-label="Search everything"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <NotificationMenu />
            <Link href="/settings">
              <Button title="Settings" variant="ghost" size="icon">
                <Settings className="w-5 h-5 dark:text-gray-400" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
