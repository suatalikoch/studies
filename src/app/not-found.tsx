"use client";

import { Button, ThemeToggle } from "@/components/UI";
import Banner from "@/components/UI/Special/Banner";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="grid min-h-svh bg-neutral-50 dark:bg-neutral-950">
      <div className="flex flex-col gap-4 p-6 md:p-8 border border-l shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center gap-2 md:justify-start">
            <Banner />
          </div>
          <ThemeToggle />
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="absolute flex flex-col gap-6 z-1">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl text-center">Looking for something?</h2>
              <p className="text-center">
                We could&apos;t find the page that you&apos;re looking for!
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Button onClick={() => router.back()}>Head back</Button>
            </div>
          </div>
          <div className="absolute blur z-0">
            <h1 className="text-[26rem] text-neutral-200 dark:text-neutral-800 font-bold">
              404
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
