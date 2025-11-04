import React, { useState } from 'react';
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const AmenitiesSection = ({ title, amenities = [], showAllByDefault = false }) => {
  const [showAll, setShowAll] = useState(showAllByDefault);

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 6);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      
      <div className="space-y-4">
        {displayedAmenities.map((amenity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-1 flex-shrink-0 ${amenity.available !== false ? 'text-teal-500' : 'text-gray-400'}`}>
              {amenity.available !== false ? <FaCheck size={16} /> : <FaTimes size={16} />}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${amenity.available === false ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                {amenity.available === false && 'Unavailable: '}
                {amenity.name}
              </div>
              {amenity.description && (
                <div className="text-sm text-gray-600 mt-1">{amenity.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {amenities.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
        >
          {showAll ? (
            <>
              <FaChevronUp size={12} />
              <span>Show less</span>
            </>
          ) : (
            <>
              <FaChevronDown size={12} />
              <span>Show all {amenities.length} facilities</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default AmenitiesSection;
