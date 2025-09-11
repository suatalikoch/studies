import { AppearanceTabProps } from "@/types";
import { Moon } from "lucide-react";
import { Checkbox, Label } from "@/components/UI";

export default function AppearanceTab({
  darkMode,
  setDarkMode,
  loading,
}: AppearanceTabProps) {
  return (
    <div className="bg-neutral-100 dark:bg-gray-950 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <Moon className="w-6 h-6 text-indigo-600" /> Appearance
      </h2>
      <div className="flex items-center gap-3 cursor-pointer max-w-md">
        <Checkbox
          id="darkMode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
          disabled={loading}
        />
        <Label htmlFor="darkMode" className="text-gray-700 dark:text-gray-400">
          Enable dark mode
        </Label>
      </div>
    </div>
  );
}
