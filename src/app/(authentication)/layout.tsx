import { getCurrentUser } from "@/lib/supabase/crud";
import { Metadata } from "next";
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

  return <div className="max-w-[120rem] mx-auto">{children}</div>;
}
