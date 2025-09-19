import { Skeleton } from "@/components/UI";
import { useUser } from "@/hooks";

interface WelcomeProps {
  deadlinesCount: number;
}

export default function Welcome({ deadlinesCount }: WelcomeProps) {
  const { user, loading } = useUser();

  return (
    <div className="bg-gradient-to-r from-indigo-600 dark:from-indigo-700 to-purple-600 dark:to-purple-700 rounded-lg p-6 text-white">
      {loading ? (
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-lg sm:text-2xl font-bold mb-2">Welcome back, </h2>
          <Skeleton className="w-38 h-6" />
        </div>
      ) : (
        <h2 className="text-lg sm:text-2xl font-bold mb-2">
          Welcome back, {user?.user_metadata?.full_name || "Full Name"}!
        </h2>
      )}
      <p className="text-indigo-100">
        You have {deadlinesCount} assignments due this week. Let&apos;s stay on
        track!
      </p>
    </div>
  );
}
