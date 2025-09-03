"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Search, Settings, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
} from "@/components/UI";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      alert(`You searched for: ${searchQuery}`);
    }
  };

  const unreadNotificationCount = 3;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Student Hub</h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              aria-label="Search everything"
              placeholder="Search everything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Dropwdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative">
                  <IconButton label="Notifications">
                    <Bell className="w-5 h-5" />
                  </IconButton>
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-0.75 -right-0.75 w-4 h-4 inline-flex items-center justify-center text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadNotificationCount}
                    </span>
                  )}
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-96">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  📘 New course available: Physics
                </DropdownMenuItem>
                <DropdownMenuItem>👥 New study group request</DropdownMenuItem>
                <DropdownMenuItem>
                  📅 Event reminder: Math Workshop
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/notifications">View all</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings */}
            <Link href="/settings">
              <IconButton label="Settings">
                <Settings className="w-5 h-5" />
              </IconButton>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
