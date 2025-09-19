import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Tool,
  ToolConfig,
  SelectionArea,
  DrawingBoardProps,
} from "@/types/drawing";
import ZoomControls from "./ZoomControls";
import { useDrawingHistory } from "@/hooks/useDrawingHistory";
import { useLayerManager } from "@/hooks/useLayerManager";
import ToolbarCopy from "./ToolbarCopy";
import StatusbarCopy from "./StatusbarCopy";
import CanvasCopy from "./CanvasCopy";

export default function DrawingBoardss({
  width = 1200,
  height = 800,
  backgroundColor = "#ffffff",
  onSave,
  onLoad,
}: DrawingBoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<Tool>("brush");
  const [zoom, setZoom] = useState(1);
  const [isPanMode, setIsPanMode] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selection, setSelection] = useState<SelectionArea | null>(null);

  const [toolConfig, setToolConfig] = useState<ToolConfig>({
    brush: {
      size: 10,
      opacity: 100,
      hardness: 100,
      spacing: 25,
      flow: 100,
      pressure: true,
      tilt: false,
      rotation: false,
    },
    color: {
      primary: "#000000",
      secondary: "#ffffff",
      alpha: 100,
    },
    blendMode: "normal",
    antiAlias: true,
  });

  // Layer management
  const {
    layers,
    activeLayerId,
    activeLayer,
    createLayer,
    deleteLayer,
    duplicateLayer,
    updateLayer,
    moveLayer,
    setActiveLayerId,
    flattenLayers,
  } = useLayerManager(width, height);

  // History management
  const { saveState, undo, redo, canUndo, canRedo, clear } =
    useDrawingHistory();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "z":
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case "y":
            e.preventDefault();
            handleRedo();
            break;
          case "s":
            e.preventDefault();
            handleSave();
            break;
          case "o":
            e.preventDefault();
            handleLoad();
            break;
          case "1":
            e.preventDefault();
            setZoom(1);
            break;
          case "0":
            e.preventDefault();
            handleFitToScreen();
            break;
          case "=":
          case "+":
            e.preventDefault();
            handleZoomIn();
            break;
          case "-":
            e.preventDefault();
            handleZoomOut();
            break;
        }
      } else {
        // Tool shortcuts
        switch (e.key.toLowerCase()) {
          case "b":
            setTool("brush");
            break;
          case "e":
            setTool("eraser");
            break;
          case "g":
            setTool("bucket");
            break;
          case "i":
            setTool("eyedropper");
            break;
          case "m":
            setTool("select");
            break;
          case "v":
            setTool("move");
            break;
          case "u":
            setTool("rectangle");
            break;
          case "t":
            setTool("text");
            break;
          case " ":
            e.preventDefault();
            setIsPanMode(true);
            break;
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setIsPanMode(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleToolChange = useCallback((newTool: Tool) => {
    setTool(newTool);
    setIsPanMode(false);
  }, []);

  const handleToolConfigChange = useCallback((config: Partial<ToolConfig>) => {
    setToolConfig((prev) => ({
      ...prev,
      ...config,
      brush: { ...prev.brush, ...(config.brush || {}) },
      color: { ...prev.color, ...(config.color || {}) },
    }));
  }, []);

  const handleColorPick = useCallback((color: string) => {
    setToolConfig((prev) => ({
      ...prev,
      color: { ...prev.color, primary: color },
    }));
  }, []);

  const handleHistoryAdd = useCallback(() => {
    saveState(layers);
  }, [saveState, layers]);

  const handleUndo = useCallback(() => {
    undo(layers);
  }, [undo, layers]);

  const handleRedo = useCallback(() => {
    redo(layers);
  }, [redo, layers]);

  const handleSave = useCallback(() => {
    const canvas = flattenLayers();
    const dataUrl = canvas.toDataURL("image/png");

    if (onSave) {
      onSave(dataUrl);
    } else {
      // Default save behavior
      const link = document.createElement("a");
      link.download = `artwork-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  }, [flattenLayers, onSave]);

  const handleLoad = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (onLoad) {
        onLoad(file);
      } else {
        // Default load behavior
        const img = new Image();
        img.onload = () => {
          if (activeLayer) {
            activeLayer.ctx.clearRect(0, 0, width, height);
            activeLayer.ctx.drawImage(img, 0, 0);
            handleHistoryAdd();
          }
        };
        img.src = URL.createObjectURL(file);
      }
    };
    input.click();
  }, [onLoad, activeLayer, width, height, handleHistoryAdd]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 16));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev / 1.2, 0.1));
  };

  const handleFitToScreen = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth - 40; // padding
    const containerHeight = container.clientHeight - 40;

    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;
    const scale = Math.min(scaleX, scaleY, 1);

    setZoom(scale);
  };

  const handleActualSize = () => {
    setZoom(1);
  };

  const handleTogglePan = () => {
    setIsPanMode((prev) => !prev);
  };

  const handleLayerUpdate = useCallback(
    (layerId: string) => {
      // Update layer thumbnail or other properties
      const layer = layers.find((l) => l.id === layerId);
      if (layer) {
        // Generate thumbnail
        const thumbnailCanvas = document.createElement("canvas");
        thumbnailCanvas.width = 64;
        thumbnailCanvas.height = 64;
        const thumbnailCtx = thumbnailCanvas.getContext("2d");
        if (thumbnailCtx) {
          thumbnailCtx.drawImage(layer.canvas, 0, 0, 64, 64);
          updateLayer(layerId, { thumbnail: thumbnailCanvas.toDataURL() });
        }
      }
    },
    [layers, updateLayer]
  );

  const handleLayerToggleVisibility = useCallback(
    (layerId: string) => {
      const layer = layers.find((l) => l.id === layerId);
      if (layer) {
        updateLayer(layerId, { visible: !layer.visible });
      }
    },
    [layers, updateLayer]
  );

  const handleLayerToggleLock = useCallback(
    (layerId: string) => {
      const layer = layers.find((l) => l.id === layerId);
      if (layer) {
        updateLayer(layerId, { locked: !layer.locked });
      }
    },
    [layers, updateLayer]
  );

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            Professional Draw Studio
          </h1>
          <ZoomControls
            zoom={zoom}
            onZoomChange={setZoom}
            onFitToScreen={handleFitToScreen}
            onActualSize={handleActualSize}
            onTogglePan={handleTogglePan}
            isPanMode={isPanMode}
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Toolbar */}
        <ToolbarCopy
          tool={tool}
          toolConfig={toolConfig}
          layers={layers}
          activeLayerId={activeLayerId}
          onToolChange={handleToolChange}
          onToolConfigChange={handleToolConfigChange}
          onLayerChange={setActiveLayerId}
          onLayerCreate={createLayer}
          onLayerDelete={deleteLayer}
          onLayerToggleVisibility={handleLayerToggleVisibility}
          onLayerToggleLock={handleLayerToggleLock}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSave={handleSave}
          onLoad={handleLoad}
          canUndo={canUndo}
          canRedo={canRedo}
        />

        {/* Main Canvas Area */}
        <div
          ref={containerRef}
          className="flex-1 p-6 overflow-auto bg-gray-900"
        >
          <div className="max-w-full max-h-full flex items-center justify-center">
            <CanvasCopy
              tool={isPanMode ? "move" : tool}
              toolConfig={toolConfig}
              zoom={zoom}
              activeLayer={activeLayer}
              layers={layers}
              selection={selection}
              onColorPick={handleColorPick}
              onHistoryAdd={handleHistoryAdd}
              onLayerUpdate={handleLayerUpdate}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <StatusbarCopy
        tool={tool}
        brushSize={toolConfig.brush.size}
        color={toolConfig.color.primary}
        zoom={zoom}
        canvasSize={{ width, height }}
        cursorPosition={cursorPosition}
        isDrawing={isDrawing}
        layerCount={layers.length}
        activeLayerName={activeLayer?.name || "No Layer"}
      />
    </div>
  );
}
