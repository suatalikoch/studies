import { Tool, ToolbarProps } from "@/types";
import {
  Circle,
  Download,
  Eraser,
  Minus,
  Palette,
  PenLine,
  RotateCw,
  Save,
  Square,
  Trash2,
  Type,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export default function Toolbar({
  tool,
  setTool,
  brushSize,
  setBrushSize,
  color,
  setColor,
  zoom,
  zoomIn,
  zoomOut,
  clearCanvas,
}: ToolbarProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 border-r border-gray-300 dark:border-gray-600 pr-4">
          {(
            ["pen", "eraser", "square", "circle", "line", "text"] as Tool[]
          ).map((t) => (
            <button
              key={t}
              onClick={() => setTool(t)}
              className={`p-2 rounded-lg transition-colors ${
                tool === t
                  ? "bg-indigo-500 text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
              type="button"
            >
              {t === "pen" && <PenLine className="w-5 h-5" />}
              {t === "eraser" && <Eraser className="w-5 h-5" />}
              {t === "square" && <Square className="w-5 h-5" />}
              {t === "circle" && <Circle className="w-5 h-5" />}
              {t === "line" && <Minus className="w-5 h-5" />}
              {t === "text" && <Type className="w-5 h-5" />}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2 border-r border-gray-300 dark:border-gray-600 pr-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Size:
          </span>
          <input
            type="range"
            min={1}
            max={99}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300 w-6">
            {brushSize}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Palette className="w-5 h-5 text-gray-600" />
          <div className="flex space-x-1">
            {["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"].map(
              (c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-6 h-6 rounded-full border-1 ${
                    color === c ? "border-indigo-600" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c }}
                  type="button"
                  title={`Color ${c}`}
                />
              )
            )}
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={zoomOut}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
          title="Zoom Out"
          type="button"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300 px-2">
          {(zoom * 100).toFixed(0)}%
        </span>
        <button
          onClick={zoomIn}
          className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
          title="Zoom In"
          type="button"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        <div className="border-l border-gray-300 pl-2 ml-2 flex space-x-2">
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors">
            <Upload className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors">
            <Save className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors">
            <RotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={clearCanvas}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
            title="Clear Canvas"
            type="button"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
