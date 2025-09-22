"use client";

import { Button } from "@/components/UI";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/UI";

export default function BillingSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center py-8 sm:py-16">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          <CardTitle className="text-2xl mt-4">
            Subscription Successful
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Thank you for subscribing! 🎉 Your plan is now active. You can start
            using all premium features immediately.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="sm" onClick={() => router.push("/dashboard")}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
