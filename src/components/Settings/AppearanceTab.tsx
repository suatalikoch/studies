import { AppearanceTabProps } from "@/types";
import { Moon } from "lucide-react";
import { Checkbox, Label } from "@/components/UI";

export default function AppearanceTab({
  darkMode,
  setDarkMode,
  loading,
}: AppearanceTabProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
        <Moon className="w-6 h-6 text-primary" /> Appearance
      </h2>
      <div className="flex items-center gap-3 cursor-pointer max-w-md">
        <Checkbox
          id="darkMode"
          checked={darkMode}
          onCheckedChange={setDarkMode}
          disabled={loading}
        />
        <Label htmlFor="darkMode" className="text-muted-foreground">
          Enable dark mode
        </Label>
      </div>
    </div>
  );
}
