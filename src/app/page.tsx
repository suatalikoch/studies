"use client";

import { Footer, HeaderLanding } from "@/components/Layout";
import { Features, Hero, Preview, Testimonials } from "@/components/UI";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderLanding />
      <Hero />
      <Features />
      <Preview />
      <Testimonials />
      <Footer />
    </div>
  );
}
