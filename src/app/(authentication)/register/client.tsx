"use client";

import { useState } from "react";
import { Lock, User, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //- Sign up with Supabase
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name, // Store name in user_metadata
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
    } else {
      // Optional: show confirmation message about email verification
      alert("Check your email for a confirmation link.");

      // Optionally redirect to login page or dashboard
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
          <p className="text-indigo-100">
            Join now and organize your studies like never before.
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-400">
                  <User className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  className="flex-1 px-3 py-2 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  className="flex-1 px-3 py-2 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-400">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  className="flex-1 px-3 py-2 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 font-medium">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Additional Links */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-600 dark:text-indigo-500 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
