import { createClient } from "../server";

export async function getExams(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch exams");
  }

  return data;
}
