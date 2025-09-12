"use client";

import { useState } from "react";
import { AlertCircle, CheckCheck, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
} from "@/components/UI";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setErrors(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // where user lands after reset
    });

    setLoading(false);

    if (error) {
      setErrors(error.message.split(". "));
    } else {
      setMessage("Check your email for password reset instructions.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-3 sm:p-6">
      <div className="w-full max-w-md space-y-3 sm:space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <h2 className="text-lg sm:text-2xl font-bold mb-2">
            Forgot Password?
          </h2>
          <p className="text-indigo-100">
            Enter your email address and we’ll send you a link to reset your
            password.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  className="pl-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Sending..." : "Send Reset Link"}
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
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Remembered your password?{" "}
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
