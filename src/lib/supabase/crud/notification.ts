import { createClient } from "@/lib/supabase/server";

export async function getNotifications(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch notifications");
  }

  return data ?? [];
}
