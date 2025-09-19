"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Input,
  Label,
} from "@/components/UI";

export default function ResetPasswordForm() {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Change your password</h1>
            <p className="text-sm">
              Choose a new strong password and save it to proceed.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="password">New password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••••••"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="•••••••••••"
                required
              />
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
            <hr className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t" />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Changing..." : "Save new password"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
