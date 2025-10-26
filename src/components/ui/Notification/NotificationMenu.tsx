"use client";

import { useEffect, useState } from "react";
import { Bell, BellDot, Inbox } from "lucide-react";
import { Notification } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/UI";

export default function NotificationMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [archivedNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const supabase = createClient();

    setLoading(true);

    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching notifications:", error);
      } else {
        setNotifications(data || []);
      }

      setLoading(false);
    };

    fetchNotifications();

    // Set up real-time subscription
    const channel = supabase
      .channel(`notifications:user:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);
          console.log("Payload received:", payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button title="Notifications" variant="ghost" size="icon">
            <Bell className="w-5 h-5 dark:text-muted-foreground" />
          </Button>
          {unreadCount > 0 && (
            <span className="absolute -top-0.75 -right-0.75 w-4 h-4 inline-flex items-center justify-center text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent align="end" className="sm:w-108 p-0">
        <div className="flex flex-col gap-3">
          <p className="mx-4 mt-4">Notifications</p>
          <Tabs defaultValue="inbox">
            <TabsList className="mx-4">
              <TabsTrigger value="inbox">
                Inbox
                <span className="w-4 h-4 inline-flex items-center justify-center text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {notifications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
            <TabsContent value="inbox" className="border-t dark:bg-neutral-950">
              {loading ? (
                <span>Loading...</span>
              ) : notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex flex-col hover:bg-neutral-100 hover:dark:bg-neutral-800 cursor-pointer transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5">
                      <BellDot size={16} />
                      <span className="text-sm">{notification.message}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-92 flex flex-col items-center justify-center text-center gap-1">
                  <Inbox size={28} className="text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">All caught up</p>
                  <span className="max-w-xs text-muted-foreground/75 text-xs">
                    you will be notified here for any notices on your
                    organizations and projects
                  </span>
                </div>
              )}
            </TabsContent>
            <TabsContent
              value="archived"
              className="border-t dark:bg-neutral-950 p-4"
            >
              {loading ? (
                <span>Loading...</span>
              ) : archivedNotifications.length > 0 ? (
                archivedNotifications.map((archivedNotification) => (
                  <div
                    key={archivedNotification.id}
                    className="flex flex-col hover:bg-neutral-100 hover:dark:bg-neutral-800 cursor-pointer transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 px-3 py-2.5">
                      <BellDot size={16} />
                      <span className="text-sm">
                        {archivedNotification.message}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-92 flex flex-col items-center justify-center text-center gap-1">
                  <Inbox size={28} className="text-muted-foreground" />
                  <p className="text-muted-foreground text-sm">
                    No archived notifications
                  </p>
                  <span className="max-w-xs text-muted-foreground/75 text-xs">
                    Notifications that you have previously archived will be
                    shown here
                  </span>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        {/* 
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : notifications.length > 0 ? (
          notifications.slice(0, 5).map((n) => (
            <DropdownMenuItem key={n.id}>
              <BellDot />
              {n.message}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/notifications">View all</Link>
        </DropdownMenuItem>
          */}
      </PopoverContent>
    </Popover>
  );
}
