"use client";

import React, { useRef, useState, useEffect } from "react";

type Tool = "pen" | "eraser" | "square" | "circle" | "line" | "text";

export default function DrawingBoardClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [tool, setTool] = useState<Tool>("pen");
  const [brushSize, setBrushSize] = useState(5);
  const [color, setColor] = useState("#3B82F6");
  const [zoom, setZoom] = useState(1);

  // For drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );

  // On mount, initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctxRef.current = ctx;
  }, []);

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Handle mouse down (start drawing)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    setIsDrawing(true);
    setStartPos({ x, y });

    if (tool === "pen" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  // Handle mouse move (drawing)
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (tool === "pen") {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalCompositeOperation = "source-over";
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (tool === "eraser") {
      ctx.strokeStyle = "white";
      ctx.lineWidth = brushSize;
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  // Handle mouse up (finish drawing shapes or lines)
  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || !startPos) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    ctx.globalCompositeOperation = "source-over"; // reset

    const dist = Math.sqrt((x - startPos.x) ** 2 + (y - startPos.y) ** 2);

    if (dist < 5) {
      // Draw a small circle (dot) at click position
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(startPos.x, startPos.y, brushSize / 2, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      // Normal shape drawing
      if (tool === "square") {
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (tool === "circle") {
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        const radius = Math.sqrt(
          Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
        );
        ctx.beginPath();
        ctx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (tool === "line") {
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }

    setStartPos(null);
  };

  // Zoom handlers
  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Drawing Tools */}
            <div className="flex items-center space-x-2 border-r border-gray-300 dark:border-gray-600 pr-4">
              {/* Buttons with static styling; highlight active tool manually or via JS */}
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
                  {/* Icons simplified for brevity */}
                  {t === "pen" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                    </svg>
                  )}
                  {t === "eraser" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 16l4-4-7-7-4 4 7 7z" />
                      <path d="M12 12l-6 6" />
                    </svg>
                  )}
                  {t === "square" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    </svg>
                  )}
                  {t === "circle" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  )}
                  {t === "line" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  )}
                  {t === "text" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 7h16M4 17h16M9 7v10M15 7v10" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Brush Size */}
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

            {/* Colors */}
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9a9 9 0 01-9-9 9 9 0 019-9z" />
                <circle cx="15" cy="9" r="1" />
                <circle cx="9" cy="9" r="1" />
                <circle cx="12" cy="15" r="1" />
              </svg>
              <div className="flex space-x-1">
                {["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"].map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-6 h-6 rounded border-2 ${
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
                className="w-8 h-8 rounded border border-gray-300"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={zoomOut}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900 rounded-lg transition-colors"
              title="Zoom Out"
              type="button"
            >
              {/* Zoom Out */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="19" x2="15" y2="15" />
                <circle cx="11" cy="11" r="8" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
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
              {/* Zoom In */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </button>

            <div className="border-l border-gray-300 pl-2 ml-2 flex space-x-2">
              {/* Upload */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4" />
                  <path d="M20 21H4" />
                </svg>
              </button>
              {/* Download */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 17v-12m0 12l4-4m-4 4l-4-4" />
                  <path d="M20 21H4" />
                </svg>
              </button>
              {/* Save */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <path d="M17 21v-8H7v8" />
                </svg>
              </button>
              {/* Rotate */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12a10 10 0 0117.4-7.5M2 12v6h6" />
                </svg>
              </button>
              {/* Trash */}
              <button
                onClick={clearCanvas}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear Canvas"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-4">
        <div className="h-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair"
            style={{ transformOrigin: "top left" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          ></canvas>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>
              Tool: <strong>{tool}</strong>
            </span>
            <span>
              Size: <strong>{brushSize}</strong>
            </span>
            <span>
              Color:{" "}
              <div
                className="inline-block w-4 h-4 rounded border border-gray-300 align-middle"
                style={{ backgroundColor: color }}
              ></div>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>
              Zoom: <strong>{(zoom * 100).toFixed(0)}%</strong>
            </span>
            <span>{isDrawing ? "Drawing..." : "Ready"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
