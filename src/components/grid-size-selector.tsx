'use client';

interface GridSizeSelectorProps {
  gridSize: number;
  onGridSizeChange: (size: number) => void;
}

const availableSizes = [8, 16, 32, 64];

export default function GridSizeSelector({ gridSize, onGridSizeChange }: GridSizeSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Grid Size</h2>
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={`px-3 py-1.5 rounded-md ${
              gridSize === size
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onGridSizeChange(size)}
          >
            {size} x {size}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Note: Changing grid size will reset your drawing.
      </p>
    </div>
  );
} 