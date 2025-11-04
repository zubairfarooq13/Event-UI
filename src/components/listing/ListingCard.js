import React from 'react';
import { FaMapMarkerAlt, FaHeart, FaStar, FaClock } from 'react-icons/fa';
import { MdPeople, MdEventSeat } from 'react-icons/md';

const ListingCard = ({ listing, onViewDetails }) => {
  const handleViewDetails = () => {
    onViewDetails(listing.id);
  };

  const formatPrice = (price) => {
    return `£${price.toLocaleString()}`;
  };

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100"
      onClick={handleViewDetails}
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={listing.photo}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x300/E5E7EB/9CA3AF?text=No+Image';
          }}
        />
        
        {/* Wishlist Heart Icon */}
        <button 
          className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm z-10"
          onClick={(e) => {
            e.stopPropagation();
            // Handle wishlist toggle
          }}
        >
          <FaHeart className="text-gray-600 hover:text-red-500 transition-colors" size={16} />
        </button>
        
        {/* Price Badge - Bottom Left */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white">
            <div className="text-sm font-normal">from</div>
            <div className="text-2xl font-bold">
              {formatPrice(listing.price)}
            </div>
            <div className="text-xs opacity-90">{listing.priceType || 'minimum spend / per session'}</div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* First Line: Private space badge on left, Capacity on right */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <span className="px-2 py-0.5 bg-gray-100 rounded-sm text-gray-700 font-medium">
              {listing.spaceType || 'Private space'}
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <MdPeople className="text-gray-600" size={16} />
            <span className="text-sm font-semibold text-gray-900">{listing.capacity || 30}</span>
          </div>
        </div>

        {/* Second Line: Venue Name on left, Rating on right */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-base text-gray-900 group-hover:text-teal-600 transition-colors flex-1">
            {listing.name}
          </h3>
          
          <div className="flex items-center gap-1 ml-2">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < Math.floor(listing.rating || 5) ? 'text-teal-500' : 'text-gray-300'} 
                size={13} 
              />
            ))}
          </div>
        </div>

        {/* Supervenue Badge */}
        {listing.isSupervenue && (
          <div className="flex items-center gap-1 text-teal-500 text-sm font-bold mb-3">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            <span>#Supervenue</span>
          </div>
        )}

        {/* Location */}
        <div className="flex items-start gap-1.5 text-sm text-gray-600 mb-2">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <div>
            <div className="font-medium text-gray-900">{listing.area || listing.city}</div>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <FaClock className="text-gray-400" size={12} />
          <span>Responds within {listing.responseTime || '2h'}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;