import { Metadata } from "next";
import { getCurrentUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Studies | Authentication",
};

export default async function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <div>{children}</div>;
}
