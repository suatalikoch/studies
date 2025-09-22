import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/crud";
import { Header, Navbar, Sidebar } from "@/components/Layout";

export const metadata: Metadata = {
  title: "Studies | Dashboard",
};

export default async function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="max-w-[120rem] h-screen mx-auto flex flex-col bg-white dark:bg-neutral-950">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <Navbar />
    </div>
  );
}
