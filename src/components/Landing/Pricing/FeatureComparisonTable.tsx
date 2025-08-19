import { formatPrice } from "@/lib/utils/pricing";
import { BillingCycle, Plan } from "@/types";
import Link from "next/link";

export default function FeatureComparisonTable({
  plans,
  billingCycle,
}: {
  plans: Plan[];
  billingCycle: BillingCycle;
}) {
  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)));

  return (
    <div className="mt-12 overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden text-left">
        <thead>
          <tr>
            <th className="border p-4">Features</th>
            {plans.map((plan) => (
              <th
                key={plan.name}
                className={`border p-4 text-center ${
                  plan.highlighted ? "bg-indigo-50" : ""
                }`}
              >
                <div className="text-xl font-semibold">{plan.name}</div>
                <div className="mt-2 text-3xl font-bold text-indigo-600">
                  {formatPrice(plan, billingCycle)}
                  <span className="text-lg text-gray-500">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                {plan.highlighted && (
                  <div className="mt-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full inline-block">
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
              <td className="border p-4 text-gray-700">{feature}</td>
              {plans.map((plan) => (
                <td
                  key={plan.name + feature}
                  className="border p-4 text-center"
                >
                  {plan.features.includes(feature) ? "✔" : "—"}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="border p-4"></td>
            {plans.map((plan) => (
              <td key={plan.name + "btn"} className="border p-4 text-center">
                <Link
                  href={plan.button_link}
                  className={`px-4 py-2 rounded-lg font-medium inline-block ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {plan.button_text}
                </Link>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
