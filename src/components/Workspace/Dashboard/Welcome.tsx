import type { Deadline } from "@/types";
import { useUser } from "@/hooks/useUser";

export default function Welcome({ deadlines }: { deadlines: Deadline[] }) {
  const user = useUser();

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
      <h2 className="text-2xl font-bold mb-2">
        Welcome back, {user?.user_metadata?.full_name}!
      </h2>
      <p className="text-indigo-100">
        You have {deadlines.length} assignments due this week. Let&apos;s stay
        on track!
      </p>
    </div>
  );
}
