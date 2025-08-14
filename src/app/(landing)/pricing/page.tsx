import { Metadata } from "next";
import PricingClient from "./client";

export const metadata: Metadata = {
  title: "Studies | Pricing",
};

export default function PricingPage() {
  return <PricingClient />;
}
