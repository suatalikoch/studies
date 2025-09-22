import { FC, ReactNode } from "react";
import { Card, CardContent } from "@/components/UI";

interface StatsCardProps {
  title: string;
  count: number | string;
  icon: ReactNode;
  changeText: string;
  changeColor: string;
}

const StatsCard: FC<StatsCardProps> = ({
  title,
  count,
  icon,
  changeText,
  changeColor,
}) => (
  <Card role="region" aria-label={title}>
    <CardContent>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        {icon}
      </div>
      <p className={`text-xs mt-2 ${changeColor}`}>{changeText}</p>
    </CardContent>
  </Card>
);

export default StatsCard;
