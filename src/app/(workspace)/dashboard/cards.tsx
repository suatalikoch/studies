import StatsCard from "@/components/ui/stats-card";
import { BookOpen, CheckSquare, Clock, FileText } from "lucide-react";

export default function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Notes"
        count={24}
        icon={<FileText className="w-8 h-8 text-blue-600" />}
        changeText="+3 this week"
        changeColor="text-green-600"
      />

      <StatsCard
        title="Assignments"
        count={12}
        icon={<BookOpen className="w-8 h-8 text-orange-600" />}
        changeText="3 due soon"
        changeColor="text-red-600"
      />

      <StatsCard
        title="Completed Tasks"
        count={89}
        icon={<CheckSquare className="w-8 h-8 text-green-600" />}
        changeText="+12 this week"
        changeColor="text-green-600"
      />

      <StatsCard
        title="Study Hours"
        count="32h"
        icon={<Clock className="w-8 h-8 text-purple-600" />}
        changeText="+5h this week"
        changeColor="text-green-600"
      />
    </div>
  );
}
