"use client";

import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-6 py-12">
      <div className="max-w-md text-center">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">Oops!</h1>
        <p className="text-lg text-red-700 mb-6">
          Sorry, something went wrong on our end.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition"
            aria-label="Go back home"
          >
            Go Home
          </button>
          <button
            onClick={() => router.back()}
            className="inline-block bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-400 transition"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
