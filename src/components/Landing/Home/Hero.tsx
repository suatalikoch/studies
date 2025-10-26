import Link from "next/link";
import { useUser } from "@/hooks";
import { Button } from "@/components/UI";

export default function Hero() {
  const { user } = useUser();

  return (
    <section className="relative" role="banner">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-25 right-20 w-36 h-36 bg-primary rounded-full opacity-50 animate-pulse delay-2000"></div>
      </div>
      <div className="relative px-3 sm:px-6 py-10 sm:py-28 text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2">
          All in one
        </h1>
        <h1 className="text-primary text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-8">
          Study workspace
        </h1>
        <p className="sm:text-lg max-w-2xl mx-auto mb-8">
          Organize your notes, track assignments, and boost your productivity
          with our modern and intuitive student dashboard. Stay on top of your
          studies with smart reminders and easy-to-use tools tailored for
          students.
        </p>
        {!user ? (
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button>Start your study</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="bg-transparent">
                Sign in
              </Button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
