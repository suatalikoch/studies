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

  // Google OAuth sign-in handler
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // You can specify redirect URL here or configure in Supabase dashboard
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    setLoading(false);

    if (oAuthError) {
      setError(oAuthError.message);
      return;
    }
    // No need to manually redirect because supabase will redirect user to Google OAuth and back
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

          {/* Google Sign-In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-18.8-1.5-37-4.6-54.6H272v103.3h146.9c-6.3 33.8-25.3 62.4-54.4 81.4v67.4h87.7c51.3-47.2 80.3-116.7 80.3-197.5z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c73.8 0 135.8-24.5 181-66.3l-87.7-67.4c-24.4 16.4-55.5 26-93.3 26-71.7 0-132.5-48.5-154.3-113.6H29.6v70.8c45.5 89.3 138.9 150.5 242.4 150.5z"
                fill="#34A853"
              />
              <path
                d="M117.7 323.5c-10.4-31.6-10.4-65.9 0-97.5v-70.8H29.6c-40.5 80.3-40.5 175.7 0 256l88.1-70.7z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.7c39.9 0 75.8 13.7 104 40.7l78-78C405 24.9 344.3 0 272 0 168.5 0 75.1 61.2 29.6 150.5l88.1 70.8c21.8-65.1 82.6-113.6 154.3-113.6z"
                fill="#EA4335"
              />
            </svg>
            {loading ? "Processing..." : "Sign in with Google"}
          </button>

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
