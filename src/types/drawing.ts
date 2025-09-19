export interface CanvasProps {
  tool: Tool;
  brushSize: number;
  color: string;
  zoom: number;
  setIsDrawing: (drawing: boolean) => void;
  externalRefs: {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    ctxRef: React.RefObject<CanvasRenderingContext2D | null>;
  };
}

export interface StatusbarProps {
  tool: string;
  brushSize: number;
  color: string;
  zoom: number;
  statusMessage: string;
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

export type Tool =
  | "brush"
  | "eraser"
  | "bucket"
  | "eyedropper"
  | "select"
  | "move"
  | "rectangle"
  | "circle"
  | "line"
  | "text"
  | "pen"
  | "pencil"
  | "airbrush"
  | "smudge"
  | "blur"
  | "sharpen"
  | "clone"
  | "heal";

export interface Point {
  x: number;
  y: number;
}

export interface CanvasState {
  imageData: ImageData;
  timestamp: number;
  layerId?: string;
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  blendMode: BlendMode;
  locked: boolean;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  thumbnail?: string;
}

export type BlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "soft-light"
  | "hard-light"
  | "color-dodge"
  | "color-burn"
  | "darken"
  | "lighten"
  | "difference"
  | "exclusion";

export interface BrushSettings {
  size: number;
  opacity: number;
  hardness: number;
  spacing: number;
  flow: number;
  pressure: boolean;
  tilt: boolean;
  rotation: boolean;
}

export interface ToolConfig {
  brush: BrushSettings;
  color: {
    primary: string;
    secondary: string;
    alpha: number;
  };
  blendMode: BlendMode;
  antiAlias: boolean;
}

export interface SelectionArea {
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
  marching: boolean;
}

export interface CanvasCopyProps {
  tool: Tool;
  toolConfig: ToolConfig;
  zoom: number;
  activeLayer: Layer | null;
  layers: Layer[];
  selection: SelectionArea | null;
  onColorPick: (color: string) => void;
  onHistoryAdd: () => void;
  onLayerUpdate: (layerId: string) => void;
}

export interface DrawingBoardProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  onSave?: (dataUrl: string) => void;
  onLoad?: (file: File) => void;
}

export interface HistoryState {
  states: CanvasState[];
  currentIndex: number;
  maxStates: number;
}

export interface Workspace {
  canvas: {
    width: number;
    height: number;
    dpi: number;
    colorMode: "RGB" | "CMYK" | "Grayscale";
  };
  view: {
    zoom: number;
    panX: number;
    panY: number;
    rotation: number;
  };
  grid: {
    visible: boolean;
    size: number;
    color: string;
    opacity: number;
  };
  guides: {
    visible: boolean;
    snap: boolean;
    color: string;
  };
}
