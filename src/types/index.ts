export interface Deadline {
  id: number;
  title: string;
  subject: string;
  due_date: string; // ISO date string
  priority: "high" | "medium" | "low";
}

export interface Note {
  id: number;
  title: string;
  subject: string;
  updated_at: string; // ISO string or relative string
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
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  highlighted: boolean;
}

export type BillingCycle = "monthly" | "yearly";
