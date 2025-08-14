import { Metadata } from "next";
import HeaderLanding from "@/components/layout/header-landing";
import Footer from "@/components/layout/footer";

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
