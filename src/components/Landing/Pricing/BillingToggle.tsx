import { BillingCycle, BillingToggleProps } from "@/types";

export default function BillingToggle({
  billingCycle,
  setBillingCycle,
}: BillingToggleProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 border rounded-full flex gap-1 p-1">
      {["monthly", "yearly"].map((cycle) => (
        <button
          key={cycle}
          onClick={() => setBillingCycle(cycle as BillingCycle)}
          aria-pressed={billingCycle === cycle}
          className={`px-6 py-2 rounded-full text-sm transition-all cursor-pointer ${
            billingCycle === cycle
              ? "bg-primary text-secondary"
              : "text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
          }`}
        >
          {cycle === "yearly" ? (
            <>
              Yearly{" "}
              <span
                className={`text-green-500 font-bold ml-1 ${
                  billingCycle === "yearly" && "text-white"
                }`}
              >
                (Save 20%)
              </span>
            </>
          ) : (
            "Monthly"
          )}
        </button>
      ))}
    </div>
  );
}
