'use client';

interface PixelSizeSelectorProps {
  pixelSize: number;
  onPixelSizeChange: (size: number) => void;
}

const availableSizes = [10, 15, 20, 25, 30];

export default function PixelSizeSelector({ pixelSize, onPixelSizeChange }: PixelSizeSelectorProps) {
  const handleCustomSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value);
    if (size >= 5 && size <= 50) {
      onPixelSizeChange(size);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Pixel Size</h2>
      <div className="flex flex-wrap gap-1 mb-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={`px-2 py-1 text-sm rounded-md ${
              pixelSize === size
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => onPixelSizeChange(size)}
          >
            {size}px
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="custom-pixel-size" className="text-xs font-medium">
          Custom:
        </label>
        <input
          type="number"
          id="custom-pixel-size"
          min="5"
          max="50"
          value={availableSizes.includes(pixelSize) ? "" : pixelSize}
          onChange={handleCustomSizeChange}
          placeholder="5-50"
          className="w-16 px-2 py-0.5 text-sm border border-gray-300 rounded-md"
        />
        <span className="text-xs">px</span>
      </div>
    </div>
  );
} 