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

export interface BillingToggleProps {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}

export interface AnimatedPriceProps {
  price: number;
}

export interface FeatureComparisonTableProps {
  plans: Plan[];
  billingCycle: BillingCycle;
}

export interface PricingCardProps {
  plan: Plan;
  billingCycle: BillingCycle;
}
