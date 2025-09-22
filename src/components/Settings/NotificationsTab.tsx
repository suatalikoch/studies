import { NotificationsTabProps } from "@/types";
import { Bell } from "lucide-react";
import { Checkbox, Label } from "@/components/UI";

export default function NotificationsTab({
  notifications,
  setNotifications,
  loading,
}: NotificationsTabProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6 text-primary" /> Notifications
      </h2>
      <div className="space-y-4 max-w-md">
        {Object.entries(notifications).map(([key, value]) => {
          const checked = Boolean(value);
          return (
            <div key={key} className="flex items-center cursor-pointer gap-3">
              <Checkbox
                id={key}
                checked={checked}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    [key]: Boolean(checked),
                  }))
                }
                disabled={loading}
              />
              <Label htmlFor={key} className="text-muted-foreground capitalize">
                {key} notifications
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
