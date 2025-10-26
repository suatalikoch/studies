import ResetPasswordForm from "@/components/Authentication/ResetPassword/ResetPassword";
import { ThemeToggle } from "@/components/UI";
import Banner from "@/components/UI/Special/Banner";

export default function ResetPasswordClient() {
  return (
    <div className="grid min-h-svh bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-4 p-6 md:p-8 border border-l shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2 md:justify-start">
            <Banner />
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
