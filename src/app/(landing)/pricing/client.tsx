"use client";

import { BillingCycle, Plan } from "@/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function PricingClient() {
  const plans: Plan[] = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for students getting started.",
      features: [
        "Access to basic tools",
        "5 lecture uploads",
        "1 GB storage",
        "Community support",
      ],
      buttonText: "Get Started",
      buttonLink: "/register",
      highlighted: false,
    },
    {
      name: "Pro",
      price: { monthly: 9.99, yearly: 99.99 },
      description: "For active students who need more.",
      features: [
        "Unlimited lectures",
        "10 GB storage",
        "Collaboration features",
        "Priority support",
      ],
      buttonText: "Upgrade Now",
      buttonLink: "/register",
      highlighted: true,
    },
    {
      name: "Premium",
      price: { monthly: 19.99, yearly: 199.99 },
      description: "For serious learners and educators.",
      features: [
        "Everything in Pro",
        "50 GB storage",
        "AI-powered search",
        "1-on-1 mentor support",
      ],
      buttonText: "Join Premium",
      buttonLink: "/register",
      highlighted: false,
    },
  ];

  const formatPrice = (plan: Plan, cycle: BillingCycle) =>
    plan.price[cycle] === 0 ? "$0" : `$${plan.price[cycle].toFixed(2)}`;

  const BillingToggle = ({
    billingCycle,
    setBillingCycle,
  }: {
    billingCycle: BillingCycle;
    setBillingCycle: (cycle: BillingCycle) => void;
  }) => (
    <div className="bg-white border border-gray-300 rounded-full flex p-1">
      {["monthly", "yearly"].map((cycle) => (
        <button
          key={cycle}
          onClick={() => setBillingCycle(cycle as BillingCycle)}
          aria-pressed={billingCycle === cycle}
          className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
            billingCycle === cycle
              ? "bg-indigo-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {cycle === "yearly" ? (
            <>
              Yearly{" "}
              <span className="text-green-500 font-bold ml-1">(Save 20%)</span>
            </>
          ) : (
            "Monthly"
          )}
        </button>
      ))}
    </div>
  );

  const AnimatedPrice = ({ price }: { price: number }) => {
    const priceMotion = useMotionValue(0);
    const [displayPrice, setDisplayPrice] = useState(0);

    useEffect(() => {
      priceMotion.set(0); // start from 0
      const controls = animate(priceMotion, price, {
        type: "spring",
        stiffness: 120,
        damping: 20,
        onUpdate: (latest) => {
          setDisplayPrice((prev) => {
            const next = Math.min(latest, price);
            return Math.abs(next - prev) < 0.005
              ? prev
              : Number(next.toFixed(2));
          });
        },
      });

      return controls.stop;
    }, [price, priceMotion]);

    return <span>${displayPrice.toFixed(2)}</span>;
  };

  const PricingCard = ({
    plan,
    billingCycle,
  }: {
    plan: Plan;
    billingCycle: BillingCycle;
  }) => {
    const [pop, setPop] = useState(false);
    const prevPriceRef = useRef(plan.price[billingCycle]);

    useEffect(() => {
      const currentPrice = plan.price[billingCycle];
      if (prevPriceRef.current !== currentPrice) {
        setPop(true);
        const timeout = setTimeout(() => setPop(false), 300);
        prevPriceRef.current = currentPrice;
        return () => clearTimeout(timeout);
      }
    }, [billingCycle, plan.price]);

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
            <AnimatedPrice price={plan.price[billingCycle]} />
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
            href={plan.buttonLink}
            className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${
              plan.highlighted
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {plan.buttonText}
          </Link>
        </div>
      </motion.div>
    );
  };

  const FeatureComparisonTable = ({
    plans,
    billingCycle,
  }: {
    plans: Plan[];
    billingCycle: BillingCycle;
  }) => {
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
                  <p className="text-gray-600 text-sm mt-1">
                    {plan.description}
                  </p>
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
                    href={plan.buttonLink}
                    className={`px-4 py-2 rounded-lg font-medium inline-block ${
                      plan.highlighted
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Choose the plan that&apos;s right for you
          </h2>
          <p className="mt-4 text-lg text-gray-600">
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
