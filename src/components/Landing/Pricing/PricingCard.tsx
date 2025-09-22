import { PricingCardProps } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import AnimatedPrice from "./AnimatedPrice";
import Link from "next/link";
import { Button } from "@/components/UI";
import { Check } from "lucide-react";

export default function PricingCard({ plan, billingCycle }: PricingCardProps) {
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
      className={`bg-white dark:bg-neutral-950 rounded-lg shadow-lg border flex flex-col relative ${
        plan.highlighted ? "ring-2 ring-primary scale-105" : ""
      }`}
    >
      {plan.highlighted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: pop ? 1.2 : 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="absolute top-4 right-4 bg-primary text-secondary text-xs font-bold px-3 py-1 rounded-full shadow-lg"
        >
          Best
        </motion.div>
      )}
      <div className="p-6 flex-1">
        <h3 className="text-xl font-semibold">{plan.name}</h3>
        <motion.p
          className="mt-4 text-4xl font-bold text-primary flex items-baseline justify-center"
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
          <span className="text-lg text-muted-foreground ml-1">
            /{billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </motion.p>
        <p className="mt-2 text-muted-foreground">{plan.description}</p>
        <ul className="mt-6 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="text-green-500" aria-hidden="true">
                <Check />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-6 border-t">
        <Link href={plan.button_link}>
          <Button
            variant={`${plan.highlighted ? "default" : "secondary"}`}
            className="w-full"
          >
            {plan.button_text}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
