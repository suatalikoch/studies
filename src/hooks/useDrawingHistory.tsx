import { useState, useCallback, useRef } from "react";
import { CanvasState, Layer } from "@/types/drawing";

export function useDrawingHistory(maxStates = 50) {
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const isUndoRedoRef = useRef(false);

  const saveState = useCallback(
    (layers: Layer[], description?: string) => {
      if (isUndoRedoRef.current) return;

      const states: CanvasState[] = layers.map((layer) => ({
        imageData: layer.ctx.getImageData(
          0,
          0,
          layer.canvas.width,
          layer.canvas.height
        ),
        timestamp: Date.now(),
        layerId: layer.id,
      }));

      setHistory((prev) => {
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push(...states);

        if (newHistory.length > maxStates) {
          const excess = newHistory.length - maxStates;
          newHistory.splice(0, excess);
          return newHistory;
        }

        return newHistory;
      });

      setCurrentIndex((prev) => {
        const newIndex = prev + states.length;
        return Math.min(newIndex, maxStates - 1);
      });
    },
    [currentIndex, maxStates]
  );

  const undo = useCallback(
    (layers: Layer[]) => {
      if (currentIndex <= 0) return false;

      isUndoRedoRef.current = true;

      try {
        const targetIndex = Math.max(0, currentIndex - layers.length);
        const statesToRestore = history.slice(targetIndex, currentIndex);

        statesToRestore.forEach((state, index) => {
          const layer = layers.find((l) => l.id === state.layerId);
          if (layer) {
            layer.ctx.putImageData(state.imageData, 0, 0);
          }
        });

        setCurrentIndex(targetIndex);
        return true;
      } finally {
        isUndoRedoRef.current = false;
      }
    },
    [history, currentIndex]
  );

  const redo = useCallback(
    (layers: Layer[]) => {
      if (currentIndex >= history.length - layers.length) return false;

      isUndoRedoRef.current = true;

      try {
        const targetIndex = Math.min(
          history.length - 1,
          currentIndex + layers.length
        );
        const statesToRestore = history.slice(
          currentIndex + 1,
          targetIndex + 1
        );

        statesToRestore.forEach((state, index) => {
          const layer = layers.find((l) => l.id === state.layerId);
          if (layer) {
            layer.ctx.putImageData(state.imageData, 0, 0);
          }
        });

        setCurrentIndex(targetIndex);
        return true;
      } finally {
        isUndoRedoRef.current = false;
      }
    },
    [history, currentIndex]
  );

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const clear = useCallback(() => {
    setHistory([]);
    setCurrentIndex(-1);
  }, []);

  return {
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
    historyLength: history.length,
    currentIndex,
  };
}
