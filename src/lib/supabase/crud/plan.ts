import { createClient } from "../server";

export async function getPlans() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("plans")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error("Failed to fetch plans");
  }

  return data;
}
