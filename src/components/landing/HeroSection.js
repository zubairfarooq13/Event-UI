import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const eventTypeRef = useRef(null);
  const locationRef = useRef(null);
  
  const [searchData, setSearchData] = useState({
    eventType: '',
    guests: '',
    location: ''
  });
  const [showEventTypeSuggestions, setShowEventTypeSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [filteredEventTypes, setFilteredEventTypes] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));

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
        const filtered = locations.filter(loc =>
          loc.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredLocations(filtered);
        setShowLocationSuggestions(true);
      } else {
        setFilteredLocations([]);
        setShowLocationSuggestions(false);
      }
    }
  };

  const selectEventType = (type) => {
    setSearchData(prev => ({ ...prev, eventType: type }));
    setShowEventTypeSuggestions(false);
    setFilteredEventTypes([]);
  };

  const selectLocation = (location) => {
    setSearchData(prev => ({ ...prev, location: location }));
    setShowLocationSuggestions(false);
    setFilteredLocations([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching with:', searchData);
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchData.eventType) params.append('eventType', searchData.eventType);
    if (searchData.guests) params.append('capacity', searchData.guests);
    if (searchData.location) params.append('city', searchData.location);
    
    // Navigate to venues page with search parameters
    navigate(`/venues?${params.toString()}`);
  };

  // Handle click outside to close suggestions
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

  return (
    <div className="pt-16 min-h-screen bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12 items-center py-8">
          {/* Left Side - Content & Search Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-teal-50 text-teal-700 rounded font-medium">
                Over 17k venues
              </span>
              <span className="text-gray-400">·</span>
              <span className="px-2.5 py-1 bg-teal-50 text-teal-700 rounded font-medium">
                Trusted by 1M+ customers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
              Find and book venues<br />
              for any event imaginable
            </h1>

            {/* Search Form - Horizontal Layout */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:flex-nowrap md:items-end">
                {/* Event Type */}
                <div ref={eventTypeRef} className="flex-[2] border-b md:border-b-0 md:border-r border-gray-200 px-6 py-4 relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Event Type
                  </label>
                  <div className="relative">
                    <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="What are you planning?"
                      value={searchData.eventType}
                      onChange={(e) => handleInputChange('eventType', e.target.value)}
                      onFocus={() => setShowEventTypeSuggestions(true)}
                      className="w-full pl-7 pr-2 py-2 text-gray-700 placeholder-gray-400 focus:outline-none text-base"
                    />
                    
                    {/* Event Type Suggestions Dropdown */}
                    {showEventTypeSuggestions && filteredEventTypes.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                        {filteredEventTypes.map((type, index) => (
                          <div
                            key={index}
                            onClick={() => selectEventType(type)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            {type}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Guests */}
                <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200 px-5 py-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Guests
                  </label>
                  <div className="relative">
                    <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <input
                      type="number"
                      placeholder="Number of guests"
                      min="1"
                      value={searchData.guests}
                      onChange={(e) => handleInputChange('guests', e.target.value)}
                      className="w-full pl-7 pr-2 py-2 text-gray-700 placeholder-gray-400 focus:outline-none text-base"
                    />
                  </div>
                </div>

                {/* Location */}
                <div ref={locationRef} className="flex-1 border-b md:border-b-0 px-5 py-4 relative">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="City"
                      value={searchData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      onFocus={() => setShowLocationSuggestions(true)}
                      className="w-full pl-7 pr-2 py-2 text-gray-700 placeholder-gray-400 focus:outline-none text-base"
                    />
                    
                    {/* Location Suggestions Dropdown */}
                    {showLocationSuggestions && filteredLocations.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                        {filteredLocations.map((city, index) => (
                          <div
                            key={index}
                            onClick={() => selectLocation(city)}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors"
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Search Button */}
                <div className="p-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-[18px] bg-[#FF6B7A] text-white font-semibold rounded-md hover:bg-[#FF5666] transition-colors duration-200 text-base whitespace-nowrap"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Venue Image */}
          <div className="lg:col-span-3 hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                alt="Elegant restaurant interior with ambient lighting"
                className="w-full h-[700px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
