import React from 'react';
import { FaMapMarkerAlt, FaUsers, FaEye } from 'react-icons/fa';

const ListingCard = ({ listing, onViewDetails }) => {
  const handleViewDetails = () => {
    onViewDetails(listing.id);
  };

  const formatPrice = (price) => {
    return `PKR ${price.toLocaleString()}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Image Container - Fixed Height */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={listing.photo}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x300/E5E7EB/9CA3AF?text=No+Image';
          }}
        />
        
        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <span className="text-xs font-semibold text-gray-900">
              Starting from
            </span>
          </div>
        </div>
      </div>

      {/* Content Container - Fixed Height */}
      <div className="p-4 h-32 flex flex-col justify-between">
        {/* Venue Info */}
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1 group-hover:text-primary-600 transition-colors">
            {listing.name}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" size={12} />
              <span className="truncate">{listing.city}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <FaUsers className="text-gray-400 flex-shrink-0" size={12} />
              <span className="whitespace-nowrap">{listing.capacity} guests</span>
            </div>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-primary-600">
            {formatPrice(listing.price)}
          </div>
          
          <button
            onClick={handleViewDetails}
            className="flex items-center gap-2 bg-primary-600 text-white px-3 py-1.5 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm font-medium"
          >
            <FaEye size={12} />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;