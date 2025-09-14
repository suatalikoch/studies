import { createClient } from "@/lib/supabase/server";

export async function getTasks(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch tasks");
  }

  return data ?? [];
}
