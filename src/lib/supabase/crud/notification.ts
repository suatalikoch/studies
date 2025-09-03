import { createClient } from "../server";

export async function getNotifications() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch notifications");
  }

  return data;
}
