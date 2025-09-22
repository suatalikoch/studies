"use client";

import Link from "next/link";
import { GraduationCap, Settings } from "lucide-react";
import { Button, NotificationMenu, ThemeToggle } from "@/components/UI";
import CommandMenu from "@/components/UI/Special/CommandMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-1 bg-white dark:bg-neutral-950 border-b p-2 sm:p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-1">
              <GraduationCap className="size-6" />
            </div>
            <h1 className="text-sm sm:text-2xl font-bold whitespace-nowrap">
              Student Hub
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <CommandMenu />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationMenu />
            <Link href="/settings" className="hidden sm:block">
              <Button title="Settings" variant="ghost" size="icon">
                <Settings className="dark:text-muted-foreground" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
