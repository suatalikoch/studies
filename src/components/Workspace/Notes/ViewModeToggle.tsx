import { Button } from "@/components/UI";
import { ViewModeToggleProps } from "@/types";
import { Grid, List } from "lucide-react";

export default function ViewModeToggle({
  viewMode,
  setViewMode,
}: ViewModeToggleProps) {
  const toggleMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleMode}
      aria-label="Toggle view mode"
    >
      {viewMode === "list" ? (
        <Grid className="w-5 h-5" />
      ) : (
        <List className="w-5 h-5" />
      )}
    </Button>
  );
}
