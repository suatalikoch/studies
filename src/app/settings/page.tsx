import { Metadata } from "next";
import { redirect } from "next/navigation";
import SettingsClient from "./client";
import { getCurrentUser } from "@/lib/supabase/crud";
import { Header } from "@/components/Layout";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Studies | Settings",
};

export default async function SettingsPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SettingsClient />
      <Toaster />
    </div>
  );
}
