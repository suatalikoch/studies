"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasProps } from "@/types";

export default function Canvas({
  tool,
  brushSize,
  color,
  zoom,
  setIsDrawing,
  externalRefs,
}: CanvasProps) {
  const internalCanvasRef = useRef<HTMLCanvasElement>(null);
  const internalCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  const canvasRef = externalRefs?.canvasRef || internalCanvasRef;
  const ctxRef = externalRefs?.ctxRef || internalCtxRef;

  const [isDrawingLocal, setIsDrawingLocal] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null
  );

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
  }, [canvasRef, ctxRef]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    setIsDrawingLocal(true);
    setStartPos({ x, y });
    setIsDrawing(true);

    if (tool === "pen" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingLocal) return;

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

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingLocal) return;
    setIsDrawingLocal(false);
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || !startPos) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    ctx.globalCompositeOperation = "source-over";

    const dist = Math.sqrt((x - startPos.x) ** 2 + (y - startPos.y) ** 2);

    if (dist < 5) {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(startPos.x, startPos.y, brushSize / 2, 0, 2 * Math.PI);
      ctx.fill();
    } else {
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

  return (
    <div className="h-full bg-white dark:bg-gray-950 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden">
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
  );
}
