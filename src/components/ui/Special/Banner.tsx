import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <Link href="/#top" className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground flex items-center justify-center rounded-md p-1">
        <GraduationCap className="size-6" />
      </div>
      <h1 className="text-secondary-foreground text-sm sm:text-xl font-bold whitespace-nowrap">
        Student Hub
      </h1>
    </Link>
  );
}
