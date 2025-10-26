"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
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

const LoginSchema = z.object({
  email: z.email("Must be a valid email"),
  password: z.string().nonempty("Password is required"),
});

type LoginFormValues = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [lastLoginMethod, setLastLoginMethod] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastMethod = localStorage.getItem("lastLoginMethod");
      setLastLoginMethod(lastMethod);
    }
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setErrors(null);

    const toastInfoId = toast.info("Signing in...", {
      position: "top-right",
      duration: 0,
    });

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false);
    toast.dismiss(toastInfoId);

    let toastErrorId;

    if (signInError) {
      toastErrorId = toast.error(signInError.message.split(". "), {
        position: "top-right",
      });
      setErrors(signInError.message.split(". "));
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("lastLoginMethod", "email");
    }

    // After login, refresh to get latest server session state
    router.refresh();

    // Redirect to dashboard after successful login
    router.replace("/dashboard");

    toast.dismiss(toastErrorId);
    toast.success("Signed in successfully", { position: "top-right" });
  };

  // Google OAuth sign-in handler
  const handleGoogleSignIn = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastLoginMethod", "google");
    }

    setLoading(true);
    setErrors(null);

    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // You can specify redirect URL here or configure in Supabase dashboard
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard&method=google`,
      },
    });

    setLoading(false);

    if (oAuthError) {
      setErrors(oAuthError.message.split(". "));
      return;
    }
    // No need to manually redirect because supabase will redirect user to Google OAuth and back
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
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-sm">
                Sign in to continue to your study workspace.
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
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
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background dark:bg-neutral-900 relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                className="relative w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 533.5 544.3"
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
                {loading ? "Processing..." : "Continue with Google"}
                {lastLoginMethod === "google" && (
                  <Badge className="absolute top-0 right-0 translate-x-[50%] translate-y-[-50%] text-xs">
                    Last used
                  </Badge>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don’t have an account? </span>
          <Link href="/register" className="underline underline-offset-4">
            Sign up now
          </Link>
        </div>
      </form>
    </Form>
  );
}
