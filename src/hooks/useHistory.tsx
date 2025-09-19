import { useState, useCallback } from "react";
import { CanvasState } from "@/types";

export function useHistory() {
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const saveState = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const state: CanvasState = {
        imageData,
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push(state);

        // Limit history to 50 entries
        if (newHistory.length > 50) {
          newHistory.shift();
          return newHistory;
        }

        return newHistory;
      });

      setCurrentIndex((prev) => Math.min(prev + 1, 49));
    },
    [currentIndex]
  );

  const undo = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (currentIndex <= 0) return false;

      const ctx = canvas.getContext("2d");
      if (!ctx) return false;

      const prevState = history[currentIndex - 1];
      ctx.putImageData(prevState.imageData, 0, 0);
      setCurrentIndex((prev) => prev - 1);

      return true;
    },
    [history, currentIndex]
  );

  const redo = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (currentIndex >= history.length - 1) return false;

      const ctx = canvas.getContext("2d");
      if (!ctx) return false;

      const nextState = history[currentIndex + 1];
      ctx.putImageData(nextState.imageData, 0, 0);
      setCurrentIndex((prev) => prev + 1);

      return true;
    },
    [history, currentIndex]
  );

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return {
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    clear: () => {
      setHistory([]);
      setCurrentIndex(-1);
    },
  };
}
