import { useState } from "react";
import { useKeyboardShortcuts } from "@/hooks";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/UI";

export default function CommandMenu() {
  const [openCommand, setOpenCommand] = useState(false);

  useKeyboardShortcuts({
    shortcuts: [
      { combo: "ctrl+k", handler: () => setOpenCommand((prev) => !prev) },
    ],
  });

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpenCommand((prev) => !prev)}
        className="relative hover:bg-secondary text-muted-foreground hidden sm:block"
        aria-label="Search"
        aria-expanded={openCommand}
      >
        <div className="flex items-center gap-2 pl-6 text-xs">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <span>Search everything...</span>
          <div className="flex items-center gap-1">
            <kbd className="inline-flex items-center gap-1 text-muted-foreground pointer-events-none h-5 font-mono">
              <span className="px-1 border bg-background rounded">Ctrl</span>
              <span className="px-1 border bg-background rounded">K</span>
            </kbd>
          </div>
        </div>
      </Button>
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
