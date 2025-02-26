'use client';

import { useRef } from 'react';
import { toPng, toSvg } from 'html-to-image';

interface ExportOptionsProps {
  gridRef: React.RefObject<HTMLDivElement>;
  fileName: string;
  setFileName: (name: string) => void;
}

export default function ExportOptions({ gridRef, fileName, setFileName }: ExportOptionsProps) {
  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  const downloadAsSVG = async () => {
    if (!gridRef.current) return;
    
    try {
      const dataUrl = await toSvg(gridRef.current, { 
        quality: 1,
        pixelRatio: 1
      });
      
      const link = document.createElement('a');
      link.download = `${fileName || 'pixel-art'}.svg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting SVG:', error);
      alert('Failed to export as SVG. Please try again.');
    }
  };

  const downloadAsPNG = async () => {
    if (!gridRef.current) return;
    
    try {
      const dataUrl = await toPng(gridRef.current, { 
        quality: 1,
        pixelRatio: 10 // Higher to ensure good quality
      });
      
      const link = document.createElement('a');
      link.download = `${fileName || 'pixel-art'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting PNG:', error);
      alert('Failed to export as PNG. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Export Options</h2>
      
      <div className="mb-2">
        <label htmlFor="file-name" className="block text-xs font-medium mb-1">
          File Name:
        </label>
        <input
          type="text"
          id="file-name"
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="pixel-art"
          className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
        />
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={downloadAsSVG}
          className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          Download SVG
        </button>
        <button
          onClick={downloadAsPNG}
          className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
} 