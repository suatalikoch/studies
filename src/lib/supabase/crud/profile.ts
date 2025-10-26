import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types";

export async function getProfileByUsername(username: string) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "id, username, display_name, bio, avatar_url, website, social, is_public"
    )
    .eq("username", username)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to fetch profile");
  }

  return profile as Profile;
}

export async function getProfileByUserId(user_id: string) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "id, user_id, username, display_name, bio, avatar_url, website, social, is_public"
    )
    .eq("user_id", user_id)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to fetch profile");
  }

  return (profile as Profile) ?? [];
}
