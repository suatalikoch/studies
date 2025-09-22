import { User } from "@supabase/supabase-js";

export interface ProfileClientProps {
  user: User;
}

export default function ProfileClient({ user }: ProfileClientProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex-1">
        <h1>Profile Page</h1>
        <img src={user.user_metadata.avatar_url} alt="Avatar" />
        <h3>{user.user_metadata.name}</h3>
      </div>
    </div>
  );
}
