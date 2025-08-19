import { FC, ReactNode } from "react";

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
  <div
    className="bg-white rounded-lg p-6 border border-gray-200"
    role="region"
    aria-label={title}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{count}</p>
      </div>
      {icon}
    </div>
    <p className={`text-xs mt-2 ${changeColor}`}>{changeText}</p>
  </div>
);

export default StatsCard;
