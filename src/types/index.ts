export interface Deadline {
  id: number;
  title: string;
  subject: string;
  due_date: string; // ISO date string
  priority: "high" | "medium" | "low";
}

export interface Note {
  id: number;
  user_id: string;
  title: string;
  subject: string;
  content?: string | null;
  tags?: string[] | null;
  status: "draft" | "published" | "archived";
  priority: 1 | 2 | 3 | 4 | 5;
  is_favourite: boolean;
  updated_at: string;
  created_at: string;
}

export interface ProgressDay {
  day: string;
  completed: number;
  total: number;
}

export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // ISO date 'YYYY-MM-DD'
  time?: string; // optional e.g. "10:00 AM"
  color?: string; // Tailwind class e.g. "bg-indigo-500 text-white"
  meta?: string;
};

export interface Plan {
  id?: number; // optional if coming from DB
  name: string;
  price_monthly: number;
  price_yearly: number;
  description: string;
  features: string[]; // stored as array in Supabase (Postgres JSONB)
  button_text: string;
  button_link: string;
  highlighted: boolean;
}

export type BillingCycle = "monthly" | "yearly";
