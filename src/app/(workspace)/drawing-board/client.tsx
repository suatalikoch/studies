"use client";

import React, { useRef, useState } from "react";
import Canvas from "@/components/Workspace/DrawingBoard/Canvas";
import Statusbar from "@/components/Workspace/DrawingBoard/Statusbar";
import { Tool } from "@/types";
import Toolbar from "@/components/Workspace/DrawingBoard/Toolbar";

export default function DrawingBoardClient() {
  const [tool, setTool] = useState<Tool>("pen");
  const [brushSize, setBrushSize] = useState(5);
  const [color, setColor] = useState("#3B82F6");
  const [zoom, setZoom] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.5));

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-600 p-4 overflow-x-auto sm:overflow-x-visible">
        <Toolbar
          tool={tool}
          setTool={setTool}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
          color={color}
          setColor={setColor}
          zoom={zoom}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          clearCanvas={clearCanvas}
        />
      </div>
      <div className="flex-1 p-4">
        <Canvas
          tool={tool}
          brushSize={brushSize}
          color={color}
          zoom={zoom}
          setIsDrawing={setIsDrawing}
          externalRefs={{ canvasRef, ctxRef }}
        />
      </div>
      <Statusbar
        tool={tool}
        brushSize={brushSize}
        color={color}
        zoom={zoom}
        isDrawing={isDrawing}
      />
    </div>
  );
}
