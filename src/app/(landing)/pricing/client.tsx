"use client";

import { useState } from "react";
import { BillingCycle, Plan } from "@/types";
import BillingToggle from "@/components/Landing/Pricing/BillingToggle";
import PricingCard from "@/components/Landing/Pricing/PricingCard";
import FeatureComparisonTable from "@/components/Landing/Pricing/FeatureComparisonTable";
import Link from "next/link";
import { Button } from "@/components/UI";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function PricingClient({ plans }: { plans: Plan[] }) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="py-8 sm:py-16">
      <div className="flex flex-col gap-6 sm:gap-12 px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-lg sm:text-3xl font-bold">
            Choose the plan that&apos;s right for you
          </h2>
          <p className="mt-4 sm:text-lg text-muted-foreground">
            Flexible pricing options for students and educators.
          </p>
          <div className="mt-6 flex justify-center">
            <BillingToggle
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
            />
          </div>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
            />
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Link href="/pricing/#compare-plans">
            <Button size="sm" variant="secondary" className="text-xs">
              Compare Plans
              <ArrowDown />
            </Button>
          </Link>
          <Link href="#">
            <Button size="sm" variant="outline" className="text-xs">
              Learn how billing works
              <ArrowUpRight />
            </Button>
          </Link>
        </div>
        <FeatureComparisonTable plans={plans} billingCycle={billingCycle} />
      </div>
    </div>
  );
}
