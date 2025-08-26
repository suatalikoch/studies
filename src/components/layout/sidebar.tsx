"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Home,
  FileText,
  BookOpen,
  CheckSquare,
  GraduationCap,
  Calendar,
  PenTool,
  Book,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";

export const sidebarItems = [
  { id: "dashboard", path: "dashboard", label: "Dashboard", icon: Home },
  { id: "notes", path: "notes", label: "Notes", icon: FileText },
  { id: "lectures", path: "lectures", label: "Lectures", icon: Book },
  {
    id: "assignments",
    path: "assignments",
    label: "Assignments",
    icon: BookOpen,
  },
  { id: "tasks", path: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "calendar", path: "calendar", label: "Calendar", icon: Calendar },
  { id: "exams", path: "exams", label: "Exams", icon: GraduationCap },
  {
    id: "drawing",
    path: "drawing-board",
    label: "Drawing Board",
    icon: PenTool,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (currentUser) {
        setUser({
          name:
            currentUser.user_metadata.full_name ||
            currentUser.email ||
            "No name",
          email: currentUser.email || "",
          avatar:
            currentUser.user_metadata.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              currentUser.email || "User"
            )}`,
        });
      }
    }

    fetchUser();
  }, [supabase.auth]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      setUser(null);
      setFlyoutOpen(false);
      router.push("/login");
    }
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
      {/* Sidebar Navigation */}
      <nav className="p-4 space-y-2 overflow-y-auto flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={`/${item.path}`}
              key={item.id}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer ${
                pathname === `/${item.path}`
                  ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200 mt-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Quick Statistics
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Due Today</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              3
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">This Week</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              7
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Completed</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              12
            </span>
          </div>
        </div>
      </div>

      {/* User profile + dropdown */}
      <div className="border-t border-gray-200 p-4 relative" ref={flyoutRef}>
        <button
          onClick={() => setFlyoutOpen(!flyoutOpen)}
          className="flex items-center w-full space-x-3 focus:outline-none cursor-pointer"
        >
          <Image
            src={user?.avatar || "/images/avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-semibold text-sm">{user?.name}</p>
            <p className="text-gray-600 text-xs">{user?.email}</p>
          </div>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              flyoutOpen ? "rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Flyout menu opens to the right */}
        {flyoutOpen && (
          <div className="absolute -top-5 left-full ml-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 hover:bg-gray-100 text-gray-700"
              onClick={() => setFlyoutOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
