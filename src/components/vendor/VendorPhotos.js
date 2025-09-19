import React, { useState } from 'react';
import { FaImage, FaPlus, FaTrash, FaEdit, FaUpload } from 'react-icons/fa';
import PhotoUpload from './photos/PhotoUpload';

const VendorPhotos = () => {
  const [showUploader, setShowUploader] = useState(false);
  
  // Dummy existing photos data
  const [existingPhotos, setExistingPhotos] = useState([
    { 
      id: 1, 
      url: 'https://placehold.co/400x300/3B82F6/FFFFFF?text=Main+Hall',
      name: 'main-hall.jpg',
      size: 2048576,
      title: 'Main Hall',
      isNew: false
    },
    { 
      id: 2, 
      url: 'https://placehold.co/400x300/10B981/FFFFFF?text=Garden+Area',
      name: 'garden-area.jpg', 
      size: 1536000,
      title: 'Garden Area',
      isNew: false 
    },
    { 
      id: 3, 
      url: 'https://placehold.co/400x300/8B5CF6/FFFFFF?text=Dining+Setup',
      name: 'dining-setup.jpg',
      size: 1789440,
      title: 'Dining Setup',
      isNew: false
    },
    { 
      id: 4, 
      url: 'https://placehold.co/400x300/F59E0B/FFFFFF?text=Stage+Area',
      name: 'stage-area.jpg',
      size: 2304000,
      title: 'Stage Area',
      isNew: false
    },
  ]);

  // Handle save from uploader
  const handlePhotoSave = (updatedPhotos) => {
    setExistingPhotos(updatedPhotos);
    console.log('Photos updated:', updatedPhotos);
  };

  if (showUploader) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Upload Photos</h1>
            <p className="text-gray-600 mt-1">Add new photos to your venue gallery</p>
          </div>
          <button 
            onClick={() => setShowUploader(false)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Gallery
          </button>
        </div>

        <PhotoUpload 
          existingPhotos={existingPhotos}
          onSave={handlePhotoSave}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-600 mt-1">Manage your venue photos ({existingPhotos.length}/8)</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowUploader(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FaUpload size={16} />
            Upload Photos
          </button>
        </div>
      </div>

      {existingPhotos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <FaImage size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No photos yet</h3>
          <p className="text-gray-600 mb-4">Upload photos to showcase your venue to potential customers</p>
          <button 
            onClick={() => setShowUploader(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mx-auto"
          >
            <FaUpload size={16} />
            Upload Your First Photos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {existingPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
              <div className="relative">
                <img src={photo.url || photo.preview} alt={photo.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <FaEdit size={14} className="text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <FaTrash size={14} className="text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900">{photo.title || photo.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{(photo.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorPhotos;