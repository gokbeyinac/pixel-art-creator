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
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3">Export Options</h2>
      
      <div className="mb-4">
        <label htmlFor="file-name" className="block text-sm font-medium mb-1">
          File Name:
        </label>
        <input
          type="text"
          id="file-name"
          value={fileName}
          onChange={handleFileNameChange}
          placeholder="pixel-art"
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={downloadAsSVG}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download SVG
        </button>
        <button
          onClick={downloadAsPNG}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
} 