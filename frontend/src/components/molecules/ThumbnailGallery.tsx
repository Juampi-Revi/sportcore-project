import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';

interface ThumbnailGalleryProps {
  images: string[];
  selectedIndex: number;
  onImageSelect: (index: number) => void;
  altText: string;
  autoPlay?: boolean;
  showIndicators?: boolean;
  showNavigation?: boolean;
}

const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({
  images,
  selectedIndex,
  onImageSelect,
  altText,
  autoPlay = false,
  showIndicators = true,
  showNavigation = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [visibleStart, setVisibleStart] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const maxVisible = 5; // Maximum number of thumbnails visible at once

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && images.length > 1) {
      interval = setInterval(() => {
        const nextIndex = (selectedIndex + 1) % images.length;
        onImageSelect(nextIndex);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedIndex, images.length, onImageSelect]);

  // Scroll to selected thumbnail
  useEffect(() => {
    if (thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedIndex]);

  // Update visible range
  useEffect(() => {
    if (selectedIndex < visibleStart) {
      setVisibleStart(Math.max(0, selectedIndex - 2));
    } else if (selectedIndex >= visibleStart + maxVisible) {
      setVisibleStart(Math.min(images.length - maxVisible, selectedIndex - 2));
    }
  }, [selectedIndex, visibleStart, images.length]);

  const scrollLeft = () => {
    const newStart = Math.max(0, visibleStart - 1);
    setVisibleStart(newStart);
  };

  const scrollRight = () => {
    const newStart = Math.min(images.length - maxVisible, visibleStart + 1);
    setVisibleStart(newStart);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Thumbnail Navigation */}
      <div className="relative">
        {/* Left Arrow */}
        {showNavigation && images.length > maxVisible && visibleStart > 0 && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-300"
            title="Previous thumbnails"
          >
            <FaChevronLeft className="text-gray-700 text-sm" />
          </button>
        )}

        {/* Thumbnail Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              ref={(el) => (thumbnailRefs.current[index] = el)}
              onClick={() => onImageSelect(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 group ${
                selectedIndex === index
                  ? 'border-primary-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:scale-105'
              }`}
            >
              <img
                src={image}
                alt={`${altText} ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              
              {/* Overlay for selected state */}
              {selectedIndex === index && (
                <div className="absolute inset-0 bg-primary-500/20 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        {showNavigation && images.length > maxVisible && visibleStart < images.length - maxVisible && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-300"
            title="Next thumbnails"
          >
            <FaChevronRight className="text-gray-700 text-sm" />
          </button>
        )}
      </div>

      {/* Controls and Indicators */}
      <div className="flex items-center justify-between">
        {/* Image Counter */}
        <div className="text-sm text-gray-600">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Play/Pause Button */}
        {images.length > 1 && (
          <button
            onClick={togglePlayPause}
            className={`p-2 rounded-full transition-colors duration-300 ${
              isPlaying
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs" />}
          </button>
        )}

        {/* Dot Indicators */}
        {showIndicators && images.length > 1 && (
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onImageSelect(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selectedIndex === index
                    ? 'bg-primary-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                title={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isPlaying && images.length > 1 && (
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-primary-500 h-1 rounded-full transition-all duration-100"
            style={{
              width: `${((selectedIndex + 1) / images.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ThumbnailGallery;
