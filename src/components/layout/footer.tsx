import { Copyright } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-950 border-t p-3 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <p>
          <span className="flex gap-1 items-center">
            Copyright <Copyright size={16} />
            {new Date().getFullYear()} Student Hub. All rights reserved.
          </span>
        </p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
