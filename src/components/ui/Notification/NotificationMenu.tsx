"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Notification } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
} from "@/components/UI";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

export default function NotificationMenu() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

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

  useEffect(() => {
    const interval = setInterval(() => {
      toast("This is a toast notification!", {
        description: "Every 10 minutes for development and testing.",
        duration: 10000,
        position: "bottom-right",
        richColors: true,
        closeButton: true,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="relative">
          <IconButton label="Notifications">
            <Bell className="w-5 h-5" />
          </IconButton>
          {unreadCount > 0 && (
            <span className="absolute -top-0.75 -right-0.75 w-4 h-4 inline-flex items-center justify-center text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mt-5 mr-1 w-96">
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
