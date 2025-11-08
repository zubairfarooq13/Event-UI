import React, { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaUsers, FaCalendar, FaMapMarkerAlt, FaSearch, FaDollarSign } from 'react-icons/fa';

const VenueFilters = ({ onFilterChange, initialFilters = {} }) => {
  const eventTypeRef = useRef(null);
  const locationRef = useRef(null);
  
  const [filters, setFilters] = useState({
    eventType: initialFilters.eventType || '',
    location: initialFilters.location || '',
    guests: initialFilters.guests || '',
    date: initialFilters.date || '',
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [tempPriceRange, setTempPriceRange] = useState({
    min: initialFilters.minPrice || '',
    max: initialFilters.maxPrice || '',
  });

  const [showEventTypeSuggestions, setShowEventTypeSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredEventTypes, setFilteredEventTypes] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  // Update filters when initialFilters changes (from URL params)
  useEffect(() => {
    setFilters({
      eventType: initialFilters.eventType || '',
      location: initialFilters.location || '',
      guests: initialFilters.guests || '',
      date: initialFilters.date || '',
      minPrice: initialFilters.minPrice || '',
      maxPrice: initialFilters.maxPrice || '',
    });
    setTempPriceRange({
      min: initialFilters.minPrice || '',
      max: initialFilters.maxPrice || '',
    });
  }, [initialFilters]);

  // Handle click outside to close autocomplete suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (eventTypeRef.current && !eventTypeRef.current.contains(event.target)) {
        setShowEventTypeSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const eventTypes = [
    'Wedding',
    'Wedding Reception',
    'Engagement Ceremony',
    'Mehndi Event',
    'Baraat Ceremony',
    'Walima',
    'Birthday Party',
    'Anniversary Celebration',
    'Corporate Event',
    'Corporate Meeting',
    'Conference',
    'Seminar',
    'Workshop',
    'Business Launch',
    'Product Launch',
    'Team Building Event',
    'Networking Event',
    'Trade Show',
    'Exhibition',
    'Awards Ceremony',
    'Gala Dinner',
    'Charity Event',
    'Fundraiser',
    'Graduation Party',
    'Baby Shower',
    'Bridal Shower',
    'Cocktail Party',
    'Dinner Party',
    'Lunch Event',
    'Breakfast Meeting',
    'Social Gathering',
    'Family Reunion',
    'Festival Celebration',
    'Religious Event',
    'Cultural Event',
    'Music Concert',
    'Art Exhibition',
    'Fashion Show',
    'Sports Event',
    'Outdoor Event',
    'Beach Party',
    'Garden Party',
    'Picnic',
    'BBQ Event',
    'Retirement Party',
    'Farewell Party',
    'Welcome Party',
    'Holiday Party',
    'New Year Party',
    'Christmas Party'
  ];

  const locations = [
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
    'Hyderabad',
    'Bahawalpur',
    'Sargodha',
    'Sukkur',
    'Larkana',
    'Sheikhupura',
    'Jhang',
    'Rahim Yar Khan',
    'Gujrat',
    'Mardan',
    'Kasur',
    'Mingora',
    'Dera Ghazi Khan',
    'Sahiwal',
    'Nawabshah',
    'Okara',
    'Mirpur Khas',
    'Chiniot',
    'Kamoke',
    'Sadiqabad',
    'Burewala',
    'Jacobabad',
    'Muzaffargarh',
    'Khanpur',
    'Gojra',
    'Mandi Bahauddin',
    'Abbottabad',
    'Turbat',
    'Dadu',
    'Bahawalnagar',
    'Khanewal',
    'Shikarpur',
    'Hafizabad',
    'Kohat',
    'Jhelum',
    'Muridke',
    'Karak',
    'Khushab',
    'Dera Ismail Khan',
    'Chaman'
  ];

  const guestRanges = [
    { label: '1-50', value: '1-50' },
    { label: '51-100', value: '51-100' },
    { label: '101-200', value: '101-200' },
    { label: '201-500', value: '201-500' },
    { label: '500+', value: '500+' },
  ];

  const handleInputChange = (field, value) => {
    // Only update local state, don't trigger backend call
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    // Filter event types based on input
    if (field === 'eventType') {
      if (value.trim()) {
        const filtered = eventTypes.filter(type =>
          type.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredEventTypes(filtered);
        setShowEventTypeSuggestions(true);
      } else {
        setFilteredEventTypes([]);
        setShowEventTypeSuggestions(false);
      }
    }

    // Filter locations based on input
    if (field === 'location') {
      if (value.trim()) {
        const filtered = locations.filter(city =>
          city.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLocations(filtered);
        setShowLocationSuggestions(true);
      } else {
        setFilteredLocations([]);
        setShowLocationSuggestions(false);
      }
    }
  };

  const handleFilterChange = (field, value) => {
    // For non-autocomplete fields, trigger backend call immediately
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const selectEventType = (type) => {
    const newFilters = { ...filters, eventType: type };
    setFilters(newFilters);
    setShowEventTypeSuggestions(false);
    setFilteredEventTypes([]);
    // Trigger backend call only on selection
    onFilterChange(newFilters);
  };

  const selectLocation = (location) => {
    const newFilters = { ...filters, location: location };
    setFilters(newFilters);
    setShowLocationSuggestions(false);
    setFilteredLocations([]);
    // Trigger backend call only on selection
    onFilterChange(newFilters);
  };

  const handlePriceApply = () => {
    const newFilters = { 
      ...filters, 
      minPrice: tempPriceRange.min,
      maxPrice: tempPriceRange.max
    };
    setFilters(newFilters);
    setOpenDropdown(null);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      eventType: '',
      location: '',
      guests: '',
      date: '',
      minPrice: '',
      maxPrice: '',
    };
    setFilters(clearedFilters);
    setTempPriceRange({ min: '', max: '' });
    onFilterChange(clearedFilters);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const getFilterLabel = (field) => {
    if (!filters[field]) return null;
    
    switch (field) {
      case 'guests':
        const guestRange = guestRanges.find(r => r.value === filters[field]);
        return guestRange ? `${guestRange.label} people` : filters[field];
      default:
        return filters[field];
    }
  };

  const getPriceLabel = () => {
    if (filters.minPrice || filters.maxPrice) {
      if (filters.minPrice && filters.maxPrice) {
        return `${filters.minPrice} - ${filters.maxPrice}`;
      } else if (filters.minPrice) {
        return `From ${filters.minPrice}`;
      } else {
        return `Up to ${filters.maxPrice}`;
      }
    }
    return 'Price';
  };

  const activeFilterCount = Object.values(filters).filter(v => v).length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Event Type Filter - Input Field */}
          <div ref={eventTypeRef} className="relative">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white hover:border-gray-400 transition-all">
              <FaSearch className="w-3.5 h-3.5 text-gray-700" />
              <input
                type="text"
                value={filters.eventType}
                onChange={(e) => handleInputChange('eventType', e.target.value)}
                onFocus={() => {
                  if (filters.eventType.trim()) {
                    const filtered = eventTypes.filter(type =>
                      type.toLowerCase().includes(filters.eventType.toLowerCase())
                    );
                    setFilteredEventTypes(filtered);
                  }
                  setShowEventTypeSuggestions(true);
                }}
                placeholder="Event Type"
                className="text-sm font-medium text-gray-700 focus:outline-none bg-transparent w-32"
              />
            </div>
            
            {/* Event Type Suggestions Dropdown */}
            {showEventTypeSuggestions && filteredEventTypes.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 min-w-[200px]">
                {filteredEventTypes.map((type, index) => (
                  <div
                    key={index}
                    onClick={() => selectEventType(type)}
                    className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter - Input Field */}
          <div ref={locationRef} className="relative">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white hover:border-gray-400 transition-all">
              <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-700" />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                onFocus={() => {
                  if (filters.location.trim()) {
                    const filtered = locations.filter(city =>
                      city.toLowerCase().includes(filters.location.toLowerCase())
                    );
                    setFilteredLocations(filtered);
                  }
                  setShowLocationSuggestions(true);
                }}
                placeholder="Location"
                className="text-sm font-medium text-gray-700 focus:outline-none bg-transparent w-32"
              />
            </div>
            
            {/* Location Suggestions Dropdown */}
            {showLocationSuggestions && filteredLocations.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 min-w-[200px]">
                {filteredLocations.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => selectLocation(city)}
                    className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guests Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('guests')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                filters.guests
                  ? 'bg-teal-50 border-teal-500 text-teal-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <FaUsers className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">
                {getFilterLabel('guests') || 'People'}
              </span>
              <FaChevronDown className="w-3 h-3" />
            </button>
            {openDropdown === 'guests' && (
              <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-50">
                {guestRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => handleFilterChange('guests', range.value)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                  >
                    {range.label} people
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Filter */}
          <div className="relative">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white">
              <FaCalendar className="w-3.5 h-3.5 text-gray-700" />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="text-sm font-medium text-gray-700 focus:outline-none bg-transparent cursor-pointer"
                placeholder="Date"
              />
            </div>
          </div>

          {/* Price Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('price')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                filters.minPrice || filters.maxPrice
                  ? 'bg-teal-50 border-teal-500 text-teal-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <FaDollarSign className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">
                {getPriceLabel()}
              </span>
              <FaChevronDown className="w-3 h-3" />
            </button>
            {openDropdown === 'price' && (
              <div className="absolute top-full mt-2 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-96 p-6 z-50">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Min Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min price</label>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                      <div className="px-3 py-2 bg-gray-50 border-r border-gray-300">
                        <span className="text-gray-600 text-sm">Rs</span>
                      </div>
                      <input
                        type="number"
                        placeholder="0"
                        value={tempPriceRange.min}
                        onChange={(e) => setTempPriceRange({ ...tempPriceRange, min: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  {/* Max Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max price</label>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500">
                      <div className="px-3 py-2 bg-gray-50 border-r border-gray-300">
                        <span className="text-gray-600 text-sm">Rs</span>
                      </div>
                      <input
                        type="number"
                        placeholder="10000+"
                        value={tempPriceRange.max}
                        onChange={(e) => setTempPriceRange({ ...tempPriceRange, max: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Dual Range Slider */}
                <div className="mb-6 px-2">
                  <div className="relative h-2">
                    {/* Track */}
                    <div className="absolute w-full h-2 bg-gray-200 rounded-full"></div>
                    
                    {/* Active Range */}
                    <div 
                      className="absolute h-2 bg-teal-500 rounded-full"
                      style={{
                        left: `${((tempPriceRange.min || 0) / 1000000) * 100}%`,
                        right: `${100 - ((tempPriceRange.max || 1000000) / 1000000) * 100}%`
                      }}
                    ></div>
                    
                    {/* Min Handle */}
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={tempPriceRange.min || 0}
                      onChange={(e) => {
                        const newMin = Math.min(Number(e.target.value), (tempPriceRange.max || 1000000) - 10000);
                        setTempPriceRange({ ...tempPriceRange, min: newMin.toString() });
                      }}
                      className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-teal-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    />
                    
                    {/* Max Handle */}
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="10000"
                      value={tempPriceRange.max || 1000000}
                      onChange={(e) => {
                        const newMax = Math.max(Number(e.target.value), (tempPriceRange.min || 0) + 10000);
                        setTempPriceRange({ ...tempPriceRange, max: newMax.toString() });
                      }}
                      className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-teal-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePriceApply}
                  className="w-full bg-teal-500 text-white py-2.5 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {activeFilterCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="ml-auto text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VenueFilters;
