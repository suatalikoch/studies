"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/UI";

const ForgotPasswordSchema = z.object({
  email: z.email("Must be a valid email"),
});

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const supabase = createClient();

  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setMessage(null);
    setErrors(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setErrors(error.message.split(". "));
      return;
    }

    setMessage("Check your email for password reset instructions.");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <ul className="flex flex-col gap-1 list-disc pl-4 mt-2">
                      {errors.map((error, idx) => (
                        <li key={idx}>{error}.</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              {message && (
                <Alert>
                  <AlertCircle />
                  <AlertDescription>{message}</AlertDescription>
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
    </Form>
  );
}
