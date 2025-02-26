'use client';

import { useState, useRef } from 'react';
import ColorPicker from '@/components/color-picker';
import PixelGrid from '@/components/pixel-grid';
import ExportOptions from '@/components/export-options';
import GridSizeSelector from '@/components/grid-size-selector';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [gridSize, setGridSize] = useState(16);
  const [grid, setGrid] = useState<string[][]>([]);
  const [fileName, setFileName] = useState('pixel-art');
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
  };

  const handleGridChange = (newGrid: string[][]) => {
    setGrid(newGrid);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Pixel Art Creator</h1>
        <p className="text-gray-600">Create and download your pixel art masterpiece</p>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-6">
          <ColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor} />
          <GridSizeSelector gridSize={gridSize} onGridSizeChange={handleGridSizeChange} />
          <ExportOptions 
            gridRef={gridRef} 
            fileName={fileName} 
            setFileName={setFileName} 
          />
        </div>

        <div className="w-full md:w-2/3 flex justify-center">
          <div ref={gridRef}>
            <PixelGrid 
              gridSize={gridSize} 
              selectedColor={selectedColor} 
              onGridChange={handleGridChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 