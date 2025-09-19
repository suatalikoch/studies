import { Tool, ToolbarProps } from "@/types";
import ColorSelector from "@/components/Workspace/DrawingBoard/ColorSelector";
import {
  Circle,
  Download,
  Eraser,
  Minus,
  PaintBucket,
  Palette,
  PenLine,
  RectangleHorizontal,
  RotateCw,
  Save,
  Trash2,
  Type,
  Upload,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  Badge,
  Button,
  Separator,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/UI";

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
  const PALETTE_COLORS = [
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <ToggleGroup
          type="single"
          variant="outline"
          value={tool}
          onValueChange={(value: Tool) => value && setTool(value)}
        >
          {(
            [
              "pen",
              "eraser",
              "rectangle",
              "circle",
              "line",
              "bucket",
              "text",
            ] as Tool[]
          ).map((t) => (
            <ToggleGroupItem
              key={t}
              value={t}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
              className="aspect-square"
            >
              {t === "pen" && <PenLine />}
              {t === "eraser" && <Eraser />}
              {t === "rectangle" && <RectangleHorizontal />}
              {t === "circle" && <Circle />}
              {t === "line" && <Minus />}
              {t === "bucket" && <PaintBucket />}
              {t === "text" && <Type />}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Separator orientation="vertical" />
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Size:
          </span>
          <Slider
            min={1}
            max={99}
            step={1}
            value={[brushSize]}
            onValueChange={(value) => setBrushSize(value[0])}
            className="w-20"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300 w-6">
            {brushSize}
          </span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <Palette className="w-6 h-6 text-gray-600" />
          <div className="flex items-center gap-1">
            {PALETTE_COLORS.map((c) => (
              <Button
                key={c}
                onClick={() => setColor(c)}
                className={`w-6 h-6 p-0 rounded-full border-1 ${
                  color === c ? "border-indigo-600" : "border-gray-300"
                }`}
                style={{ backgroundColor: c }}
                type="button"
                title={`Color: ${c.toUpperCase()}`}
              />
            ))}
            <ColorSelector color={color} setColor={setColor} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={zoomOut}
          title="Zoom In"
        >
          <ZoomOut className="w-5 h-5" />
        </Button>
        <Badge variant="secondary" className="text-sm">
          {(zoom * 100).toFixed(0)}%
        </Badge>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={zoomIn}
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </Button>
        <Separator orientation="vertical" />
        <div className="flex items-center pl-4 gap-2">
          <Button variant="ghost" size="icon">
            <Upload className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Save className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCw className="w-5 h-5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={clearCanvas}
            title="Clear Canvas"
            className="text-red-500 hover:text-white hover:bg-red-500 hover:dark:bg-red-900"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
