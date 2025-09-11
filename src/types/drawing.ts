export interface CanvasProps {
  tool: Tool;
  brushSize: number;
  color: string;
  zoom: number;
  setIsDrawing: (drawing: boolean) => void;
  externalRefs?: {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    ctxRef: React.RefObject<CanvasRenderingContext2D | null>;
  };
}

export interface StatusbarProps {
  tool: string;
  brushSize: number;
  color: string;
  zoom: number;
  isDrawing: boolean;
}

export interface ToolbarProps {
  tool: Tool;
  setTool: (tool: Tool) => void;
  brushSize: number;
  setBrushSize: (size: number) => void;
  color: string;
  setColor: (color: string) => void;
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  clearCanvas: () => void;
}

export type Tool = "pen" | "eraser" | "square" | "circle" | "line" | "text";
