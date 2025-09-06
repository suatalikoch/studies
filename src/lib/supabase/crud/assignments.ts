import { createClient } from "../server";

export async function getAssignments(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("assignments")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch assignments");
  }

  return data;
}
