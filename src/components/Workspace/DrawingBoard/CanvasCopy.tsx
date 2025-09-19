import React, { useEffect, useRef, useCallback, useState } from "react";
import { CanvasCopyProps, Point, SelectionArea } from "@/types/drawing";

export default function CanvasCopy({
  tool,
  toolConfig,
  zoom,
  activeLayer,
  layers,
  selection,
  onColorPick,
  onHistoryAdd,
  onLayerUpdate,
}: CanvasCopyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const compositeCanvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null);
  const [lastPoint, setLastPoint] = useState<Point | null>(null);
  const [previewSnapshot, setPreviewSnapshot] = useState<ImageData | null>(
    null
  );

  const drawingPathRef = useRef<Point[]>([]);
  const pressureRef = useRef<number>(1);

  // Initialize canvases
  useEffect(() => {
    const composite = compositeCanvasRef.current;
    const preview = previewCanvasRef.current;
    const overlay = overlayCanvasRef.current;

    if (!composite || !preview || !overlay) return;

    const setupCanvas = (canvas: HTMLCanvasElement) => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = 1200 * ratio;
      canvas.height = 800 * ratio;
      canvas.style.width = "1200px";
      canvas.style.height = "800px";

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(ratio, ratio);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
      }

      return ctx;
    };

    setupCanvas(composite);
    setupCanvas(preview);
    setupCanvas(overlay);

    // Fill composite with white background
    const compositeCtx = composite.getContext("2d");
    if (compositeCtx) {
      compositeCtx.fillStyle = "#ffffff";
      compositeCtx.fillRect(0, 0, 1200, 800);
    }
  }, []);

  // Composite all layers
  const updateComposite = useCallback(() => {
    const composite = compositeCanvasRef.current;
    if (!composite) return;

    const ctx = composite.getContext("2d");
    if (!ctx) return;

    // Clear and fill with white
    ctx.clearRect(0, 0, 1200, 800);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1200, 800);

    // Composite all visible layers
    layers.forEach((layer) => {
      if (!layer.visible) return;

      ctx.globalAlpha = layer.opacity / 100;
      ctx.globalCompositeOperation = layer.blendMode;
      ctx.drawImage(layer.canvas, 0, 0);
    });

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }, [layers]);

  // Update composite when layers change
  useEffect(() => {
    updateComposite();
  }, [layers, updateComposite]);

  const getCoordinates = useCallback(
    (e: React.PointerEvent): Point | null => {
      const composite = compositeCanvasRef.current;
      if (!composite) return null;

      const rect = composite.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) / zoom,
        y: (e.clientY - rect.top) / zoom,
      };
    },
    [zoom]
  );

  const clearPreview = () => {
    const preview = previewCanvasRef.current;
    if (!preview) return;

    const ctx = preview.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 1200, 800);
    }
  };

  const drawShapePreview = useCallback(
    (start: Point, end: Point) => {
      const preview = previewCanvasRef.current;
      if (!preview) return;

      const ctx = preview.getContext("2d");
      if (!ctx) return;

      clearPreview();

      ctx.strokeStyle = toolConfig.color.primary;
      ctx.fillStyle = toolConfig.color.primary;
      ctx.lineWidth = toolConfig.brush.size;
      ctx.globalAlpha =
        (toolConfig.color.alpha / 100) * (toolConfig.brush.opacity / 100);
      ctx.setLineDash(tool === "select" ? [8, 8] : []);

      ctx.beginPath();

      switch (tool) {
        case "rectangle":
        case "select":
          const width = end.x - start.x;
          const height = end.y - start.y;
          ctx.strokeRect(start.x, start.y, width, height);
          if (tool === "select") {
            ctx.fillStyle = "rgba(0, 123, 255, 0.1)";
            ctx.fillRect(start.x, start.y, width, height);
          }
          break;

        case "circle":
          const radius = Math.sqrt(
            (end.x - start.x) ** 2 + (end.y - start.y) ** 2
          );
          ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;

        case "line":
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          break;
      }

      ctx.setLineDash([]);
    },
    [tool, toolConfig]
  );

  const commitShape = useCallback(
    (start: Point, end: Point) => {
      if (!activeLayer) return;

      const ctx = activeLayer.ctx;
      ctx.strokeStyle = toolConfig.color.primary;
      ctx.fillStyle = toolConfig.color.primary;
      ctx.lineWidth = toolConfig.brush.size;
      ctx.globalAlpha =
        (toolConfig.color.alpha / 100) * (toolConfig.brush.opacity / 100);
      ctx.globalCompositeOperation = toolConfig.blendMode;

      ctx.beginPath();

      switch (tool) {
        case "rectangle":
          const width = end.x - start.x;
          const height = end.y - start.y;
          ctx.strokeRect(start.x, start.y, width, height);
          break;

        case "circle":
          const radius = Math.sqrt(
            (end.x - start.x) ** 2 + (end.y - start.y) ** 2
          );
          ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
          ctx.stroke();
          break;

        case "line":
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          break;

        case "text":
          const text = prompt("Enter text:");
          if (text) {
            ctx.font = `${toolConfig.brush.size * 3}px Arial`;
            ctx.fillText(text, start.x, start.y);
          }
          break;
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      clearPreview();
      updateComposite();
      onHistoryAdd();
      onLayerUpdate(activeLayer.id);
    },
    [
      activeLayer,
      tool,
      toolConfig,
      updateComposite,
      onHistoryAdd,
      onLayerUpdate,
    ]
  );

  const performBucketFill = useCallback(
    (x: number, y: number) => {
      if (!activeLayer) return;

      const ctx = activeLayer.ctx;
      const imageData = ctx.getImageData(
        0,
        0,
        activeLayer.canvas.width,
        activeLayer.canvas.height
      );
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;

      const targetColor = ctx.getImageData(
        Math.floor(x),
        Math.floor(y),
        1,
        1
      ).data;
      const fillColor = hexToRgba(toolConfig.color.primary);

      if (colorsEqual(targetColor, fillColor)) return;

      // Optimized flood fill algorithm
      const visited = new Set<string>();
      const stack: Point[] = [{ x: Math.floor(x), y: Math.floor(y) }];

      while (stack.length > 0) {
        const point = stack.pop()!;
        const key = `${point.x},${point.y}`;

        if (visited.has(key)) continue;
        if (point.x < 0 || point.x >= width || point.y < 0 || point.y >= height)
          continue;

        const index = (point.y * width + point.x) * 4;
        const currentColor = [
          data[index],
          data[index + 1],
          data[index + 2],
          data[index + 3],
        ];

        if (!colorsEqual(currentColor, targetColor)) continue;

        visited.add(key);

        // Apply fill color with alpha blending
        const alpha = (toolConfig.color.alpha / 100) * (fillColor[3] / 255);
        data[index] = Math.round(
          fillColor[0] * alpha + currentColor[0] * (1 - alpha)
        );
        data[index + 1] = Math.round(
          fillColor[1] * alpha + currentColor[1] * (1 - alpha)
        );
        data[index + 2] = Math.round(
          fillColor[2] * alpha + currentColor[2] * (1 - alpha)
        );
        data[index + 3] = Math.round(
          fillColor[3] * alpha + currentColor[3] * (1 - alpha)
        );

        // Add neighboring pixels
        stack.push(
          { x: point.x + 1, y: point.y },
          { x: point.x - 1, y: point.y },
          { x: point.x, y: point.y + 1 },
          { x: point.x, y: point.y - 1 }
        );
      }

      ctx.putImageData(imageData, 0, 0);
      updateComposite();
      onHistoryAdd();
      onLayerUpdate(activeLayer.id);
    },
    [activeLayer, toolConfig, updateComposite, onHistoryAdd, onLayerUpdate]
  );

  const drawBrushStroke = useCallback(
    (from: Point, to: Point, pressure = 1) => {
      if (!activeLayer) return;

      const ctx = activeLayer.ctx;
      const size = toolConfig.brush.size * pressure;
      const opacity =
        (toolConfig.brush.opacity / 100) * (toolConfig.color.alpha / 100);

      ctx.strokeStyle =
        tool === "eraser" ? "rgba(255,255,255,1)" : toolConfig.color.primary;
      ctx.lineWidth = size;
      ctx.globalAlpha = opacity;
      ctx.globalCompositeOperation =
        tool === "eraser" ? "destination-out" : toolConfig.blendMode;

      // Smooth line drawing with quadratic curves
      if (drawingPathRef.current.length > 2) {
        const path = drawingPathRef.current;
        const len = path.length;

        ctx.beginPath();
        ctx.moveTo(path[len - 3].x, path[len - 3].y);

        const midX = (path[len - 2].x + path[len - 1].x) / 2;
        const midY = (path[len - 2].y + path[len - 1].y) / 2;

        ctx.quadraticCurveTo(path[len - 2].x, path[len - 2].y, midX, midY);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    },
    [activeLayer, tool, toolConfig]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    const coords = getCoordinates(e);
    if (!coords || !activeLayer) return;

    setIsDrawing(true);
    setStartPoint(coords);
    setCurrentPoint(coords);
    setLastPoint(coords);

    // Handle pressure sensitivity
    pressureRef.current = e.pressure || 1;

    if (tool === "bucket") {
      performBucketFill(coords.x, coords.y);
      return;
    }

    if (tool === "eyedropper") {
      const composite = compositeCanvasRef.current;
      if (!composite) return;

      const ctx = composite.getContext("2d");
      if (!ctx) return;

      const imageData = ctx.getImageData(
        Math.floor(coords.x),
        Math.floor(coords.y),
        1,
        1
      );
      const [r, g, b] = imageData.data;
      const color = `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
      onColorPick(color);
      return;
    }

    if (["brush", "pen", "pencil", "eraser", "airbrush"].includes(tool)) {
      drawingPathRef.current = [coords];
      drawBrushStroke(coords, coords, pressureRef.current);
    }

    if (["rectangle", "circle", "line", "select"].includes(tool)) {
      // Save preview snapshot for shape tools
      const preview = previewCanvasRef.current;
      if (preview) {
        const ctx = preview.getContext("2d");
        if (ctx) {
          setPreviewSnapshot(ctx.getImageData(0, 0, 1200, 800));
        }
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    setCurrentPoint(coords);
    pressureRef.current = e.pressure || 1;

    if (!isDrawing || !startPoint) return;

    if (["brush", "pen", "pencil", "eraser", "airbrush"].includes(tool)) {
      if (lastPoint) {
        drawBrushStroke(lastPoint, coords, pressureRef.current);
        drawingPathRef.current.push(coords);
        updateComposite();
      }
      setLastPoint(coords);
    } else if (["rectangle", "circle", "line", "select"].includes(tool)) {
      drawShapePreview(startPoint, coords);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDrawing || !startPoint) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    setIsDrawing(false);

    if (["brush", "pen", "pencil", "eraser", "airbrush"].includes(tool)) {
      updateComposite();
      onHistoryAdd();
      if (activeLayer) {
        onLayerUpdate(activeLayer.id);
      }
    } else if (["rectangle", "circle", "line", "text"].includes(tool)) {
      commitShape(startPoint, coords);
    } else if (tool === "select") {
      // Handle selection creation
      clearPreview();
    }

    setStartPoint(null);
    setCurrentPoint(null);
    setLastPoint(null);
    drawingPathRef.current = [];
    setPreviewSnapshot(null);
  };

  // Helper functions
  const hexToRgba = (hex: string): number[] => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255, 255];
  };

  const colorsEqual = (
    a: number[] | Uint8ClampedArray,
    b: number[]
  ): boolean => {
    return (
      Math.abs(a[0] - b[0]) < 5 &&
      Math.abs(a[1] - b[1]) < 5 &&
      Math.abs(a[2] - b[2]) < 5 &&
      Math.abs(a[3] - b[3]) < 5
    );
  };

  const getCursor = () => {
    switch (tool) {
      case "brush":
      case "pen":
      case "pencil":
      case "eraser":
      case "airbrush":
        return "crosshair";
      case "bucket":
        return "cell";
      case "eyedropper":
        return "crosshair";
      case "select":
      case "move":
        return "default";
      default:
        return "crosshair";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-gray-100 rounded-lg overflow-hidden shadow-inner border-2 border-gray-300"
    >
      <div
        className="relative bg-white"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          cursor: getCursor(),
          width: "1200px",
          height: "800px",
        }}
      >
        {/* Composite canvas - shows all layers combined */}
        <canvas
          ref={compositeCanvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "1200px", height: "800px" }}
        />

        {/* Preview canvas - for shape previews */}
        <canvas
          ref={previewCanvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "1200px", height: "800px" }}
        />

        {/* Overlay canvas - for UI elements like selection marching ants */}
        <canvas
          ref={overlayCanvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ width: "1200px", height: "800px" }}
        />

        {/* Interaction layer */}
        <div
          className="absolute inset-0"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            width: "1200px",
            height: "800px",
            touchAction: "none",
          }}
        />
      </div>
    </div>
  );
}
