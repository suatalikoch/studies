"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/hooks";
import { createClient } from "@/lib/supabase/client";
import { GraduationCap, LogOut, Settings } from "lucide-react";
import { Badge, Button, NotificationMenu, ThemeToggle } from "@/components/UI";
import CommandMenu from "@/components/UI/Special/CommandMenu";
import NavigationMenu from "@/components/UI/Special/NavigationMenu";

export default function HeaderLanding() {
  const { user } = useUser();
  const [flyoutOpen, setFlyoutOpen] = useState(false);
  const flyoutRef = useRef<HTMLDivElement>(null);

  async function handleLogout() {
    const { error } = await createClient().auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
    } else {
      setFlyoutOpen(false);
    }
  }

  return (
    <header className="sticky top-0 z-1 bg-white dark:bg-neutral-950 border-b p-2 sm:p-4 flex-shrink-0 overflow-x-auto sm:overflow-x-visible">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/#top" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-1">
              <GraduationCap className="size-6" />
            </div>
            <h1 className="text-sm sm:text-2xl font-bold whitespace-nowrap">
              Student Hub
            </h1>
          </Link>
          <NavigationMenu />
        </div>
        <div className="flex items-center gap-4">
          <CommandMenu />
          {user && (
            <Link href="/dashboard">
              <Badge className="px-3 py-1">Dashboard</Badge>
            </Link>
          )}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user && <NotificationMenu />}
            {!user && (
              <Link href="/settings" className="hidden sm:block">
                <Button title="Settings" variant="ghost" size="icon">
                  <Settings className="dark:text-muted-foreground" />
                </Button>
              </Link>
            )}
          </div>
          {user && (
            <div className="relative" ref={flyoutRef}>
              <button
                onClick={() => setFlyoutOpen(!flyoutOpen)}
                className="flex items-center w-full focus:outline-none cursor-pointer gap-3"
              >
                <Image
                  src={user.user_metadata.avatar_url || "/images/avatar.png"}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              </button>
              {flyoutOpen && (
                <div className="absolute -bottom-26 -right-4 ml-2 w-40 bg-white dark:bg-neutral-950 border rounded-lg shadow-lg z-10">
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-200 rounded-t-lg"
                    onClick={() => setFlyoutOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full rounded-b-lg px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-700 dark:text-neutral-200 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
