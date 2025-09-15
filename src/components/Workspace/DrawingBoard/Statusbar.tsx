import { StatusbarProps } from "@/types";

export default function Statusbar({
  tool,
  brushSize,
  color,
  zoom,
  statusMessage,
}: StatusbarProps) {
  return (
    <div className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-600 px-4 py-2">
      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-4">
          <span>
            Tool:{" "}
            <strong>{tool.charAt(0).toUpperCase() + tool.slice(1)}</strong>
          </span>
          <span>
            Size: <strong>{brushSize}</strong>
          </span>
          <span className="flex items-center gap-1">
            Color:
            <div
              className="inline-block w-4 h-4 rounded-full border border-gray-300 align-middle"
              style={{ backgroundColor: color }}
            ></div>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span>
            Zoom: <strong>{(zoom * 100).toFixed(0)}%</strong>
          </span>
          <span>{statusMessage}</span>
        </div>
      </div>
    </div>
  );
}
