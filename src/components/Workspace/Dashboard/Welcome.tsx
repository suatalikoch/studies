import { useUser } from "@/hooks";

interface WelcomeProps {
  deadlinesCount: number;
}

export default function Welcome({ deadlinesCount }: WelcomeProps) {
  const user = useUser();

  return (
    <div className="bg-gradient-to-r from-indigo-600 dark:from-indigo-700 to-purple-600 dark:to-purple-700 rounded-lg p-6 text-white">
      <h2 className="text-lg sm:text-2xl font-bold mb-2">
        Welcome back, {user?.user_metadata?.full_name}!
      </h2>
      <p className="text-indigo-100">
        You have {deadlinesCount} assignments due this week. Let&apos;s stay on
        track!
      </p>
    </div>
  );
}
