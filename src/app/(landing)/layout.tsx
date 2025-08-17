import { Footer, HeaderLanding } from "@/components/layout";
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
    <div>
      {/* Header */}
      <HeaderLanding />

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
