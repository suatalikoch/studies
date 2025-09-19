import { useState, useCallback, useRef } from "react";
import { Layer, BlendMode } from "@/types/drawing";

export function useLayerManager(canvasWidth = 800, canvasHeight = 600) {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
  const layerCounterRef = useRef(0);

  const createLayer = useCallback(
    (name?: string, insertIndex?: number): Layer => {
      // If running on the server, return a stub layer (no canvas yet)
      if (typeof document === "undefined") {
        const layer: Layer = {
          id: `layer-${++layerCounterRef.current}`,
          name: name || `Layer ${layerCounterRef.current}`,
          visible: true,
          opacity: 100,
          blendMode: "normal" as BlendMode,
          locked: false,
          canvas: null as any, // canvas will be created on client
          ctx: null as any, // ctx will be created on client
        };
        setLayers((prev) => {
          const newLayers = [...prev];
          if (insertIndex !== undefined)
            newLayers.splice(insertIndex, 0, layer);
          else newLayers.push(layer);
          return newLayers;
        });
        return layer;
      }

      // --- Client side: create actual canvas ---
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to create canvas context");

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const layer: Layer = {
        id: `layer-${++layerCounterRef.current}`,
        name: name || `Layer ${layerCounterRef.current}`,
        visible: true,
        opacity: 100,
        blendMode: "normal" as BlendMode,
        locked: false,
        canvas,
        ctx,
      };

      setLayers((prev) => {
        const newLayers = [...prev];
        if (insertIndex !== undefined) newLayers.splice(insertIndex, 0, layer);
        else newLayers.push(layer);
        return newLayers;
      });

      return layer;
    },
    [canvasWidth, canvasHeight]
  );

  const deleteLayer = useCallback(
    (layerId: string) => {
      setLayers((prev) => {
        const filtered = prev.filter((layer) => layer.id !== layerId);
        if (filtered.length === 0) {
          // Always keep at least one layer
          return layers.length === 0 ? [] : [createLayer("Background")];
        }
        return filtered;
      });

      if (activeLayerId === layerId) {
        setActiveLayerId(layers.find((l) => l.id !== layerId)?.id || null);
      }
    },
    [activeLayerId, layers, createLayer]
  );

  const duplicateLayer = useCallback(
    (layerId: string) => {
      const sourceLayer = layers.find((l) => l.id === layerId);
      if (!sourceLayer) return;

      const newLayer = createLayer(`${sourceLayer.name} Copy`);
      newLayer.ctx.drawImage(sourceLayer.canvas, 0, 0);
      newLayer.opacity = sourceLayer.opacity;
      newLayer.blendMode = sourceLayer.blendMode;
      newLayer.visible = sourceLayer.visible;
    },
    [layers, createLayer]
  );

  const updateLayer = useCallback(
    (layerId: string, updates: Partial<Layer>) => {
      setLayers((prev) =>
        prev.map((layer) =>
          layer.id === layerId ? { ...layer, ...updates } : layer
        )
      );
    },
    []
  );

  // --- Move a layer up/down ---
  const moveLayer = useCallback((layerId: string, direction: "up" | "down") => {
    setLayers((prev) => {
      const index = prev.findIndex((l) => l.id === layerId);
      if (index === -1) return prev;

      const newLayers = [...prev];
      const targetIndex = direction === "up" ? index + 1 : index - 1;

      if (targetIndex >= 0 && targetIndex < newLayers.length) {
        [newLayers[index], newLayers[targetIndex]] = [
          newLayers[targetIndex],
          newLayers[index],
        ];
      }

      return newLayers;
    });
  }, []);

  const mergeDown = useCallback(
    (layerId: string) => {
      const layerIndex = layers.findIndex((l) => l.id === layerId);
      if (layerIndex <= 0) return;

      const currentLayer = layers[layerIndex];
      const belowLayer = layers[layerIndex - 1];

      // Merge current layer into the layer below
      belowLayer.ctx.globalAlpha = currentLayer.opacity / 100;
      belowLayer.ctx.globalCompositeOperation = mapBlendMode(
        currentLayer.blendMode
      );
      belowLayer.ctx.drawImage(currentLayer.canvas, 0, 0);
      belowLayer.ctx.globalAlpha = 1;
      belowLayer.ctx.globalCompositeOperation = "source-over";

      deleteLayer(layerId);
    },
    [layers, deleteLayer]
  );

  const getActiveLayer = useCallback(() => {
    return layers.find((layer) => layer.id === activeLayerId) || null;
  }, [layers, activeLayerId]);

  const flattenLayers = useCallback((): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to create canvas context");
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Composite all visible layers
    layers.forEach((layer) => {
      if (!layer.visible) return;

      ctx.globalAlpha = layer.opacity / 100;
      ctx.globalCompositeOperation = mapBlendMode(layer.blendMode);
      ctx.drawImage(layer.canvas, 0, 0);
    });

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    return canvas;
  }, [layers, canvasWidth, canvasHeight]);

  // Initialize with a default layer
  if (layers.length === 0) {
    createLayer("Background");
  }

  function mapBlendMode(mode: BlendMode): GlobalCompositeOperation {
    switch (mode) {
      case "normal":
        return "source-over";
      default:
        return mode as GlobalCompositeOperation;
    }
  }

  return {
    layers,
    activeLayerId,
    activeLayer: getActiveLayer(),
    createLayer,
    deleteLayer,
    duplicateLayer,
    updateLayer,
    moveLayer,
    mergeDown,
    setActiveLayerId,
    flattenLayers,
  };
}
