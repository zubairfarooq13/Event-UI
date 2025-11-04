import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const ImageGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const defaultImages = images.length > 0 ? images : [
    'https://placehold.co/800x600/E5E7EB/9CA3AF?text=Venue+Image+1',
    'https://placehold.co/800x600/E5E7EB/9CA3AF?text=Venue+Image+2',
    'https://placehold.co/800x600/E5E7EB/9CA3AF?text=Venue+Image+3',
  ];

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? defaultImages.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === defaultImages.length - 1 ? 0 : prev + 1));
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  return (
    <>
      {/* Main Gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 rounded-lg overflow-hidden">
        {/* Main large image */}
        <div 
          className="col-span-3 row-span-2 relative cursor-pointer group"
          onClick={openFullscreen}
        >
          <img
            src={defaultImages[0]}
            alt="Main venue"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f29da8c9a1?w=1200&h=800&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </div>

        {/* Top right thumbnail */}
        {defaultImages.length > 1 && (
          <div
            className="relative cursor-pointer group row-start-1"
            onClick={() => {
              setCurrentIndex(1);
              openFullscreen();
            }}
          >
            <img
              src={defaultImages[1]}
              alt="Venue 2"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </div>
        )}

        {/* Bottom right thumbnail with overlay */}
        {defaultImages.length > 2 && (
          <div
            className="relative cursor-pointer group bg-gray-900 row-start-2"
            onClick={() => {
              setCurrentIndex(2);
              openFullscreen();
            }}
          >
            <img
              src={defaultImages[2]}
              alt="Venue 3"
              className="w-full h-full object-cover"
              style={{ opacity: defaultImages.length > 3 ? 0.5 : 1 }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop';
              }}
            />
            {defaultImages.length > 3 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                <span className="text-white text-base font-semibold">
                  +{defaultImages.length - 3} photos
                </span>
              </div>
            )}
            {defaultImages.length <= 3 && (
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <FaTimes size={32} />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
          >
            <FaChevronLeft size={48} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
          >
            <FaChevronRight size={48} />
          </button>

          <div className="max-w-6xl max-h-[90vh] w-full px-16">
            <img
              src={defaultImages[currentIndex]}
              alt={`Venue ${currentIndex + 1}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1519167758481-83f29da8c9a1?w=1200&h=800&fit=crop';
              }}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentIndex + 1} / {defaultImages.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
