"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
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

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Za-z]/, "Password must contain at least a letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();

  const [session, setSession] = useState<Session | null>(null);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onSubmit",
  });

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

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!session) {
      setErrors(["You must be authenticated to reset your password"]);
      return;
    }

    if (data.password.length < 6) {
      setErrors(["Password must be at least 6 characters"]);
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrors(["Passwords do not match"]);
      return;
    }

    setLoading(true);
    setErrors(null);
    setMessage(null);

    const { error } = await supabase.auth.updateUser({
      password: data.password,
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="•••••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="•••••••••••"
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
                {loading ? "Changing..." : "Save new password"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
