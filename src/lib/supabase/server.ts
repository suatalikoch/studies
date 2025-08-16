import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

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

export async function getNotes(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error("Failed to fetch notes");
  }

  return data;
}

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

  return data;
}

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
