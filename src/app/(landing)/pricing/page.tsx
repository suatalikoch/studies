import { Metadata } from "next";
import PricingClient from "./client";
import { getPlans } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Studies | Pricing",
};

export default async function PricingPage() {
  const plans = await getPlans();

  return <PricingClient plans={plans} />;
}
