"use client";

import { Footer, HeaderLanding } from "@/components/Layout";
import { Features, Hero, Preview, Testimonials } from "@/components/UI";

export default function HomePage() {
  return (
    <div className="max-w-[120rem] min-h-screen mx-auto flex flex-col">
      <HeaderLanding />
      <Hero />
      <Features />
      <Preview />
      <Testimonials />
      <Footer />
    </div>
  );
}
