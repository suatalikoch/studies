import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "./theme.css";
import CookieConsent from "@/components/UI/Special/CookieConsent";
import { Toaster } from "@/components/UI";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Studies | Home",
  description:
    "Organize and manage your study workspace effectively with this dashboard.",
  keywords: [
    "studies",
    "workspace",
    "dashboard",
    "student planner",
    "education",
  ],
  authors: [{ name: "Asteilia Corporation" }],
  openGraph: {
    title: "Studies | Workspace",
    description: "Manage your study schedule and workspace all in one place.",
    url: "https://studies.com/workspace",
    siteName: "Studies",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Studies Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studies | Workspace",
    description: "Organize your study schedule and workspace.",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Studies Banner",
      },
    ],
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
          <div>
            <Toaster
              duration={5000}
              position="bottom-right"
              richColors
              closeButton
            />
            <CookieConsent />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
