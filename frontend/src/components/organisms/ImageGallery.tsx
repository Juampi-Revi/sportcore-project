import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FaChevronLeft,
    FaChevronRight,
    FaCompress,
    FaDownload,
    FaExpand,
    FaHeart,
    FaPause,
    FaPlay,
    FaShare,
    FaTimes
} from 'react-icons/fa';

interface ImageGalleryProps {
  images: string[];
  altText: string;
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  productName?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  altText,
  isOpen,
  onClose,
  initialIndex = 0,
  productName = ''
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setZoomLevel(1);
      setPanPosition({ x: 0, y: 0 });
      setIsFullscreen(false);
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isOpen) return;

    switch (event.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        event.preventDefault();
        goToNext();
        break;
      case ' ':
        event.preventDefault();
        togglePlayPause();
        break;
      case '+':
      case '=':
        event.preventDefault();
        zoomIn();
        break;
      case '-':
        event.preventDefault();
        zoomOut();
        break;
      case '0':
        event.preventDefault();
        resetZoom();
        break;
      case 'f':
      case 'F':
        event.preventDefault();
        toggleFullscreen();
        break;
    }
  }, [isOpen, currentIndex, images.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    resetZoom();
  };

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5));
    setIsZoomed(true);
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
    if (zoomLevel <= 1) {
      setIsZoomed(false);
    }
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
    setPanPosition({ x: 0, y: 0 });
  };

  // Fullscreen functions
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto-play functions
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && images.length > 1) {
      interval = setInterval(goToNext, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  // Mouse events for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isZoomed) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Share function
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out this product: ${productName}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(t('gallery.linkCopied'));
    }
  };

  // Download function
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = images[currentIndex];
    link.download = `${productName}-${currentIndex + 1}.jpg`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-white text-xl font-semibold">
              {productName}
            </h2>
            <span className="text-white/70 text-sm">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Play/Pause button */}
            {images.length > 1 && (
              <button
                onClick={togglePlayPause}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300"
                title={isPlaying ? t('gallery.pause') : t('gallery.play')}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            )}
            
            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300"
              title={t('gallery.share')}
            >
              <FaShare />
            </button>
            
            {/* Download button */}
            <button
              onClick={handleDownload}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300"
              title={t('gallery.download')}
            >
              <FaDownload />
            </button>
            
            {/* Like button */}
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 backdrop-blur-sm rounded-full transition-colors duration-300 ${
                isLiked 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={t('gallery.like')}
            >
              <FaHeart className={isLiked ? 'fill-current' : ''} />
            </button>
            
            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300"
              title={isFullscreen ? t('gallery.exitFullscreen') : t('gallery.fullscreen')}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300"
              title={t('gallery.close')}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="flex items-center justify-center h-full pt-20 pb-32">
        <div className="relative max-w-7xl max-h-full">
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300"
                title={t('gallery.previous')}
              >
                <FaChevronLeft className="text-2xl" />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300"
                title={t('gallery.next')}
              >
                <FaChevronRight className="text-2xl" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={images[currentIndex]}
              alt={`${altText} ${currentIndex + 1}`}
              className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
                isZoomed ? 'cursor-grab' : 'cursor-zoom-in'
              }`}
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
                transformOrigin: 'center center'
              }}
              onClick={isZoomed ? undefined : zoomIn}
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
          <div className="flex justify-center space-x-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentIndex === index
                    ? 'border-white shadow-lg scale-110'
                    : 'border-white/30 hover:border-white/60'
                }`}
              >
                <img
                  src={image}
                  alt={`${altText} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full p-2">
        <button
          onClick={zoomOut}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-300"
          title={t('gallery.zoomOut')}
        >
          <span className="text-lg font-bold">-</span>
        </button>
        
        <span className="text-white text-sm px-3">
          {Math.round(zoomLevel * 100)}%
        </span>
        
        <button
          onClick={zoomIn}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-300"
          title={t('gallery.zoomIn')}
        >
          <span className="text-lg font-bold">+</span>
        </button>
        
        <button
          onClick={resetZoom}
          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors duration-300"
          title={t('gallery.resetZoom')}
        >
          <span className="text-sm">100%</span>
        </button>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="absolute top-20 right-6 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white text-sm">
        <div className="space-y-1">
          <div><kbd className="bg-white/20 px-1 rounded">ESC</kbd> {t('gallery.close')}</div>
          <div><kbd className="bg-white/20 px-1 rounded">←</kbd> <kbd className="bg-white/20 px-1 rounded">→</kbd> {t('gallery.navigate')}</div>
          <div><kbd className="bg-white/20 px-1 rounded">+</kbd> <kbd className="bg-white/20 px-1 rounded">-</kbd> {t('gallery.zoom')}</div>
          <div><kbd className="bg-white/20 px-1 rounded">F</kbd> {t('gallery.fullscreen')}</div>
          <div><kbd className="bg-white/20 px-1 rounded">SPACE</kbd> {t('gallery.playPause')}</div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
