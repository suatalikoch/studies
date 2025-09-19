"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Notification } from "@/types";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/hooks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI";

export default function NotificationMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <Button title="Notifications" variant="ghost" size="icon">
            <Bell className="w-5 h-5 dark:text-gray-400" />
          </Button>
          {unreadCount > 0 && (
            <span className="absolute -top-0.75 -right-0.75 w-4 h-4 inline-flex items-center justify-center text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-5 mr-1 sm:w-96">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : notifications.length > 0 ? (
          notifications
            .slice(0, 5)
            .map((n) => (
              <DropdownMenuItem key={n.id}>{n.message}</DropdownMenuItem>
            ))
        ) : (
          <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/notifications">View all</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
