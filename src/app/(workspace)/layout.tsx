import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/crud";
import { Header, Navbar, Sidebar } from "@/components/Layout";
import { Toaster } from "@/components/UI";

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
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
          <Toaster />
        </main>
      </div>
      <Navbar />
    </div>
  );
}
