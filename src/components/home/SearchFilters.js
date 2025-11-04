import React from 'react';
import { 
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaFilter
} from 'react-icons/fa';

const cities = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
];

const eventTypes = [
  'Wedding',
  'Birthday Party',
  'Corporate Event',
  'Conference',
  'Anniversary',
  'Reception',
  'Engagement',
  'Baby Shower',
  'Graduation',
  'Social Gathering',
  'Product Launch',
  'Awards Ceremony',
];

const SearchFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  selectedCategory,
  onClearCategory,
  onSearch
}) => {
  const handleClearAll = () => {
    onClearFilters();
    if (onClearCategory) onClearCategory();
  };

  return (
    <div className="py-16 bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Use these filters to find venues that match your specific requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FaMapMarkerAlt className="inline mr-2 text-primary-600" />
                City
              </label>
              <select
                value={filters.city}
                onChange={(e) => onFilterChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white"
              >
                <option value="">Select City</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Event Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FaHeart className="inline mr-2 text-primary-600" />
                Event Type
              </label>
              <select
                value={filters.eventType}
                onChange={(e) => onFilterChange('eventType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white"
              >
                <option value="">Select Event Type</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Capacity Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <FaUsers className="inline mr-2 text-primary-600" />
                Capacity (Guests)
              </label>
              <input
                type="number"
                placeholder="Number of guests"
                min="1"
                max="10000"
                value={filters.capacity}
                onChange={(e) => onFilterChange('capacity', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory || filters.city || filters.eventType || filters.capacity) && (
            <div className="mt-8 p-4 bg-primary-50 rounded-xl border border-primary-200">
              <h4 className="text-sm font-semibold text-primary-800 mb-3">Active Filters:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Category: {selectedCategory}
                  </span>
                )}
                {filters.city && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    City: {filters.city}
                  </span>
                )}
                {filters.eventType && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Event: {filters.eventType}
                  </span>
                )}
                {filters.capacity && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    Capacity: {filters.capacity} guests
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleClearAll}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => {
                // Call the onSearch prop passed from parent
                if (typeof onSearch === 'function') {
                  const searchData = {
                    category: selectedCategory,
                    ...filters
                  };
                  onSearch(searchData);
                }
              }}
              disabled={!filters.city && !filters.eventType && !filters.capacity && !selectedCategory}
              className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FaFilter className="w-4 h-4" />
              Search Venues
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;