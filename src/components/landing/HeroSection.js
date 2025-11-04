import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    eventType: '',
    guests: '',
    location: 'Karachi'
  });

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
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
    'Bahawalpur'
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
                <div className="flex-[2] border-b md:border-b-0 md:border-r border-gray-200 px-6 py-4">
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
                      className="w-full pl-7 pr-2 py-2 text-gray-700 placeholder-gray-400 focus:outline-none text-base"
                    />
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
                <div className="flex-1 border-b md:border-b-0 px-5 py-4">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <select
                      value={searchData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full pl-7 pr-2 py-2 text-gray-700 focus:outline-none appearance-none bg-transparent cursor-pointer text-base"
                    >
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
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
