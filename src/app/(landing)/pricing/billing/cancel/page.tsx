"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/UI";
import { Button } from "@/components/UI";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BillingCancelPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center py-8 sm:py-16">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <XCircle className="w-16 h-16 mx-auto text-red-500" />
          <CardTitle className="text-2xl mt-4">Payment Canceled</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your subscription process was canceled. No charges have been made.
            You can try again anytime to activate your plan.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button onClick={() => router.push("/pricing/billing")}>
            Retry payment
          </Button>
          <Button variant="secondary" onClick={() => router.push("/pricing")}>
            Back to Pricing
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
