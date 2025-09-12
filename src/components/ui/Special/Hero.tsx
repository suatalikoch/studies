import Link from "next/link";
import { useUser } from "@/hooks/useUser";

export default function Hero() {
  const user = useUser();

  return (
    <section
      className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
      role="banner"
    >
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-25 right-20 w-36 h-36 bg-purple-500 rounded-full opacity-50 animate-pulse delay-2000"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-3 sm:px-6 py-10 sm:py-20 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
          All-in-One Study Workspace
        </h1>
        <p className="sm:text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
          Organize your notes, track assignments, and boost your productivity
          with our modern and intuitive student dashboard.
        </p>
        {!user ? (
          <div className="flex justify-center gap-4">
            <Link
              href="/register"
              className="self-center text-sm bg-white text-indigo-600 font-semibold px-4 py-2 rounded-md shadow-md
                  hover:scale-105 hover:opacity-90 transition-transform focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="self-center text-sm bg-transparent border border-white font-semibold px-4 py-2 rounded-md
                  hover:bg-white hover:scale-105 hover:text-indigo-600 transition-transform transition-colors focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Sign In
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
