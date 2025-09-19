"use client";

import { useState } from "react";
import Link from "next/link";
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

export default function ForgotPasswordForm() {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Forgot your password?</h1>
            <p className="text-sm">
              Type in your email and we’ll send you a link to reset the
              password.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
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
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          Remembered your password?{" "}
        </span>
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}
