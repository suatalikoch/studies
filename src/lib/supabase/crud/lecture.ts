import { createClient } from "@/lib/supabase/server";

export async function getLectures(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("lectures")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch lectures");
  }

  return data ?? [];
}
