"use client";

import { Button } from "@/components/UI";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="max-w-[120rem] min-h-screen mx-auto flex flex-col items-center justify-center bg-red-50 px-6 py-12">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-red-700 mb-6">
          Sorry, something went wrong on our end.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            variant="destructive"
            onClick={() => router.push("/")}
            aria-label="Go back home"
          >
            Go Home
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.back()}
            aria-label="Go back to previous page"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
