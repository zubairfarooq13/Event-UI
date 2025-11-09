import React, { useState } from 'react';
import { FaPlus, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';

const PhotosStep = ({ data, onChange }) => {
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        // Simulate upload progress
        const fileId = Date.now() + Math.random();
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        
        // Create preview URL
        const reader = new FileReader();
        reader.onload = (event) => {
          const newPhoto = {
            id: fileId,
            photo_url: event.target.result,
            is_primary: (data.photos || []).length === 0,
            display_order: (data.photos || []).length
          };
          
          onChange({ photos: [...(data.photos || []), newPhoto] });
          
          // Simulate upload completion
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          }, 1000);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = (data.photos || []).filter(p => p.id !== photoId);
    // Reorder remaining photos
    const reorderedPhotos = updatedPhotos.map((photo, index) => ({
      ...photo,
      display_order: index,
      is_primary: index === 0
    }));
    onChange({ photos: reorderedPhotos });
  };

  const setPrimaryPhoto = (photoId) => {
    const updatedPhotos = (data.photos || []).map(photo => ({
      ...photo,
      is_primary: photo.id === photoId
    }));
    onChange({ photos: updatedPhotos });
  };

  const movePhoto = (photoId, direction) => {
    const photos = [...(data.photos || [])];
    const index = photos.findIndex(p => p.id === photoId);
    
    if (direction === 'left' && index > 0) {
      [photos[index], photos[index - 1]] = [photos[index - 1], photos[index]];
    } else if (direction === 'right' && index < photos.length - 1) {
      [photos[index], photos[index + 1]] = [photos[index + 1], photos[index]];
    }
    
    // Update display order
    const reorderedPhotos = photos.map((photo, idx) => ({
      ...photo,
      display_order: idx
    }));
    
    onChange({ photos: reorderedPhotos });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Photos</h1>
        <p className="text-gray-600">Upload high-quality photos of your space</p>
      </div>

      {/* Upload Area */}
      <div>
        <label className="block">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer">
            <FaCloudUploadAlt className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, JPEG up to 10MB each
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Minimum 5 photos recommended
            </p>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      </div>

      {/* Photo Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">📸 Photo Guidelines</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use high-resolution images (at least 1920x1080 pixels)</li>
          <li>• Show different angles and areas of your space</li>
          <li>• Include photos of facilities, amenities, and key features</li>
          <li>• Ensure good lighting - natural light photos work best</li>
          <li>• Avoid watermarks or text overlays</li>
          <li>• First photo will be the cover photo</li>
        </ul>
      </div>

      {/* Uploaded Photos */}
      {(data.photos || []).length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Uploaded Photos ({(data.photos || []).length})
            </h3>
            <label className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors cursor-pointer inline-flex items-center gap-2">
              <FaPlus size={14} />
              <span>Add More</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data.photos || []).map((photo, index) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={photo.photo_url}
                    alt={`Space photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Photo Controls Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg">
                  <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => removePhoto(photo.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete photo"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                      <button
                        onClick={() => movePhoto(photo.id, 'left')}
                        disabled={index === 0}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          index === 0
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        ←
                      </button>
                      <button
                        onClick={() => movePhoto(photo.id, 'right')}
                        disabled={index === (data.photos || []).length - 1}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          index === (data.photos || []).length - 1
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        →
                      </button>
                    </div>

                    {!photo.is_primary && (
                      <button
                        onClick={() => setPrimaryPhoto(photo.id)}
                        className="px-3 py-1 bg-teal-600 text-white rounded text-sm font-medium hover:bg-teal-700"
                      >
                        Set as Cover
                      </button>
                    )}
                  </div>
                </div>

                {/* Primary Badge */}
                {photo.is_primary && (
                  <div className="absolute top-2 left-2 px-3 py-1 bg-teal-600 text-white rounded-lg text-sm font-medium">
                    Cover Photo
                  </div>
                )}

                {/* Upload Progress */}
                {uploadProgress[photo.id] !== undefined && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-sm">
                      Uploading... {uploadProgress[photo.id]}%
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {(data.photos || []).length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No photos uploaded yet. Add photos to showcase your space.</p>
        </div>
      )}
    </div>
  );
};

export default PhotosStep;
