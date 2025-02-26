'use client';

import { useState, useRef, useEffect } from 'react';

interface PixelGridProps {
  gridSize: number;
  canvasSize: { width: number; height: number };
  selectedColor: string;
  onGridChange: (grid: string[][]) => void;
}

export default function PixelGrid({ gridSize, canvasSize, selectedColor, onGridChange }: PixelGridProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate pixel size based on canvas size and grid size
  const pixelWidth = Math.floor(canvasSize.width / gridSize);
  const pixelHeight = Math.floor(canvasSize.height / gridSize);

  // Initialize the grid with transparent pixels
  useEffect(() => {
    const newGrid = Array(gridSize)
      .fill(null)
      .map(() => Array(gridSize).fill('transparent'));
    setGrid(newGrid);
  }, [gridSize]);

  // Report grid changes to parent
  useEffect(() => {
    if (grid.length > 0) {
      onGridChange(grid);
    }
  }, [grid, onGridChange]);

  const handlePixelClick = (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = selectedColor;
    setGrid(newGrid);
  };

  const handleMouseDown = (rowIndex: number, colIndex: number) => {
    setIsDrawing(true);
    handlePixelClick(rowIndex, colIndex);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseEnter = (rowIndex: number, colIndex: number) => {
    if (isDrawing) {
      handlePixelClick(rowIndex, colIndex);
    }
  };

  // Add event listener to handle mouse up outside the grid
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDrawing(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div 
      ref={gridRef}
      className="grid border border-gray-300 bg-white shadow-md"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, ${pixelWidth}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${pixelHeight}px)`,
        width: `${pixelWidth * gridSize}px`,
        height: `${pixelHeight * gridSize}px`,
      }}
      onMouseLeave={handleMouseUp}
    >
      {grid.map((row, rowIndex) =>
        row.map((color, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className="border border-gray-200 select-none cursor-pointer"
            style={{ 
              backgroundColor: color,
              width: `${pixelWidth}px`,
              height: `${pixelHeight}px`,
            }}
            onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
            onMouseUp={handleMouseUp}
            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            data-row={rowIndex}
            data-col={colIndex}
          />
        ))
      )}
    </div>
  );
} 