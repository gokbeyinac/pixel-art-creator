'use client';

import { useState, useRef } from 'react';
import ColorPicker from '@/components/color-picker';
import PixelGrid from '@/components/pixel-grid';
import ExportOptions from '@/components/export-options';
import GridSizeSelector from '@/components/grid-size-selector';
import CanvasSizeSelector from '@/components/canvas-size-selector';

export default function Home() {
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [gridSize, setGridSize] = useState(16);
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 1080 });
  const [grid, setGrid] = useState<string[][]>([]);
  const [fileName, setFileName] = useState('pixel-art');
  const gridRef = useRef<HTMLDivElement>(null);

  const handleGridSizeChange = (size: number) => {
    setGridSize(size);
  };

  const handleCanvasSizeChange = (size: { width: number; height: number }) => {
    setCanvasSize(size);
  };

  const handleGridChange = (newGrid: string[][]) => {
    setGrid(newGrid);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleClearCanvas = () => {
    // Yeni boş grid oluştur
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill('transparent'));
    setGrid(newGrid);
  };

  // Calculate pixel size for display in UI
  const pixelWidth = Math.floor(canvasSize.width / gridSize);
  const pixelHeight = Math.floor(canvasSize.height / gridSize);

  return (
    <div className="flex flex-col h-screen">
      <header className="mb-4 text-center py-4">
        <h1 className="text-3xl font-bold">Pixel Art Creator</h1>
      </header>

      {/* Controls in horizontal layout */}
      <div className="flex flex-col md:flex-row gap-4 px-4 pb-4 border-b border-gray-200">
        <div className="md:w-1/4">
          <ColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor} />
        </div>
        <div className="md:w-1/4">
          <GridSizeSelector gridSize={gridSize} onGridSizeChange={handleGridSizeChange} />
        </div>
        <div className="md:w-1/4">
          <CanvasSizeSelector canvasSize={canvasSize} onCanvasSizeChange={handleCanvasSizeChange} />
          <div className="text-xs text-gray-500 mt-1">
            Piksel Boyutu: {pixelWidth}×{pixelHeight}px
          </div>
        </div>
        <div className="md:w-1/4">
          <ExportOptions 
            gridRef={gridRef} 
            fileName={fileName} 
            setFileName={setFileName} 
          />
          <button
            onClick={handleClearCanvas}
            className="w-full mt-2 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 font-medium transition-colors"
          >
            Clear Canvas
          </button>
          <div className="text-center mt-1" style={{ fontSize: '8px', color: '#9CA3AF' }}>
            Gökhan Akıncı hayratı olarak yapılmıştır
          </div>
        </div>
      </div>

      {/* Full-width drawing area with fixed max-width */}
      <div className="flex-grow flex justify-center items-center p-4 overflow-auto bg-gray-50">
        <div 
          className="max-w-[1200px] mx-auto relative"
          style={{ width: '100%' }}
        >
          <div ref={gridRef}>
            <PixelGrid 
              gridSize={gridSize} 
              canvasSize={canvasSize}
              selectedColor={selectedColor} 
              onGridChange={handleGridChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 