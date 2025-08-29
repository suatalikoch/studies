"use client";

import { Tool } from "@/types";
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
import React, { useRef, useState, useEffect } from "react";

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
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

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
      } else if (tool === "text") {
        const text = prompt("Enter text:");
        if (text) {
          ctx.fillStyle = color;
          ctx.font = `${brushSize * 4}px sans-serif`;
          ctx.fillText(text, startPos.x, startPos.y);
        }
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
                  {t === "pen" && <PenLine className="w-5 h-5" />}
                  {t === "eraser" && <Eraser className="w-5 h-5" />}
                  {t === "square" && <Square className="w-5 h-5" />}
                  {t === "circle" && <Circle className="w-5 h-5" />}
                  {t === "line" && <Minus className="w-5 h-5" />}
                  {t === "text" && <Type className="w-5 h-5" />}
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
              <Palette className="w-5 h-5 text-gray-600" />
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
              {/* Zoom In */}
              <ZoomIn className="w-5 h-5" />
            </button>

            <div className="border-l border-gray-300 pl-2 ml-2 flex space-x-2">
              {/* Upload */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Upload className="w-5 h-5" />
              </button>
              {/* Download */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              {/* Save */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <Save className="w-5 h-5" />
              </button>
              {/* Rotate */}
              <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                <RotateCw className="w-5 h-5" />
              </button>
              {/* Trash */}
              <button
                onClick={clearCanvas}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Clear Canvas"
                type="button"
              >
                <Trash2 className="w-5 h-5" />
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
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
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
