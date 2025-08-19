import { BillingCycle } from "@/types";

export default function BillingToggle({
  billingCycle,
  setBillingCycle,
}: {
  billingCycle: BillingCycle;
  setBillingCycle: (cycle: BillingCycle) => void;
}) {
  return (
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
}
