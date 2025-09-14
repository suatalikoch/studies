"use client";

import { useEffect } from "react";

type ShortcutHandler = (event: KeyboardEvent) => void;

interface Shortcut {
  combo: string;
  handler: ShortcutHandler;
}

export function useKeyboardShortcuts({ shortcuts }: { shortcuts: Shortcut[] }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      const isEditable =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isEditable) return;

      const pressed: string[] = [];
      if (event.ctrlKey) pressed.push("ctrl");
      if (event.metaKey) pressed.push("meta"); //- Command Key (MacOS)
      if (event.altKey) pressed.push("alt"); //- Option (MacOS)
      if (event.shiftKey) pressed.push("shift");
      pressed.push(event.key.toLowerCase());

      const combo = pressed.join("+");

      shortcuts.forEach(({ combo: targetCombo, handler }) => {
        if (combo === targetCombo.toLowerCase()) {
          event.preventDefault();
          handler(event);
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
}
