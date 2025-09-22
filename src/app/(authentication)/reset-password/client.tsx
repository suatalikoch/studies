import Link from "next/link";
import ResetPasswordForm from "@/components/Authentication/ResetPassword/ResetPassword";
import { GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/UI";

export default function ResetPasswordClient() {
  return (
    <div className="grid min-h-svh bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-4 p-6 md:p-8 border border-l shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2 md:justify-start">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-1">
                <GraduationCap className="size-6" />
              </div>
              <h1 className="text-sm sm:text-2xl font-bold whitespace-nowrap">
                Student Hub
              </h1>
            </Link>
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <ResetPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
}
