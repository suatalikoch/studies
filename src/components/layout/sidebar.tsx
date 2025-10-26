"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useKeyboardShortcuts, usePersistentState } from "@/hooks";
import { sidebarItems } from "@/lib/constants";
import { Badge, Skeleton } from "@/components/UI";
import UserDropdownMenu from "@/components//UI/Special/UserDropdownMenu";
import { ChevronDown } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const [collapsed, setCollapsed] = usePersistentState<boolean>(
    "sidebar-collapsed",
    false
  );
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

  useKeyboardShortcuts({
    shortcuts: [
      { combo: "ctrl+s", handler: () => setCollapsed((prev) => !prev) },
      { combo: "meta+s", handler: () => setCollapsed((prev) => !prev) },
    ],
  });

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Error logging out: " + error.message);
      return;
    }

    setUser(null);
    setFlyoutOpen(false);
    router.push("/login");
  }

  return (
    <aside
      className={`hidden bg-white dark:bg-neutral-950 border-r sm:flex flex-col flex-shrink-0 ${
        collapsed ? "sm:w-16" : "sm:w-64"
      } transition-all duration-100 `}
    >
      <nav
        className={`flex flex-col gap-2 overflow-y-auto flex-1 ${
          collapsed ? "p-2" : "p-4"
        }`}
      >
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              href={`/${item.path}`}
              key={item.id}
              className={`w-full flex items-center gap-3 rounded-lg transition-colors hover:bg-neutral-100 cursor-pointer ${
                pathname === `/${item.path}`
                  ? "text-primary bg-neutral-100 dark:bg-neutral-900 border"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-900"
              } ${collapsed ? "justify-center aspect-square" : "px-4 py-3"}`}
            >
              <Icon className="w-5 h-5" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        {collapsed ? (
          <div className="flex flex-col gap-2 items-center">
            <Badge className="bg-red-100 text-red-800">3</Badge>
            <Badge className="bg-yellow-100 text-yellow-800">7</Badge>
            <Badge className="bg-green-100 text-green-800">12</Badge>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-semibold mb-3 truncate">
              Quick Statistics
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm truncate">
                  Due Today
                </span>
                <Badge className="bg-red-100 text-red-800">3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm truncate">
                  This Week
                </span>
                <Badge className="bg-yellow-100 text-yellow-800">7</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm truncate">
                  Completed
                </span>
                <Badge className="bg-green-100 text-green-800">12</Badge>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={`border-t relative ${
          collapsed ? "p-2 aspect-square" : "p-4"
        }`}
        ref={flyoutRef}
      >
        {loading ? (
          <div className="flex items-center w-full gap-3 focus:outline-none cursor-pointer">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="w-[65%] h-3" />
              <Skeleton className="w-full h-2" />
            </div>
            <Skeleton className="rounded-lg w-7 h-7" />
          </div>
        ) : (
          <UserDropdownMenu align="start" onLogout={handleLogout}>
            <button
              className={`flex items-center w-full focus:outline-none cursor-pointer ${
                collapsed ? "flex items-center justify-center h-full" : "gap-3"
              }`}
            >
              <Image
                src={user?.avatar || "/images/avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              {!collapsed && (
                <div className="flex-1 text-left min-w-0">
                  <p className="font-semibold text-sm truncate">{user?.name}</p>
                  <p className="text-muted-foreground text-xs truncate">
                    {user?.email}
                  </p>
                </div>
              )}
              {!collapsed && (
                <div
                  className={`rounded-lg p-1 transition-colors ${
                    flyoutOpen
                      ? "bg-neutral-200 dark:bg-neutral-700"
                      : "hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      flyoutOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
            </button>
          </UserDropdownMenu>
        )}
      </div>
    </aside>
  );
}
