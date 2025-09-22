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

    if (snapshotRef.current) ctx.putImageData(snapshotRef.current, 0, 0);

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.fillStyle = color;

    if (tool === "rectangle")
      ctx.strokeRect(start.x, start.y, latest.x - start.x, latest.y - start.y);
    else if (tool === "circle") {
      const r = Math.sqrt(
        (latest.x - start.x) ** 2 + (latest.y - start.y) ** 2
      );
      ctx.beginPath();
      ctx.arc(start.x, start.y, r, 0, Math.PI * 2);
      ctx.stroke();
    } else if (tool === "line") {
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(latest.x, latest.y);
      ctx.stroke();
    }

    rafRef.current = null;
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

    if (tool === "rectangle") {
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

  function colorToUint32(r: number, g: number, b: number, a: number) {
    return (a << 24) | (b << 16) | (g << 8) | r;
  }

  function colorMatch(c1: number, c2: number, tolerance: number) {
    if (c1 === c2) return true;
    const r1 = c1 & 0xff,
      g1 = (c1 >> 8) & 0xff,
      b1 = (c1 >> 16) & 0xff,
      a1 = (c1 >> 24) & 0xff;
    const r2 = c2 & 0xff,
      g2 = (c2 >> 8) & 0xff,
      b2 = (c2 >> 16) & 0xff,
      a2 = (c2 >> 24) & 0xff;

    return (
      Math.abs(r1 - r2) <= tolerance &&
      Math.abs(g1 - g2) <= tolerance &&
      Math.abs(b1 - b2) <= tolerance &&
      Math.abs(a1 - a2) <= tolerance
    );
  }

  function hexToRgba(hex: string): [number, number, number, number] {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b, 255];
  }

  function floodFill(
    imageData: ImageData,
    x: number,
    y: number,
    fillColor: [number, number, number, number],
    tolerance = 32
  ) {
    const { width, height, data } = imageData;
    const buffer = new Uint32Array(data.buffer);

    const startIdx = y * width + x;
    const startColor = buffer[startIdx];

    const fillUint32 = colorToUint32(...fillColor);

    if (startColor === fillUint32) return;

    const stack: [number, number][] = [[x, y]];

    while (stack.length) {
      const [cx, cy] = stack.pop()!;
      let px = cx;

      while (
        px >= 0 &&
        colorMatch(buffer[cy * width + px], startColor, tolerance)
      )
        px--;
      px++;

      let reachAbove = false;
      let reachBelow = false;

      while (
        px < width &&
        colorMatch(buffer[cy * width + px], startColor, tolerance)
      ) {
        buffer[cy * width + px] = fillUint32;

        if (cy > 0) {
          if (
            colorMatch(buffer[(cy - 1) * width + px], startColor, tolerance)
          ) {
            if (!reachAbove) {
              stack.push([px, cy - 1]);
              reachAbove = true;
            }
          } else reachAbove = false;
        }

        if (cy < height - 1) {
          if (
            colorMatch(buffer[(cy + 1) * width + px], startColor, tolerance)
          ) {
            if (!reachBelow) {
              stack.push([px, cy + 1]);
              reachBelow = true;
            }
          } else reachBelow = false;
        }

        px++;
      }
    }
  }

  const handleBucketFill = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = hexToRgba(color);

    floodFill(imageData, x, y, targetColor, 32); // tolerance adjustable
    ctx.putImageData(imageData, 0, 0);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const coords = getCoords(e);
    if (!coords) return;

    if (tool === "bucket") {
      handleBucketFill(Math.floor(coords.x), Math.floor(coords.y));
      return;
    }

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
        console.log(err);
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
    <div className="h-full bg-white dark:bg-neutral-950 rounded-lg shadow-sm border overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          cursor: tool === "bucket" ? "cell" : "crosshair",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
}
