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
