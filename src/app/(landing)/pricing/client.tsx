"use client";

import { useState } from "react";
import { BillingCycle, Plan } from "@/types";
import BillingToggle from "@/components/Landing/Pricing/BillingToggle";
import PricingCard from "@/components/Landing/Pricing/PricingCard";
import FeatureComparisonTable from "@/components/Landing/Pricing/FeatureComparisonTable";

export default function PricingClient({ plans }: { plans: Plan[] }) {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Choose the plan that&apos;s right for you
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Flexible pricing options for students and educators.
          </p>

          <div className="mt-6 flex justify-center">
            <BillingToggle
              billingCycle={billingCycle}
              setBillingCycle={setBillingCycle}
            />
          </div>
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        <FeatureComparisonTable plans={plans} billingCycle={billingCycle} />
      </div>
    </div>
  );
}
