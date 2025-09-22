import { redirect } from "next/navigation";
import ProfileClient from "./client";
import { getCurrentUser } from "@/lib/supabase/crud";

export interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;

  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return <ProfileClient user={user} />;
}
