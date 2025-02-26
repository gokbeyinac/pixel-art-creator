'use client';

interface CanvasSizeSelectorProps {
  canvasSize: { width: number; height: number };
  onCanvasSizeChange: (size: { width: number; height: number }) => void;
}

const availableSizes = [
  { width: 800, height: 800, label: '800×800' },
  { width: 1000, height: 1000, label: '1000×1000' },
  { width: 1200, height: 1080, label: '1200×1080' },
];

export default function CanvasSizeSelector({ canvasSize, onCanvasSizeChange }: CanvasSizeSelectorProps) {
  const isPresetSize = availableSizes.some(
    size => size.width === canvasSize.width && size.height === canvasSize.height
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Canvas Size</h2>
      <div className="flex flex-wrap gap-1 mb-2">
        {availableSizes.map((size) => (
          <button
            key={size.label}
            className={`px-2 py-1 text-sm rounded-md ${
              canvasSize.width === size.width && canvasSize.height === size.height
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onCanvasSizeChange(size)}
          >
            {size.label}
          </button>
        ))}
      </div>
      <div className="text-xs text-gray-600 mt-1">
        Piksel boyutu otomatik hesaplanacaktır
      </div>
    </div>
  );
} 