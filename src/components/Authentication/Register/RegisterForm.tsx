"use client";

import { useState } from "react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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

const RegisterSchema = z.object({
  full_name: z.string().nonempty("Full name is required"),
  email: z.email("Must be a valid email"),
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
});

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setErrors(null);

    const toastInfoId = toast.info("Creating account...", {
      position: "top-right",
      duration: 0,
    });

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
          },
        },
      }
    );

    setLoading(false);
    toast.dismiss(toastInfoId);

    if (signUpError) {
      toast.error(signUpError.message.split(". "), { position: "top-right" });
      setErrors(signUpError.message.split(". "));
      return;
    }

    toast.success("Account created successfully!", { position: "top-right" });
    setDialogOpen(true);

    const user = signUpData?.user;

    if (user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          user_id: user.id,
          display_name: data.full_name,
          username: generateUsername(data.full_name),
          avatar_url: user.user_metadata.avatar_url,
        },
      ]);

      if (profileError) {
        console.error("Error creating profile:", profileError);
        toast.error("Profile could not be created. Contact support.");
        return;
      }
    }
  };

  const handleGoogleSignUp = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastLoginMethod", "google");
    }

    setLoading(true);
    setErrors(null);

    const toastInfoId = toast.info("Redirecting to Google...", {
      position: "top-right",
      duration: 0,
    });

    const { error: oAuthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`, // where user goes after signup
      },
    });

    setLoading(false);
    toast.dismiss(toastInfoId);

    if (oAuthError) {
      toast.error(oAuthError.message.split(". "), { position: "top-right" });
      setErrors(oAuthError.message.split(". "));
      return;
    }

    // No manual redirect needed — Supabase handles OAuth redirect
  };

  function generateUsername(fullName: string) {
    return (
      fullName.trim().toLowerCase().replace(/\s+/g, "") +
      crypto.randomUUID().slice(0, 4)
    );
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Card>
            <CardContent>
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Create your account!</h1>
                <p className="text-sm">
                  Join now and organize your studies like never before.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          id="full_name"
                          placeholder="John Doe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-3">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
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
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-background dark:bg-neutral-900 relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignUp}
                  className="w-full"
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
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link href="/login" className="underline underline-offset-4">
              Sign in now
            </Link>
          </div>
        </form>
      </Form>
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
                router.push("/login");
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
