import { BillingCycle, Plan } from "@/types";

export const formatPrice = (plan: Plan, cycle: BillingCycle) =>
  cycle === "monthly"
    ? plan.price_monthly === 0
      ? "$0"
      : `$${plan.price_monthly.toFixed(2)}`
    : plan.price_yearly === 0
    ? "$0"
    : `$${plan.price_yearly.toFixed(2)}`;
