import React from 'react';
import { FaTrash, FaImage } from 'react-icons/fa';

const PhotoCard = ({ photo, onDelete, index }) => {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div className="relative group bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden hover:border-primary-400 transition-all duration-200">
      {photo ? (
        <>
          {/* Photo Preview */}
          <div className="aspect-square overflow-hidden">
            <img
              src={photo.preview || photo.url}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          
          {/* Delete Button Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
            <button
              onClick={handleDelete}
              className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 transform scale-90 hover:scale-100"
              title="Delete photo"
            >
              <FaTrash size={14} />
            </button>
          </div>
          
          {/* Photo Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
            <div className="text-white text-xs">
              <p className="truncate font-medium">{photo.name}</p>
              <p className="text-gray-300">{(photo.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
        </>
      ) : (
        /* Empty Slot */
        <div className="aspect-square flex flex-col items-center justify-center p-4 text-gray-400">
          <FaImage size={32} className="mb-2" />
          <p className="text-sm text-center">Empty Slot</p>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;