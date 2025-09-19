import React from "react";
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Move } from "lucide-react";

interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onFitToScreen: () => void;
  onActualSize: () => void;
  onTogglePan: () => void;
  isPanMode: boolean;
}

const zoomLevels = [
  0.1, 0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.25, 1.5, 2, 3, 4, 5, 8, 10, 16,
];

export default function ZoomControls({
  zoom,
  onZoomChange,
  onFitToScreen,
  onActualSize,
  onTogglePan,
  isPanMode,
}: ZoomControlsProps) {
  const zoomIn = () => {
    const currentIndex = zoomLevels.findIndex((level) => level >= zoom);
    const nextIndex = Math.min(currentIndex + 1, zoomLevels.length - 1);
    onZoomChange(zoomLevels[nextIndex]);
  };

  const zoomOut = () => {
    const currentIndex = zoomLevels.findIndex((level) => level >= zoom);
    const prevIndex = Math.max(currentIndex - 1, 0);
    onZoomChange(zoomLevels[prevIndex]);
  };

  const handleZoomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 1600) {
      onZoomChange(value / 100);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-3 rounded-lg flex items-center gap-3 shadow-lg border border-gray-700">
      <button
        onClick={onTogglePan}
        className={`p-2 rounded transition-all duration-200 ${
          isPanMode
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-gray-700 hover:bg-gray-600"
        }`}
        title="Pan Tool (Space)"
      >
        <Move size={16} />
      </button>

      <div className="w-px h-6 bg-gray-600"></div>

      <button
        onClick={zoomOut}
        disabled={zoom <= zoomLevels[0]}
        className="p-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        title="Zoom Out (Ctrl+-)"
      >
        <ZoomOut size={16} />
      </button>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={Math.round(zoom * 100)}
          onChange={handleZoomInputChange}
          className="w-16 px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-center font-mono"
          min="10"
          max="1600"
          step="1"
        />
        <span className="text-gray-400 text-sm">%</span>
      </div>

      <button
        onClick={zoomIn}
        disabled={zoom >= zoomLevels[zoomLevels.length - 1]}
        className="p-2 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        title="Zoom In (Ctrl++)"
      >
        <ZoomIn size={16} />
      </button>

      <div className="w-px h-6 bg-gray-600"></div>

      <button
        onClick={onActualSize}
        className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-all duration-200"
        title="Actual Size (Ctrl+1)"
      >
        <RotateCcw size={16} />
      </button>

      <button
        onClick={onFitToScreen}
        className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-all duration-200"
        title="Fit to Screen (Ctrl+0)"
      >
        <Maximize2 size={16} />
      </button>

      <div className="text-xs text-gray-400 ml-2">
        Use mouse wheel to zoom, Space+drag to pan
      </div>
    </div>
  );
}
