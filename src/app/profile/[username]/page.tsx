import { notFound } from "next/navigation";
import { getProfileByUsername } from "@/lib/supabase/crud";
import ProfileClient from "./client";

export interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const profile = await getProfileByUsername(username);

  if (!profile) return notFound();

  return <ProfileClient profile={profile} />;
}
