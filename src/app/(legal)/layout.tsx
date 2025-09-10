import { Footer, HeaderLanding } from "@/components/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studies | Legal",
};

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      <HeaderLanding />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
