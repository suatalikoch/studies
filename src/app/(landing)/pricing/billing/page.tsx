"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI";
import { Button } from "@/components/UI";
import { Input } from "@/components/UI";
import { Label } from "@/components/UI";
import { Separator } from "@/components/UI";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  // Pretend this comes from state / props / context
  const selectedPlan = {
    name: "Pro Plan",
    price: "$19/month",
    features: ["Unlimited projects", "Priority support", "Advanced analytics"],
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "pro" }), // replace with selected plan
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // redirect to Stripe Checkout
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8 p-6">
      <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
      <p className="text-muted-foreground">
        Review your plan and enter payment details to complete your purchase.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Selected Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p>{selectedPlan.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedPlan.features.join(" · ")}
              </p>
            </div>
            <p className="text-lg font-semibold self-start">
              {selectedPlan.price}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiry">Expiry</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
          <Separator />
          <Button
            className="w-full"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : `Subscribe to ${selectedPlan.name}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
