import React from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaUsers, FaImage, FaDollarSign } from 'react-icons/fa';

const ReviewStep = ({ data }) => {
  const isComplete = (value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v);
    }
    return value && value.toString().trim() !== '';
  };

  const completionChecks = [
    { label: 'Venue name', value: data.name, icon: FaCheckCircle },
    { label: 'Venue type', value: data.venue_type, icon: FaCheckCircle },
    { label: 'Location', value: data.location && data.city, icon: FaMapMarkerAlt },
    { label: 'Description', value: data.description, icon: FaCheckCircle },
    { label: 'Capacity', value: data.capacity, icon: FaUsers },
    { label: 'Facilities', value: data.facilities, icon: FaCheckCircle },
    { label: 'Pricing', value: data.pricing, icon: FaDollarSign },
    { label: 'Photos', value: data.photos, icon: FaImage },
    { label: 'Rules', value: data.allowed_events, icon: FaCheckCircle }
  ];

  const completedItems = completionChecks.filter(check => isComplete(check.value)).length;
  const completionPercentage = Math.round((completedItems / completionChecks.length) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Review & Submit</h1>
        <p className="text-gray-600">Review your space details before submitting</p>
      </div>

      {/* Completion Progress */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-900">Listing Completion</h3>
          <span className="text-2xl font-bold text-teal-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600">
          {completedItems} of {completionChecks.length} sections completed
        </p>
      </div>

      {/* Completion Checklist */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Completion Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {completionChecks.map((check, index) => {
            const Icon = check.icon;
            const completed = isComplete(check.value);
            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  completed ? 'bg-green-50' : 'bg-gray-50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {completed && <FaCheckCircle className="text-white" size={14} />}
                </div>
                <span
                  className={`font-medium ${
                    completed ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {check.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overview Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Space Summary</h3>

        {/* Basic Info */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Basic Information</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium text-gray-900">{data.name || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium text-gray-900">
                {(data.venue_type || []).length > 0 
                  ? `${(data.venue_type || []).slice(0, 2).join(', ')}${(data.venue_type || []).length > 2 ? ` +${(data.venue_type || []).length - 2}` : ''}`
                  : 'Not provided'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-gray-900">{data.city || 'Not provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Capacity:</span>
              <span className="font-medium text-gray-900">
                {data.capacity ? `Up to ${data.capacity} guests` : 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        {/* Facilities Count */}
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Features</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">
                {(data.facilities || []).length + (data.catering_drinks || []).length + (data.music_sound || []).length}
              </div>
              <div className="text-gray-600 text-xs mt-1">Facilities</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{(data.pricing || []).length}</div>
              <div className="text-gray-600 text-xs mt-1">Pricing Options</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{(data.photos || []).length}</div>
              <div className="text-gray-600 text-xs mt-1">Photos</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{(data.packages || []).length}</div>
              <div className="text-gray-600 text-xs mt-1">Packages</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{(data.allowed_events || []).length}</div>
              <div className="text-gray-600 text-xs mt-1">Event Types</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">{(data.house_rules || []).length}</div>
              <div className="text-gray-600 text-xs mt-1">House Rules</div>
            </div>
          </div>
        </div>

        {/* Preview Photos */}
        {(data.photos || []).length > 0 && (
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Photo Preview</h4>
            <div className="grid grid-cols-4 gap-2">
              {(data.photos || []).slice(0, 4).map((photo, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={photo.photo_url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            {(data.photos || []).length > 4 && (
              <p className="text-sm text-gray-500 mt-2">
                +{(data.photos || []).length - 4} more photos
              </p>
            )}
          </div>
        )}
      </div>

      {/* Important Notes */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h4 className="font-medium text-yellow-900 mb-3">📌 Before You Submit</h4>
        <ul className="text-sm text-yellow-800 space-y-2">
          <li>• Your listing will be reviewed by our team within 24-48 hours</li>
          <li>• You'll receive an email notification once your space is approved</li>
          <li>• You can edit your listing anytime from your vendor dashboard</li>
          <li>• Make sure all information is accurate and up-to-date</li>
          <li>• High-quality photos significantly increase booking chances</li>
        </ul>
      </div>

      {/* Warning if incomplete */}
      {completionPercentage < 80 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h4 className="font-medium text-orange-900 mb-2">⚠️ Incomplete Listing</h4>
          <p className="text-sm text-orange-800">
            Your listing is only {completionPercentage}% complete. We recommend completing at least 80% 
            for better visibility and higher booking chances. You can still submit now and edit later.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReviewStep;
