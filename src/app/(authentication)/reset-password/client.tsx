"use client";

import { useState, useEffect } from "react";
import { AlertCircle, CheckCheck, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
} from "@/components/UI";

export default function ResetPasswordClient() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [session, setSession] = useState<Session | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  // On mount, check session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setErrors(["Invalid or expired reset link"]);
      } else {
        setSession(data.session);
      }
    });

    // Also listen for auth changes (optional)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setErrors(["You must be authenticated to reset your password"]);
      return;
    }

    if (password.length < 6) {
      setErrors(["Password must be at least 6 characters"]);
      return;
    }

    if (password !== confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    setLoading(true);
    setErrors(null);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setErrors(error.message.split(". "));
    } else {
      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-3 sm:p-6">
      <div className="w-full max-w-md space-y-3 sm:space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <h2 className="text-lg sm:text-2xl font-bold mb-2">
            Reset Your Password
          </h2>
          <p className="text-indigo-100">
            Enter your new password below to update your account password.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="newPassword"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                New Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-400" />
                <Input
                  id="newPassword"
                  type="password"
                  className="pl-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="•••••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading || !!errors}
              className="w-full"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
          {message && (
            <Alert variant="default">
              <CheckCheck />
              <AlertDescription className="text-green-600">
                {message}
              </AlertDescription>
            </Alert>
          )}
          {errors && errors.length === 1 && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{errors[0]}</AlertDescription>
            </Alert>
          )}
          {errors && errors.length > 1 && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Please fix the following errors</AlertTitle>
              <AlertDescription>
                <ul className="list-disc space-y-1 pl-4 mt-2">
                  {errors.map((error, idx) => (
                    <li key={idx}>{error}.</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
