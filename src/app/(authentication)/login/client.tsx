import LoginForm from "@/components/Authentication/Login/LoginForm";
import { ThemeToggle } from "@/components/UI";
import Banner from "@/components/UI/Special/Banner";
import { NotebookText, Quote } from "lucide-react";
import Link from "next/link";

export default function LoginClient() {
  return (
    <div className="grid min-h-svh lg:grid-cols-[2fr_3fr] bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-4 p-6 md:p-8 border border-l shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2 md:justify-start">
            <Banner />
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-sm text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            <span>By continuing, you agree to Student Hub&apos;s </span>
            <Link href="/terms">Terms of Service</Link>
            <span> and </span>
            <Link href="/privacy">Privacy Policy</Link>
            <span>, and to receive periodic emails with updates.</span>
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <div className="absolute h-full w-full flex justify-center items-center">
          <div className="relative max-w-md flex flex-col gap-4">
            <Quote
              size={60}
              fill="currentColor"
              className="absolute -top-12 -left-12 text-muted-foreground/30 rotate-180"
            />
            <h1 className="text-2xl">
              I’ve always used Student Hub mainly as a note-taking and task
              tracker. Yesterday, I tried helping a classmate set up their
              workspace — no extra tools, just the Hub. The “dashboard” was
              entirely built with the built-in calendar, notes, and progress
              widgets. First time using Student Hub this way. Surprisingly
              complete.
            </h1>
            <div className="flex items-center gap-4">
              <NotebookText size={32} className="text-primary" />
              <h3 className="font-bold text-muted-foreground">@suatalikoch</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
