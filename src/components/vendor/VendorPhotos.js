import React from 'react';
import { FaImage, FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const VendorPhotos = () => {
  // Dummy photos data
  const photos = [
    { id: 1, url: 'https://placehold.co/300x200/3B82F6/FFFFFF?text=Photo+1', title: 'Main Hall' },
    { id: 2, url: 'https://placehold.co/300x200/10B981/FFFFFF?text=Photo+2', title: 'Garden Area' },
    { id: 3, url: 'https://placehold.co/300x200/8B5CF6/FFFFFF?text=Photo+3', title: 'Dining Setup' },
    { id: 4, url: 'https://placehold.co/300x200/F59E0B/FFFFFF?text=Photo+4', title: 'Stage Area' },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
          <p className="text-gray-600 mt-1">Manage your venue photos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <FaPlus size={16} />
          Add Photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
            <div className="relative">
              <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover" />
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
              <h3 className="font-medium text-gray-900">{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorPhotos;