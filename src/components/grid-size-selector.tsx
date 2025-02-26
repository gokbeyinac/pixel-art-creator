'use client';

interface GridSizeSelectorProps {
  gridSize: number;
  onGridSizeChange: (size: number) => void;
}

const availableSizes = [8, 16, 32, 64];

export default function GridSizeSelector({ gridSize, onGridSizeChange }: GridSizeSelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Grid Size</h2>
      <div className="flex flex-wrap gap-1">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={`px-2 py-1 text-sm rounded-md ${
              gridSize === size
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onGridSizeChange(size)}
          >
            {size}x{size}
          </button>
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-600">
        Changing grid size resets drawing
      </p>
    </div>
  );
} 