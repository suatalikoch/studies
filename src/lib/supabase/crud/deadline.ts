import { createClient } from "../server";

export async function getDeadlines(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deadlines")
    .select("*")
    .eq("user_id", userId)
    .order("due_date", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch deadlines");
  }

  return data;
}
