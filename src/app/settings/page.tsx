import { Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsClient from "./client";
import { getCurrentUser } from "@/lib/supabase/crud";
import { Header } from "@/components/layout";

export const metadata: Metadata = {
  title: "Studies | Settings",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <Header />
      <SettingsClient />
    </div>
  );
}
