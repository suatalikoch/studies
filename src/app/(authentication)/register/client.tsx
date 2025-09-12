"use client";

import { useState } from "react";
import { Lock, User, Mail, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertTitle,
  Button,
  Input,
  Label,
} from "@/components/UI";

export default function RegisterClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setErrors(signUpError.message.split(". "));
    } else {
      setDialogOpen(true);
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 p-3 sm:p-6">
      <div className="w-full max-w-md space-y-3 sm:space-y-6">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <h2 className="text-lg sm:text-2xl font-bold mb-2">
            Create Your Account
          </h2>
          <p className="text-indigo-100">
            Join now and organize your studies like never before.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="fullName"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  className="pl-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
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
            <div>
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-400 mb-2"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-[50%] translate-y-[-50%] w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  className="pl-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••••"
                  required
                />
              </div>
            </div>
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
            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
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
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Email Confirmation.</AlertDialogTitle>
            <AlertDialogDescription>
              Check your email for a confirmation link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
