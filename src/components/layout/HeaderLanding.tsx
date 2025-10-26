"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/hooks";
import { createClient } from "@/lib/supabase/client";
import { Settings } from "lucide-react";
import { Badge, Button, NotificationMenu, ThemeToggle } from "@/components/UI";
import CommandMenu from "@/components/UI/Special/CommandMenu";
import NavigationMenu from "@/components/UI/Special/NavigationMenu";
import Banner from "@/components/UI/Special/Banner";
import UserDropdownMenu from "@/components/UI/Special/UserDropdownMenu";

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
        <div className="flex items-center gap-4">
          <Banner />
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
              <UserDropdownMenu align="end" onLogout={handleLogout}>
                <button
                  onClick={() => setFlyoutOpen(!flyoutOpen)}
                  className="flex focus:outline-none cursor-pointer"
                >
                  <Image
                    src={user.user_metadata.avatar_url || "/images/avatar.png"}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                </button>
              </UserDropdownMenu>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
