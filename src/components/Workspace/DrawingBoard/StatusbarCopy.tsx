import React from "react";
import { Tool } from "@/types/drawing";

interface StatusBarProps {
  tool: Tool;
  brushSize: number;
  color: string;
  zoom: number;
  canvasSize: { width: number; height: number };
  cursorPosition: { x: number; y: number } | null;
  isDrawing: boolean;
  layerCount: number;
  activeLayerName: string;
  memoryUsage?: string;
}

export default function StatusbarCopy({
  tool,
  brushSize,
  color,
  zoom,
  canvasSize,
  cursorPosition,
  isDrawing,
  layerCount,
  activeLayerName,
  memoryUsage,
}: StatusBarProps) {
  const getToolDisplayName = (tool: Tool): string => {
    const toolNames: Record<Tool, string> = {
      brush: "Brush",
      pen: "Pen",
      pencil: "Pencil",
      eraser: "Eraser",
      bucket: "Bucket Fill",
      eyedropper: "Eyedropper",
      select: "Rectangle Select",
      move: "Move",
      rectangle: "Rectangle",
      circle: "Ellipse",
      line: "Line",
      text: "Text",
      airbrush: "Airbrush",
      smudge: "Smudge",
      blur: "Blur",
      sharpen: "Sharpen",
      clone: "Clone",
      heal: "Healing",
    };
    return toolNames[tool] || tool;
  };

  const getStatusMessage = (): string => {
    if (isDrawing) {
      switch (tool) {
        case "brush":
        case "pen":
        case "pencil":
        case "airbrush":
          return "Drawing...";
        case "eraser":
          return "Erasing...";
        case "rectangle":
          return "Drawing rectangle...";
        case "circle":
          return "Drawing ellipse...";
        case "line":
          return "Drawing line...";
        case "text":
          return "Placing text...";
        case "bucket":
          return "Filling...";
        case "eyedropper":
          return "Sampling color...";
        case "select":
          return "Making selection...";
        case "move":
          return "Moving...";
        default:
          return "Working...";
      }
    }
    return "Ready";
  };

  return (
    <div className="bg-gray-800 border-t border-gray-700 px-4 py-2 text-sm text-gray-300">
      <div className="flex items-center justify-between">
        {/* Left side - Tool and status info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Tool:</span>
            <span className="text-white font-medium">
              {getToolDisplayName(tool)}
            </span>
          </div>

          {["brush", "pen", "pencil", "eraser", "airbrush"].includes(tool) && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Size:</span>
              <span className="text-blue-400 font-mono">{brushSize}px</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Color:</span>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded border border-gray-600"
                style={{ backgroundColor: color }}
              />
              <span className="text-blue-400 font-mono">
                {color.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Layer:</span>
            <span className="text-white">{activeLayerName}</span>
            <span className="text-gray-500">({layerCount} total)</span>
          </div>

          <div className="text-yellow-400 font-medium">
            {getStatusMessage()}
          </div>
        </div>

        {/* Right side - Canvas and system info */}
        <div className="flex items-center gap-6">
          {cursorPosition && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Cursor:</span>
              <span className="text-blue-400 font-mono">
                {Math.round(cursorPosition.x)}, {Math.round(cursorPosition.y)}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Zoom:</span>
            <span className="text-blue-400 font-mono">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-400">Canvas:</span>
            <span className="text-blue-400 font-mono">
              {canvasSize.width} × {canvasSize.height}
            </span>
          </div>

          {memoryUsage && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Memory:</span>
              <span className="text-green-400 font-mono">{memoryUsage}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
