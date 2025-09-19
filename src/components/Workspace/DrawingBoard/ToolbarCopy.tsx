import React from "react";
import {
  Brush,
  Eraser,
  PaintBucket,
  Pipette,
  Square,
  Circle,
  Minus,
  Type,
  MousePointer,
  Move,
  Undo,
  Redo,
  Save,
  FolderOpen,
  Pen,
  Pencil,
  Brush as Airbrush,
  Bluetooth as Blur,
  Droplets,
  Copy,
  Heart,
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Plus,
} from "lucide-react";
import { Tool, ToolConfig, Layer, BlendMode } from "@/types/drawing";

interface ToolbarProps {
  tool: Tool;
  toolConfig: ToolConfig;
  layers: Layer[];
  activeLayerId: string | null;
  onToolChange: (tool: Tool) => void;
  onToolConfigChange: (config: Partial<ToolConfig>) => void;
  onLayerChange: (layerId: string) => void;
  onLayerCreate: () => void;
  onLayerDelete: (layerId: string) => void;
  onLayerToggleVisibility: (layerId: string) => void;
  onLayerToggleLock: (layerId: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onLoad: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const toolGroups = [
  {
    name: "Selection",
    tools: [
      {
        id: "select" as Tool,
        icon: MousePointer,
        name: "Rectangular Select",
        shortcut: "M",
      },
      { id: "move" as Tool, icon: Move, name: "Move Tool", shortcut: "V" },
    ],
  },
  {
    name: "Painting",
    tools: [
      { id: "brush" as Tool, icon: Brush, name: "Brush Tool", shortcut: "B" },
      { id: "pen" as Tool, icon: Pen, name: "Pen Tool", shortcut: "P" },
      {
        id: "pencil" as Tool,
        icon: Pencil,
        name: "Pencil Tool",
        shortcut: "N",
      },
      {
        id: "airbrush" as Tool,
        icon: Airbrush,
        name: "Airbrush Tool",
        shortcut: "A",
      },
      {
        id: "eraser" as Tool,
        icon: Eraser,
        name: "Eraser Tool",
        shortcut: "E",
      },
    ],
  },
  {
    name: "Fill & Sample",
    tools: [
      {
        id: "bucket" as Tool,
        icon: PaintBucket,
        name: "Bucket Fill",
        shortcut: "G",
      },
      {
        id: "eyedropper" as Tool,
        icon: Pipette,
        name: "Eyedropper",
        shortcut: "I",
      },
    ],
  },
  {
    name: "Shapes",
    tools: [
      {
        id: "rectangle" as Tool,
        icon: Square,
        name: "Rectangle Tool",
        shortcut: "U",
      },
      {
        id: "circle" as Tool,
        icon: Circle,
        name: "Ellipse Tool",
        shortcut: "U",
      },
      { id: "line" as Tool, icon: Minus, name: "Line Tool", shortcut: "U" },
      { id: "text" as Tool, icon: Type, name: "Text Tool", shortcut: "T" },
    ],
  },
  {
    name: "Retouching",
    tools: [
      { id: "blur" as Tool, icon: Blur, name: "Blur Tool", shortcut: "R" },
      {
        id: "smudge" as Tool,
        icon: Droplets,
        name: "Smudge Tool",
        shortcut: "R",
      },
      { id: "clone" as Tool, icon: Copy, name: "Clone Tool", shortcut: "S" },
      { id: "heal" as Tool, icon: Heart, name: "Healing Tool", shortcut: "J" },
    ],
  },
];

const blendModes: BlendMode[] = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "soft-light",
  "hard-light",
  "color-dodge",
  "color-burn",
  "darken",
  "lighten",
  "difference",
  "exclusion",
];

export default function ToolbarCopy({
  tool,
  toolConfig,
  layers,
  activeLayerId,
  onToolChange,
  onToolConfigChange,
  onLayerChange,
  onLayerCreate,
  onLayerDelete,
  onLayerToggleVisibility,
  onLayerToggleLock,
  onUndo,
  onRedo,
  onSave,
  onLoad,
  canUndo,
  canRedo,
}: ToolbarProps) {
  return (
    <div className="flex h-full bg-gray-900 text-white">
      {/* Main Toolbar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* File Operations */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-600 pb-2">
              File
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={onUndo}
                disabled={!canUndo}
                className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group"
                title="Undo (Ctrl+Z)"
              >
                <Undo size={18} />
              </button>
              <button
                onClick={onRedo}
                disabled={!canRedo}
                className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group"
                title="Redo (Ctrl+Y)"
              >
                <Redo size={18} />
              </button>
              <button
                onClick={onSave}
                className="p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-200 flex items-center justify-center group"
                title="Save (Ctrl+S)"
              >
                <Save size={18} />
              </button>
              <button
                onClick={onLoad}
                className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200 flex items-center justify-center group"
                title="Open (Ctrl+O)"
              >
                <FolderOpen size={18} />
              </button>
            </div>
          </div>

          {/* Tools */}
          {toolGroups.map((group) => (
            <div key={group.name} className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-600 pb-2">
                {group.name}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {group.tools.map((toolItem) => (
                  <button
                    key={toolItem.id}
                    onClick={() => onToolChange(toolItem.id)}
                    className={`p-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center gap-2 group relative ${
                      tool === toolItem.id
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
                    }`}
                    title={`${toolItem.name} (${toolItem.shortcut})`}
                  >
                    <toolItem.icon size={20} />
                    <span className="text-xs font-medium">
                      {toolItem.name.split(" ")[0]}
                    </span>
                    {tool === toolItem.id && (
                      <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-400 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Tool Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider border-b border-gray-600 pb-2">
              Tool Settings
            </h3>

            {/* Color */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                Colors
              </label>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={toolConfig.color.primary}
                    onChange={(e) =>
                      onToolConfigChange({
                        color: { ...toolConfig.color, primary: e.target.value },
                      })
                    }
                    className="w-12 h-12 rounded-lg border-2 border-gray-600 cursor-pointer"
                  />
                  <span className="absolute -bottom-6 left-0 text-xs text-gray-400">
                    Primary
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="color"
                    value={toolConfig.color.secondary}
                    onChange={(e) =>
                      onToolConfigChange({
                        color: {
                          ...toolConfig.color,
                          secondary: e.target.value,
                        },
                      })
                    }
                    className="w-10 h-10 rounded-lg border-2 border-gray-600 cursor-pointer"
                  />
                  <span className="absolute -bottom-6 left-0 text-xs text-gray-400">
                    Secondary
                  </span>
                </div>
                <input
                  type="text"
                  value={toolConfig.color.primary}
                  onChange={(e) =>
                    onToolConfigChange({
                      color: { ...toolConfig.color, primary: e.target.value },
                    })
                  }
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm font-mono"
                  placeholder="#000000"
                />
              </div>
            </div>

            {/* Brush Settings */}
            {["brush", "pen", "pencil", "eraser", "airbrush"].includes(
              tool
            ) && (
              <>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-300">
                    Size
                    <span className="text-blue-400 font-mono">
                      {toolConfig.brush.size}px
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="200"
                    value={toolConfig.brush.size}
                    onChange={(e) =>
                      onToolConfigChange({
                        brush: {
                          ...toolConfig.brush,
                          size: parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-300">
                    Opacity
                    <span className="text-blue-400 font-mono">
                      {toolConfig.brush.opacity}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={toolConfig.brush.opacity}
                    onChange={(e) =>
                      onToolConfigChange({
                        brush: {
                          ...toolConfig.brush,
                          opacity: parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-300">
                    Hardness
                    <span className="text-blue-400 font-mono">
                      {toolConfig.brush.hardness}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={toolConfig.brush.hardness}
                    onChange={(e) =>
                      onToolConfigChange({
                        brush: {
                          ...toolConfig.brush,
                          hardness: parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-gray-300">
                    Flow
                    <span className="text-blue-400 font-mono">
                      {toolConfig.brush.flow}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={toolConfig.brush.flow}
                    onChange={(e) =>
                      onToolConfigChange({
                        brush: {
                          ...toolConfig.brush,
                          flow: parseInt(e.target.value),
                        },
                      })
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </>
            )}

            {/* Blend Mode */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Blend Mode
              </label>
              <select
                value={toolConfig.blendMode}
                onChange={(e) =>
                  onToolConfigChange({ blendMode: e.target.value as BlendMode })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm"
              >
                {blendModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode.charAt(0).toUpperCase() +
                      mode.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Alpha */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-sm font-medium text-gray-300">
                Alpha
                <span className="text-blue-400 font-mono">
                  {toolConfig.color.alpha}%
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={toolConfig.color.alpha}
                onChange={(e) =>
                  onToolConfigChange({
                    color: {
                      ...toolConfig.color,
                      alpha: parseInt(e.target.value),
                    },
                  })
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layers Panel */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
              Layers
            </h3>
            <button
              onClick={onLayerCreate}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors"
              title="New Layer"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {layers
              .slice()
              .reverse()
              .map((layer, index) => (
                <div
                  key={layer.id}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                    activeLayerId === layer.id
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => onLayerChange(layer.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-600 rounded border border-gray-500 flex items-center justify-center">
                        <Layers size={14} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {layer.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {layer.blendMode}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerToggleVisibility(layer.id);
                        }}
                        className="p-1 rounded hover:bg-gray-600 transition-colors"
                        title={layer.visible ? "Hide Layer" : "Show Layer"}
                      >
                        {layer.visible ? (
                          <Eye size={14} />
                        ) : (
                          <EyeOff size={14} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerToggleLock(layer.id);
                        }}
                        className="p-1 rounded hover:bg-gray-600 transition-colors"
                        title={layer.locked ? "Unlock Layer" : "Lock Layer"}
                      >
                        {layer.locked ? (
                          <Lock size={14} />
                        ) : (
                          <Unlock size={14} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onLayerDelete(layer.id);
                        }}
                        className="p-1 rounded hover:bg-red-600 transition-colors text-red-400 hover:text-white"
                        title="Delete Layer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Opacity</span>
                      <span>{layer.opacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={layer.opacity}
                      onChange={(e) => {
                        e.stopPropagation();
                        // Handle layer opacity change
                      }}
                      className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer mt-1"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
