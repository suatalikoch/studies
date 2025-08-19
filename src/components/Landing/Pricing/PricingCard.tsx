import { BillingCycle, Plan } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedPrice from "./AnimatedPrice";
import Link from "next/link";

export default function PricingCard({
  plan,
  billingCycle,
}: {
  plan: Plan;
  billingCycle: BillingCycle;
}) {
  const [pop, setPop] = useState(false);
  const prevPriceRef = useRef(
    billingCycle === "monthly" ? plan.price_monthly : plan.price_yearly
  );

  useEffect(() => {
    const currentPrice =
      billingCycle === "monthly" ? plan.price_monthly : plan.price_yearly;
    if (prevPriceRef.current !== currentPrice) {
      setPop(true);
      const timeout = setTimeout(() => setPop(false), 300);
      prevPriceRef.current = currentPrice;
      return () => clearTimeout(timeout);
    }
  }, [billingCycle, plan.price_monthly, plan.price_yearly]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col relative ${
        plan.highlighted ? "ring-2 ring-indigo-500 scale-105" : ""
      }`}
    >
      {plan.highlighted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: pop ? 1.2 : 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        >
          Best
        </motion.div>
      )}

      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>

        <motion.p
          className="mt-4 text-4xl font-bold text-indigo-600 flex items-baseline justify-center"
          animate={{ scale: pop ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatedPrice
            price={
              billingCycle === "monthly"
                ? plan.price_monthly
                : plan.price_yearly
            }
          />
          <span className="text-lg font-medium text-gray-500 ml-1">
            /{billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </motion.p>

        <p className="mt-2 text-gray-600">{plan.description}</p>

        <ul className="mt-6 space-y-3 text-gray-700">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center space-x-2">
              <span className="text-green-500" aria-hidden="true">
                ✔
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 border-t border-gray-200">
        <Link
          href={plan.button_link}
          className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
            plan.highlighted
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          {plan.button_text}
        </Link>
      </div>
    </motion.div>
  );
}
