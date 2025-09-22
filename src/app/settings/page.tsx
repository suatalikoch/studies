import { Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsClient from "./client";
import { getCurrentUser } from "@/lib/supabase/crud";
import { Header } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Studies | Settings",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-[120rem] min-h-screen mx-auto flex flex-col">
      <Header />
      <SettingsClient />
    </div>
  );
}
