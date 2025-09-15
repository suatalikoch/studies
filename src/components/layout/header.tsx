"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Search, Settings } from "lucide-react";
import { Button, Input, NotificationMenu, ThemeToggle } from "@/components/UI";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      alert(`You searched for: ${searchQuery}`);
    }
  };

  return (
    <header className="sticky top-0 z-1 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-600 px-3 sm:px-6 py-2 sm:py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 sm:w-8 sm:h-8 text-indigo-600" />
            <h1 className="text-sm sm:text-2xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              Student Hub
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search everything"
              placeholder="Search everything..."
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <NotificationMenu />
            <Link href="/settings" className="hidden sm:block">
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
