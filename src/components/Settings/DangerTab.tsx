import { DangerTabProps } from "@/types";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/UI";

export default function DangerTab({
  handleDeleteAccount,
  loading,
}: DangerTabProps) {
  return (
    <div className="bg-neutral-100 dark:bg-gray-950 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6 text-red-600">
        <Trash2 className="w-6 h-6" /> Danger Zone
      </h2>
      <p className="max-w-lg mb-6 text-gray-700 dark:text-gray-400">
        Be careful! Actions here are irreversible.
      </p>
      <Button
        variant="destructive"
        type="button"
        onClick={handleDeleteAccount}
        disabled={loading}
      >
        Delete My Account
      </Button>
    </div>
  );
}
