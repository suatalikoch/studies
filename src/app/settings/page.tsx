import { Metadata } from "next";
import { getCurrentUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SettingsClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Settings",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <SettingsClient />;
}
