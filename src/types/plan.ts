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
