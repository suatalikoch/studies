export interface Deadline {
  id: number;
  title: string;
  subject: string;
  due_date: string;
  priority: "high" | "medium" | "low";
}

export interface ProgressDay {
  day: string;
  completed: number;
  total: number;
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

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  priority: "low" | "medium" | "high";
  category: "Work" | "Personal" | "Shopping" | "Other";
  due_date?: string | null;
  completed: boolean;
  starred: boolean;
  created_at: string;
  updated_at: string;
}

export type CalendarEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  color?: string;
  meta?: string;
};

export interface Plan {
  id?: number;
  name: string;
  price_monthly: number;
  price_yearly: number;
  description: string;
  features: string[];
  button_text: string;
  button_link: string;
  highlighted: boolean;
}

export type BillingCycle = "monthly" | "yearly";
