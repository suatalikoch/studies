import { Footer, HeaderLanding } from "@/components/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studies | Landing",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[120rem] min-h-screen mx-auto flex flex-col bg-white dark:bg-neutral-950">
      <HeaderLanding />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
