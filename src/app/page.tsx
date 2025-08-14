"use client";

import Footer from "@/components/layout/footer";
import HeaderLanding from "@/components/layout/header-landing";
import Testimonials from "@/components/ui/testimonials";
import { FileText, Clock, CheckSquare, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    Icon: FileText,
    title: "Organize Notes",
    desc: "Keep all your lecture notes in one place with easy access and search.",
    color: "text-blue-600",
  },
  {
    Icon: BookOpen,
    title: "Track Assignments",
    desc: "Never miss a deadline again with smart reminders and priority tags.",
    color: "text-orange-600",
  },
  {
    Icon: CheckSquare,
    title: "Manage Tasks",
    desc: "Plan, complete, and review your daily tasks efficiently.",
    color: "text-green-600",
  },
  {
    Icon: Clock,
    title: "Track Study Time",
    desc: "Monitor how much time you spend studying to improve productivity.",
    color: "text-purple-600",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <HeaderLanding />

      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
        role="banner"
      >
        {/* Decorative shapes */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-25 right-20 w-36 h-36 bg-purple-500 rounded-full opacity-50 animate-pulse delay-2000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All-in-One Study Workspace
          </h1>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
            Organize your notes, track assignments, and boost your productivity
            with our modern and intuitive student dashboard.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow-md
          hover:scale-105 hover:opacity-90 transition-transform focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-white font-semibold px-6 py-3 rounded-lg
          hover:bg-white hover:scale-105 hover:text-indigo-600 transition-transform transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, desc, color }, idx) => (
          <div
            key={idx}
            role="listitem"
            tabIndex={0}
            className="bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer
      focus:outline-none focus:ring-4 focus:ring-indigo-300
      hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <Icon
              aria-hidden="true"
              className={`w-10 h-10 mx-auto mb-4 ${color}`}
            />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{desc}</p>
          </div>
        ))}
      </section>

      {/* Preview Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">See It In Action</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our dashboard is designed for simplicity and efficiency — everything
            you need is just a click away.
          </p>
          <div className="rounded-xl shadow-lg overflow-hidden">
            {/* Replace this with your real screenshot */}
            <Image
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fgraduation-pictures-pz75cc67t4ica92t.jpg&f=1&nofb=1&ipt=31eae468326614722591fbd387aeab713f03fd920b8fc09bf919a870441c11a6"
              alt="Graduation"
              width={800} // set appropriate width
              height={450} // set appropriate height
              className="w-full rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
