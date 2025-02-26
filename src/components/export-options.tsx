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

  // Geçici olarak piksel sınırlarını kaldırmak için yardımcı fonksiyon
  const removeGridBorders = (gridElement: HTMLElement) => {
    // Tüm pikselleri seçip sınırları kaldır
    const pixels = gridElement.querySelectorAll('div[data-row]');
    pixels.forEach((pixel) => {
      (pixel as HTMLElement).style.border = 'none';
    });
  };

  // Piksel sınırlarını geri eklemek için yardımcı fonksiyon
  const restoreGridBorders = (gridElement: HTMLElement) => {
    // Tüm pikselleri seçip sınırları geri ekle
    const pixels = gridElement.querySelectorAll('div[data-row]');
    pixels.forEach((pixel) => {
      (pixel as HTMLElement).style.border = '1px solid #e5e7eb'; // Tailwind gray-200 rengi
    });
  };

  const downloadAsSVG = async () => {
    if (!gridRef.current) return;
    
    try {
      // Çerçeveleri geçici olarak kaldır
      removeGridBorders(gridRef.current);
      
      const dataUrl = await toSvg(gridRef.current, { 
        quality: 1,
        pixelRatio: 3, // Daha yüksek çözünürlük
        backgroundColor: '#ffffff', // Beyaz arka plan
        skipFonts: true,
        filter: (node) => {
          // Sadece piksel hücrelerini ve ana container'ı dışa aktar
          return (
            node.nodeName !== 'BUTTON' && 
            !node.classList?.contains('border-gray-300') &&
            !node.classList?.contains('shadow-lg')
          );
        }
      });
      
      // Çerçeveleri geri ekle
      restoreGridBorders(gridRef.current);
      
      const link = document.createElement('a');
      link.download = `${fileName || 'pixel-art'}.svg`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting SVG:', error);
      // Hata olsa bile çerçeveleri geri ekle
      if (gridRef.current) restoreGridBorders(gridRef.current);
      alert('Failed to export as SVG. Please try again.');
    }
  };

  const downloadAsPNG = async () => {
    if (!gridRef.current) return;
    
    try {
      // Çerçeveleri geçici olarak kaldır
      removeGridBorders(gridRef.current);
      
      // Ana container'daki sınırları da kaldır
      const originalBorder = gridRef.current.style.border;
      gridRef.current.style.border = 'none';
      
      const dataUrl = await toPng(gridRef.current, { 
        quality: 1,
        pixelRatio: 10, // Yüksek çözünürlük
        backgroundColor: '#ffffff', // Beyaz arka plan
        skipFonts: true,
        filter: (node) => {
          // Sadece piksel hücrelerini dışa aktar
          return (
            node.nodeName !== 'BUTTON' && 
            !node.classList?.contains('border-gray-300') &&
            !node.classList?.contains('shadow-lg')
          );
        }
      });
      
      // Çerçeveleri geri ekle
      restoreGridBorders(gridRef.current);
      gridRef.current.style.border = originalBorder;
      
      const link = document.createElement('a');
      link.download = `${fileName || 'pixel-art'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting PNG:', error);
      // Hata olsa bile çerçeveleri geri ekle
      if (gridRef.current) {
        restoreGridBorders(gridRef.current);
        gridRef.current.style.border = '1px solid #d1d5db'; // Tailwind gray-300 rengi
      }
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