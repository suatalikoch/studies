export interface Profile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio?: string | null;
  avatar_url?: string | null;
  website: string | null;
  social: string[] | null;
  is_public: boolean;
  updated_at: string;
  created_at: string;
}
