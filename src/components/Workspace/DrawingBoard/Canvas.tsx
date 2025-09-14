"use client";

import React, { useEffect, useRef } from "react";
import { CanvasProps } from "@/types";

export default function Canvas({
  tool,
  brushSize,
  color,
  zoom,
  setIsDrawing,
  externalRefs,
}: CanvasProps) {
  const internalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const internalCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasRef = externalRefs?.canvasRef || internalCanvasRef;
  const ctxRef = externalRefs?.ctxRef || internalCtxRef;

  const startRef = useRef<{ x: number; y: number } | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);
  const latestPosRef = useRef<{ x: number; y: number } | null>(null);
  const isDownRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.offsetWidth * ratio);
    canvas.height = Math.round(canvas.offsetHeight * ratio);
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctxRef.current = ctx;

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [canvasRef, ctxRef]);

  const getCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / zoom,
      y: (e.clientY - rect.top) / zoom,
    };
  };

  const drawPreview = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const start = startRef.current;
    const latest = latestPosRef.current;
    if (!canvas || !ctx || !start || !latest) return;

    if (snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.fillStyle = color;

    if (tool === "square") {
      const w = latest.x - start.x;
      const h = latest.y - start.y;
      ctx.strokeRect(start.x, start.y, w, h);
    } else if (tool === "circle") {
      const radius = Math.sqrt(
        (latest.x - start.x) ** 2 + (latest.y - start.y) ** 2
      );
      ctx.beginPath();
      ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (tool === "line") {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(latest.x, latest.y);
      ctx.stroke();
    } else if (tool === "text") {
      ctx.font = `${brushSize * 4}px sans-serif`;
      ctx.fillText("Text", start.x, start.y);
    }

    rafRef.current = null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const coords = getCoords(e);
    if (!coords) return;

    isDownRef.current = true;
    startRef.current = coords;
    latestPosRef.current = coords;
    setIsDrawing(true);

    if (tool === "pen" || tool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = tool === "eraser" ? "white" : color;
      ctx.lineWidth = brushSize;
      ctx.globalCompositeOperation =
        tool === "eraser" ? "destination-out" : "source-over";
    } else {
      try {
        snapshotRef.current = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
      } catch (err) {
        snapshotRef.current = null;
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDownRef.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;

    const coords = getCoords(e);
    if (!coords) return;

    latestPosRef.current = coords;

    if (tool === "pen" || tool === "eraser") {
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      return;
    }

    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(drawPreview);
    }
  };

  const commitShape = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const start = startRef.current;
    const latest = latestPosRef.current;
    if (!canvas || !ctx || !start || !latest) return;

    if (snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
    }

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.fillStyle = color;
    ctx.globalCompositeOperation = "source-over";

    const dist = Math.sqrt(
      (latest.x - start.x) ** 2 + (latest.y - start.y) ** 2
    );
    
    if (tool === "pen") {
      ctx.beginPath();
      ctx.arc(start.x, start.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (dist < 1) {
      return;
    }

    if (tool === "square") {
      ctx.strokeRect(start.x, start.y, latest.x - start.x, latest.y - start.y);
    } else if (tool === "circle") {
      const radius = Math.sqrt(
        (latest.x - start.x) ** 2 + (latest.y - start.y) ** 2
      );
      ctx.beginPath();
      ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (tool === "line") {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(latest.x, latest.y);
      ctx.stroke();
    } else if (tool === "text") {
      const text = prompt("Enter text:");
      if (text) {
        ctx.font = `${brushSize * 4}px sans-serif`;
        ctx.fillText(text, start.x, start.y);
      }
    }

    snapshotRef.current = null;
    startRef.current = null;
    latestPosRef.current = null;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    setIsDrawing(false);

    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (tool === "pen") {
      const coords = getCoords(e);
      if (coords && ctxRef.current) {
        ctxRef.current.lineTo(coords.x, coords.y);
        ctxRef.current.stroke();
      }
    } else if (tool === "eraser") {
      const coords = getCoords(e);
      if (coords && ctxRef.current) {
        ctxRef.current.lineTo(coords.x, coords.y);
        ctxRef.current.stroke();
      }
    } else {
      const coords = getCoords(e);
      if (coords) latestPosRef.current = coords;
      commitShape();
    }
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
      />
    </div>
  );
}
