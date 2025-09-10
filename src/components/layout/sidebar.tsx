"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import { sidebarItems } from "@/lib/constants";
import { Skeleton } from "../UI";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    }

    fetchUser();
  }, [supabase.auth]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(event.target as Node)
      ) {
        setFlyoutOpen(false);
      }
    }

    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFlyoutOpen(false);
      }
    }

    if (flyoutOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [flyoutOpen]);

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
    <aside className="hidden sm:w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-600 sm:flex flex-col flex-shrink-0">
      <nav className="p-4 space-y-2 overflow-y-auto flex-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={`/${item.path}`}
              key={item.id}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors text-gray-700 hover:bg-gray-100 cursor-pointer ${
                pathname === `/${item.path}`
                  ? "text-indigo-700 bg-indigo-100 dark:bg-indigo-950 border border-indigo-200"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Quick Statistics
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Due Today
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
              3
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              This Week
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
              7
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300 text-sm">
              Completed
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              12
            </span>
          </div>
        </div>
      </div>
      <div
        className="border-t border-gray-200 dark:border-gray-600 p-4 relative"
        ref={flyoutRef}
      >
        {loading ? (
          <div className="flex items-center w-full space-x-3 focus:outline-none cursor-pointer">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="w-[65%] h-3" />
              <Skeleton className="w-full h-2" />
            </div>
            <Skeleton className="rounded-lg w-7 h-7" />
          </div>
        ) : (
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
              <p className="text-gray-900 dark:text-gray-100 font-semibold text-sm">
                {user?.name}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-xs">
                {user?.email}
              </p>
            </div>
            <div
              className={`rounded-lg p-1 transition-colors ${
                flyoutOpen
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <ChevronDown
                className={`w-5 h-5 text-gray-600 dark:text-gray-300 transition-transform ${
                  flyoutOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
        )}
        {flyoutOpen && (
          <div className="absolute -top-5 left-full ml-2 w-40 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-10">
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 rounded-t-lg"
              onClick={() => setFlyoutOpen(false)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full rounded-b-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-200 cursor-pointer"
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
