'use client';

import { useRef } from 'react';
import { toPng } from 'html-to-image';

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
      (pixel as HTMLElement).style.border = '1px solid #f3f4f6'; // Tailwind gray-100 rengi
    });
  };

  const downloadAsSVG = () => {
    if (!gridRef.current) return;
    
    try {
      // Grid boyutları ve piksel boyutları hakkında bilgi almak
      const gridElement = gridRef.current;
      const pixelElements = gridElement.querySelectorAll('div[data-row]');
      
      if (pixelElements.length === 0) {
        throw new Error('Grid pikselleri bulunamadı.');
      }

      // Piksel matrisinin boyutlarını bul
      const rows = new Set();
      const columns = new Set();
      pixelElements.forEach(pixel => {
        rows.add(pixel.getAttribute('data-row'));
        columns.add(pixel.getAttribute('data-col'));
      });
      
      const gridSize = Math.max(rows.size, columns.size);
      
      // İlk pikselin boyutlarını al (tüm pikseller aynı boyutta olmalı)
      const firstPixel = pixelElements[0] as HTMLElement;
      const pixelWidth = parseInt(firstPixel.style.width);
      const pixelHeight = parseInt(firstPixel.style.height);
      
      // SVG'nin toplam boyutlarını hesapla
      const svgWidth = pixelWidth * gridSize;
      const svgHeight = pixelHeight * gridSize;
      
      // SVG başlangıç metni
      let svgContent = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
      
      // Her pikseli SVG içine ekle
      pixelElements.forEach(pixel => {
        const pixelElement = pixel as HTMLElement;
        const row = parseInt(pixelElement.getAttribute('data-row') || '0');
        const col = parseInt(pixelElement.getAttribute('data-col') || '0');
        const color = pixelElement.style.backgroundColor;
        
        // Sadece renklendirilmiş pikselleri ekle (transparent olmayanlar)
        if (color && color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)') {
          const x = col * pixelWidth;
          const y = row * pixelHeight;
          svgContent += `<rect x="${x}" y="${y}" width="${pixelWidth}" height="${pixelHeight}" fill="${color}" />`;
        }
      });
      
      // SVG'yi kapat
      svgContent += '</svg>';
      
      // SVG içeriğini data URL'e dönüştür
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // İndirme bağlantısını oluştur ve tıkla
      const link = document.createElement('a');
      link.download = `${fileName || 'pixel-art'}.svg`;
      link.href = svgUrl;
      link.click();
      
      // URL nesnesini temizle
      setTimeout(() => {
        URL.revokeObjectURL(svgUrl);
      }, 100);
      
    } catch (error) {
      console.error('Error exporting SVG:', error);
      alert('SVG olarak dışa aktarmada hata oluştu. Lütfen tekrar deneyin.');
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
      alert('PNG olarak dışa aktarmada hata oluştu. Lütfen tekrar deneyin.');
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