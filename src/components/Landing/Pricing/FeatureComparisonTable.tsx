import { Button } from "@/components/UI";
import { formatPrice } from "@/lib/utils/pricing";
import { FeatureComparisonTableProps } from "@/types";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function FeatureComparisonTable({
  plans,
  billingCycle,
}: FeatureComparisonTableProps) {
  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)));

  return (
    <div className="mt-12 overflow-x-auto rounded-lg">
      <table className="w-full bg-white dark:bg-neutral-950 rounded-lg shadow-md overflow-hidden text-left">
        <thead>
          <tr>
            <th className="border p-4">Features</th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                className={`border p-4 text-center ${
                  plan.highlighted && "bg-primary/10"
                }`}
              >
                <div className="text-xl font-semibold">{plan.name}</div>
                <div className="mt-2 text-3xl font-bold text-primary">
                  {formatPrice(plan, billingCycle)}
                  <span className="text-lg text-muted-foreground">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">
                  {plan.description}
                </p>
                {plan.highlighted && (
                  <div className="mt-2 bg-primary text-secondary text-xs font-bold px-2 py-1 rounded-full inline-block">
                    Best
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allFeatures.map((feature) => (
            <tr key={feature}>
              <td className="border p-4 text-muted-foreground">{feature}</td>
              {plans.map((plan) => (
                <td key={plan.name + feature} className="border p-4">
                  <div className="flex items-center justify-center">
                    {plan.features.includes(feature) ? (
                      <Check className="text-green-500" />
                    ) : (
                      <X className="text-red-500" />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="border p-4"></td>
            {plans.map((plan) => (
              <td key={plan.name + "btn"} className="border p-4 text-center">
                <Link href={plan.button_link}>
                  <Button
                    variant={`${plan.highlighted ? "default" : "secondary"}`}
                  >
                    {plan.button_text}
                  </Button>
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
