import React, { useState, useRef } from 'react';
import { 
  FaPlus, 
  FaUpload, 
  FaSave, 
  FaExclamationTriangle, 
  FaSpinner,
  FaImages,
  FaCheckCircle
} from 'react-icons/fa';
import PhotoCard from './PhotoCard';

const PhotoUpload = ({ existingPhotos = [], onSave }) => {
  const [photos, setPhotos] = useState(existingPhotos);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef(null);
  
  const MAX_PHOTOS = 8;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
  const ACCEPTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  // Handle file selection
  const handleFileSelect = (files) => {
    const fileList = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileList.forEach((file) => {
      // Check file type
      if (!ACCEPTED_FORMATS.includes(file.type)) {
        errors.push(`${file.name}: Invalid format. Please use JPG, PNG, or WebP.`);
        return;
      }

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File too large. Maximum size is 5MB.`);
        return;
      }

      validFiles.push(file);
    });

    // Check total photo limit
    const totalPhotos = photos.length + validFiles.length;
    if (totalPhotos > MAX_PHOTOS) {
      const allowedCount = MAX_PHOTOS - photos.length;
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
      
      if (allowedCount > 0) {
        // Take only the allowed number of files
        validFiles.splice(allowedCount);
      } else {
        return; // No more photos allowed
      }
    }

    // Process valid files
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          preview: e.target.result,
          isNew: true
        };
        
        setPhotos(prev => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });

    // Show errors if any
    if (errors.length > 0) {
      alert(`Upload errors:\n${errors.join('\n')}`);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  // Handle file input change
  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  };

  // Delete photo
  const handleDeletePhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setSaveSuccess(false);
  };

  // Open file picker
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  // Save photos (mock API call)
  const handleSave = async () => {
    setIsLoading(true);
    setSaveSuccess(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API call
      const photosToUpload = photos.filter(photo => photo.isNew);
      console.log('Uploading photos:', photosToUpload);
      
      // Mark all photos as saved
      setPhotos(prev => prev.map(photo => ({ ...photo, isNew: false })));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Call parent callback if provided
      if (onSave) {
        onSave(photos);
      }
      
    } catch (error) {
      console.error('Error saving photos:', error);
      alert('Error saving photos. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Create empty slots for remaining photos
  const emptySlots = MAX_PHOTOS - photos.length;
  const allSlots = [...photos];
  for (let i = 0; i < emptySlots; i++) {
    allSlots.push(null);
  }

  const hasNewPhotos = photos.some(photo => photo.isNew);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FaImages className="text-primary-600" />
            Photo Gallery
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Upload up to {MAX_PHOTOS} photos to showcase your venue
          </p>
        </div>
        
        {hasNewPhotos && (
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" size={16} />
                Saving...
              </>
            ) : (
              <>
                <FaSave size={16} />
                Save Photos
              </>
            )}
          </button>
        )}
      </div>

      {/* Warning Message */}
      {showWarning && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
          <FaExclamationTriangle className="text-orange-500 mt-0.5" size={16} />
          <div>
            <p className="text-orange-800 font-medium">Photo limit reached!</p>
            <p className="text-orange-700 text-sm mt-1">
              You can only upload up to {MAX_PHOTOS} photos. Some files were not added.
            </p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <FaCheckCircle className="text-green-500" size={16} />
          <p className="text-green-800 font-medium">Photos saved successfully!</p>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary-400 bg-primary-50'
            : photos.length >= MAX_PHOTOS
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-300 hover:border-primary-300 hover:bg-primary-25'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {photos.length >= MAX_PHOTOS ? (
          <div className="text-gray-500">
            <FaImages size={32} className="mx-auto mb-3 opacity-50" />
            <p className="font-medium">Maximum photos reached</p>
            <p className="text-sm mt-1">Delete existing photos to add new ones</p>
          </div>
        ) : (
          <div className="text-gray-600">
            <FaUpload size={32} className="mx-auto mb-3" />
            <p className="font-medium mb-2">Drag & drop photos here</p>
            <p className="text-sm text-gray-500 mb-4">
              or click to select files ({MAX_PHOTOS - photos.length} slots remaining)
            </p>
            <button
              type="button"
              onClick={openFilePicker}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaPlus size={14} />
              Select Photos
            </button>
            <p className="text-xs text-gray-400 mt-3">
              Supports: JPG, PNG, WebP • Max 5MB per file
            </p>
          </div>
        )}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allSlots.map((photo, index) => (
          <PhotoCard
            key={photo ? photo.id : `empty-${index}`}
            photo={photo}
            index={index}
            onDelete={handleDeletePhoto}
          />
        ))}
      </div>

      {/* Photo Count */}
      <div className="text-center text-sm text-gray-500">
        {photos.length} of {MAX_PHOTOS} photos uploaded
        {hasNewPhotos && (
          <span className="ml-2 text-orange-600 font-medium">
            • {photos.filter(p => p.isNew).length} unsaved
          </span>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_FORMATS.join(',')}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUpload;