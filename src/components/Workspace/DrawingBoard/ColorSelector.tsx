import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI";

export interface ColorSelectorProps {
  color: string;
  setColor: (color: string) => void;
}

export default function ColorSelector({ color, setColor }: ColorSelectorProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="w-8 h-8 rounded-full border border-gray-300"
          style={{ backgroundColor: color }}
          title="Choose color"
        />
      </PopoverTrigger>
      <PopoverContent className="m-4 w-90 h-116">
        <ColorPicker value={color}>
          <ColorPickerSelection />
          <div className="flex items-center gap-4">
            <ColorPickerEyeDropper />
            <div className="grid w-full gap-1">
              <ColorPickerHue />
              <ColorPickerAlpha />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ColorPickerOutput />
            <ColorPickerFormat />
          </div>
        </ColorPicker>
      </PopoverContent>
    </Popover>
  );
}
