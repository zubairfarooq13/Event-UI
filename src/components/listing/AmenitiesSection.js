import React, { useState } from 'react';
import { FaCheck, FaTimes, FaChevronDown, FaChevronUp, FaWifi, FaUtensils, FaMusic, FaWheelchair, FaLightbulb, FaSnowflake, FaSun, FaProjectDiagram, FaMicrophone, FaParking, FaGlassCheers, FaChair } from 'react-icons/fa';
import { MdKitchen, MdEventSeat, MdOutlineWbSunny } from 'react-icons/md';
import { BiDrink } from 'react-icons/bi';

const getAmenityIcon = (amenityName) => {
  const name = amenityName.toLowerCase();
  
  if (name.includes('wi-fi') || name.includes('wifi')) return <FaWifi className="text-gray-500" size={16} />;
  if (name.includes('kitchen')) return <MdKitchen className="text-gray-500" size={18} />;
  if (name.includes('air conditioning') || name.includes('cooling')) return <FaSnowflake className="text-gray-500" size={16} />;
  if (name.includes('heating')) return <FaSun className="text-gray-500" size={16} />;
  if (name.includes('natural light') || name.includes('daylight')) return <MdOutlineWbSunny className="text-gray-500" size={18} />;
  if (name.includes('disabled') || name.includes('wheelchair') || name.includes('accessible')) return <FaWheelchair className="text-gray-500" size={16} />;
  if (name.includes('table') || name.includes('chair') || name.includes('seating')) return <FaChair className="text-gray-500" size={16} />;
  if (name.includes('projector')) return <FaProjectDiagram className="text-gray-500" size={16} />;
  if (name.includes('sound') || name.includes('pa system')) return <FaMusic className="text-gray-500" size={16} />;
  if (name.includes('microphone')) return <FaMicrophone className="text-gray-500" size={16} />;
  if (name.includes('parking')) return <FaParking className="text-gray-500" size={16} />;
  if (name.includes('bar') || name.includes('licensed')) return <FaGlassCheers className="text-gray-500" size={16} />;
  if (name.includes('catering') || name.includes('caterer')) return <FaUtensils className="text-gray-500" size={16} />;
  if (name.includes('byo') || name.includes('alcohol') || name.includes('drink')) return <BiDrink className="text-gray-500" size={18} />;
  if (name.includes('dj') || name.includes('music')) return <FaMusic className="text-gray-500" size={16} />;
  if (name.includes('lighting') || name.includes('light')) return <FaLightbulb className="text-gray-500" size={16} />;
  
  return null;
};

const AmenitiesSection = ({ title, amenities = [], showAllByDefault = false }) => {
  const [showAll, setShowAll] = useState(showAllByDefault);

  const displayedAmenities = showAll ? amenities : amenities.slice(0, 6);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-5">{title}</h2>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
        {displayedAmenities.map((amenity, index) => {
          const icon = getAmenityIcon(amenity.name);
          return (
            <div key={index} className="flex items-start gap-3">
              {icon ? (
                <div className="mt-0.5 flex-shrink-0">
                  {icon}
                </div>
              ) : (
                <div className={`mt-0.5 flex-shrink-0 ${amenity.available !== false ? 'text-teal-500' : 'text-gray-400'}`}>
                  {amenity.available !== false ? <FaCheck size={14} /> : <FaTimes size={14} />}
                </div>
              )}
              <div className="flex-1">
                <div className={`text-[15px] ${amenity.available === false ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                  {amenity.name}
                </div>
                {amenity.description && (
                  <div className="text-sm text-gray-500 mt-0.5">{amenity.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {amenities.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-5 flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm"
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
