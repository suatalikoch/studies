import {
  Button,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI";
import { FeatureComparisonTableProps } from "@/types";
import { Check, Hamburger, Info, X } from "lucide-react";
import Link from "next/link";

export default function FeatureComparisonTable({
  plans,
  billingCycle,
}: FeatureComparisonTableProps) {
  const allFeatures = Array.from(new Set(plans.flatMap((p) => p.features)));

  return (
    <div id="compare-plans" className="overflow-x-auto scroll-mt-25">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="border-none">
            <TableHead scope="col"></TableHead>
            {plans.map((plan) => (
              <TableCell key={plan.name + "btn"} className="p-4 text-center">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">
                      {plan.name.toUpperCase()}
                    </span>
                    <span className="text-lg text-muted-foreground">
                      ${plan.price_monthly}
                    </span>
                    <span className="text-muted-foreground">
                      / {billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <Link href={plan.button_link}>
                    <Button
                      variant={`${plan.highlighted ? "default" : "secondary"}`}
                      size="sm"
                      className="w-full text-xs"
                    >
                      {plan.button_text}
                    </Button>
                  </Link>
                </div>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableHead scope="col" className="sticky top-[100px] p-4">
              <div className="flex items-center gap-4">
                <div className="w-fit h-fit p-1 bg-primary text-secondary rounded-md">
                  <Hamburger size={24} />
                </div>
                <span className="text-lg font-bold">Feature</span>
              </div>
            </TableHead>
            {plans.map((plan) => (
              <TableHead key={plan.name}></TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFeatures.map((feature) => (
            <TableRow key={feature}>
              <TableCell className="text-xs text-start p-4">
                <div className="flex items-center gap-1">
                  <span>{feature}</span>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Info
                        size={16}
                        className="text-muted-foreground cursor-pointer transition-colors duration-300"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="px-3 py-0 pb-1">
                      <span className="text-xs">
                        Lorem ipsum dolor sit amet. John Doe was a professional
                        boxer, who one day get knocked down.
                      </span>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </TableCell>
              {plans.map((plan) => (
                <TableCell key={plan.name + feature} className="p-4">
                  <div className="flex items-center justify-start">
                    {plan.features.includes(feature) ? (
                      <Check className="text-green-500" />
                    ) : (
                      <X className="text-red-500" />
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
