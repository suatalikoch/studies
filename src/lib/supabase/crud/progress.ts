import { createClient } from "../server";

export async function getProgress(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("progress")
    .select("*")
    .eq("user_id", userId)
    .order("day", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch progress");
  }

  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sortedData = data.sort((a, b) => {
    return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
  });

  return sortedData;
}
