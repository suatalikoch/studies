import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Header, Sidebar } from "@/components/layout";
import { getCurrentUser } from "@/lib/supabase/crud";

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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
