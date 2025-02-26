'use client';

import { useState } from 'react';

interface ColorPickerProps {
  onColorSelect: (color: string) => void;
  selectedColor: string;
}

const defaultColors = [
  '#000000', // Black
  '#FFFFFF', // White
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Orange
  '#800080', // Purple
  '#008000', // Dark Green
  '#A52A2A', // Brown
  '#FFC0CB', // Pink
  '#808080', // Gray
  '#FFD700', // Gold
  '#40E0D0', // Turquoise
];

export default function ColorPicker({ onColorSelect, selectedColor }: ColorPickerProps) {
  const [customColor, setCustomColor] = useState('#000000');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
    onColorSelect(e.target.value);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Colors</h2>
      <div className="flex flex-wrap gap-1 mb-2">
        {defaultColors.map((color) => (
          <button
            key={color}
            className={`w-6 h-6 rounded-md border ${selectedColor === color ? 'ring-2 ring-blue-500 ring-offset-1' : 'border-gray-300'}`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="custom-color" className="text-sm font-medium">
          Custom:
        </label>
        <input
          type="color"
          id="custom-color"
          value={customColor}
          onChange={handleColorChange}
          className="h-8 w-8 cursor-pointer"
        />
        <span className="text-xs">{customColor.toUpperCase()}</span>
      </div>
    </div>
  );
} 