import { SecurityTabProps } from "@/types";
import { Lock, Shield } from "lucide-react";
import { Checkbox, Input, Label } from "@/components/UI";

export default function SecurityTab({
  currentPassword,
  newPassword,
  twoFactorAuth,
  loading,
  setCurrentPassword,
  setNewPassword,
  setTwoFactorAuth,
}: SecurityTabProps) {
  return (
    <div className="bg-neutral-100 dark:bg-gray-950 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <Lock className="w-6 h-6 text-indigo-600" /> Security
      </h2>
      <div className="space-y-5 max-w-md">
        <div>
          <Label
            htmlFor="currentPassword"
            className="text-gray-700 dark:text-gray-400 mb-2"
          >
            Current Password
          </Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />
        </div>
        <div>
          <Label
            htmlFor="newPassword"
            className="text-gray-700 dark:text-gray-400 mb-2"
          >
            New Password
          </Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
          />
        </div>
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <Checkbox
            id="twoFactorAuth"
            checked={twoFactorAuth}
            onCheckedChange={setTwoFactorAuth}
            disabled={loading}
          />
          <Label
            htmlFor="twoFactorAuth"
            className="text-gray-700 dark:text-gray-400"
          >
            <Shield className="w-4 h-4 text-indigo-600" /> Enable Two-Factor
            Authentication
          </Label>
        </label>
      </div>
    </div>
  );
}
