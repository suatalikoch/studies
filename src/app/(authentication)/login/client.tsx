"use client";

import { useState } from "react";
import { Lock, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginClient() {
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

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // After login, refresh to get latest server session state
    router.refresh();

    // Redirect to dashboard after successful login
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Welcome Banner (matches Dashboard style) */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-indigo-100">
            Sign in to continue to your study workspace.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="px-3 text-gray-400">
                  <User className="w-5 h-5" />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Additional Links */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Don’t have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
            <p>
              <Link
                href="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
