import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaSearch } from 'react-icons/fa';
import Header from '../common/Header';
import Footer from './Footer';
import { venueService } from '../../services';
import './HomeSearch.css';

const HomeSearch = ({ onSearch, currentView, setCurrentView, user, onLogout, onAdminAccess }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: '',
    eventDate: '',
    guests: '',
    serviceType: '',
  });
  const [isSearching, setIsSearching] = useState(false);

  const cities = [
    'Karachi',
    'Lahore', 
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
  ];

  const serviceTypes = [
    'Wedding',
    'Birthday Party',
    'Corporate Event',
    'Conference',
    'Anniversary',
    'Reception',
    'Engagement',
    'Social Gathering',
  ];

  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearchSubmit = async (e) => {
    e?.preventDefault();
    setIsSearching(true);

    const searchFilters = {
      city: searchParams.city,
      capacity: searchParams.guests,
      eventType: searchParams.serviceType,
    };

    try {
      const result = await venueService.searchVenues(searchFilters);
      
      if (result.success) {
        localStorage.setItem('searchResults', JSON.stringify(result.data));
        localStorage.setItem('searchFilters', JSON.stringify(searchFilters));
        
        const urlParams = new URLSearchParams();
        if (searchFilters.city) urlParams.append('city', searchFilters.city);
        if (searchFilters.capacity) urlParams.append('capacity', searchFilters.capacity);
        if (searchFilters.eventType) urlParams.append('eventType', searchFilters.eventType);
        
        navigate(`/venues?${urlParams.toString()}`);
      } else {
        console.error('Search failed:', result.error);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const destinations = [
    { city: 'Karachi', venues: '450 venues', subtitle: 'Discover venues in the city of lights' },
    { city: 'Lahore', venues: '380 venues', subtitle: 'Cultural capital with historic venues' },
    { city: 'Islamabad', venues: '320 venues', subtitle: 'Modern venues in the capital' },
    { city: 'Rawalpindi', venues: '180 venues', subtitle: 'Traditional and contemporary spaces' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        onLogout={onLogout}
        onAdminAccess={onAdminAccess}
      />
      
      {/* Hero Section */}
      <div className="relative bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-teal-50 text-teal-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Over 1,825 venues · Trusted by 25k+ customers
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Find and book venues<br />
                <span className="text-gray-700">for any event imaginable</span>
              </h1>

              {/* Search Form */}
              <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden max-w-4xl">
                <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row">
                  {/* Event Type */}
                  <div className="flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                      Event Type
                    </label>
                    <div className="flex items-center">
                      <FaSearch className="text-gray-400 mr-3 flex-shrink-0 text-lg" />
                      <select
                        value={searchParams.serviceType}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        className="w-full border-none outline-none text-sm text-gray-600 bg-white cursor-pointer appearance-none"
                        style={{ minWidth: '160px' }}
                      >
                        <option value="">What are you planning?</option>
                        {serviceTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                      Guests
                    </label>
                    <div className="flex items-center">
                      <FaUsers className="text-gray-400 mr-3 flex-shrink-0 text-lg" />
                      <input
                        type="text"
                        placeholder="Number of guests"
                        value={searchParams.guests}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || /^\d+$/.test(value)) {
                            handleInputChange('guests', value);
                          }
                        }}
                        className="w-full border-none outline-none text-sm text-gray-600 bg-white placeholder-gray-400"
                        style={{ minWidth: '140px' }}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex-1 px-6 py-4 border-b md:border-b-0 md:border-r border-gray-200">
                    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                      Location
                    </label>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-3 flex-shrink-0 text-lg" />
                      <select
                        value={searchParams.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full border-none outline-none text-sm text-gray-600 bg-white cursor-pointer appearance-none"
                        style={{ minWidth: '120px' }}
                      >
                        <option value="">Select city</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 px-10 transition-all duration-200 disabled:opacity-50 md:rounded-r-xl"
                  >
                    {isSearching ? 'Searching...' : 'Search'}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Image */}
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&q=80"
                  alt="Event Venue"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Destinations */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10">
            Discover top event spaces across Pakistan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <div
                key={idx}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                  handleInputChange('city', dest.city);
                  handleSearchSubmit();
                }}
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    idx === 0 ? '1519167758481-83f29da73fb2' :
                    idx === 1 ? '1478147427282-58a87a120781' :
                    idx === 2 ? '1519225421980-715cb0215aed' :
                    '1511578314322-379afb476865'
                  }?w=400&h=500&fit=crop&q=80`}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{dest.city}</h3>
                  <p className="text-sm text-gray-200 mb-1">{dest.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Global brands and 25k+ users trust EventHub
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Join thousands of satisfied customers who found their perfect venues with us
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1,825+</div>
              <div className="text-gray-600">Venues</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">25k+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.8★</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomeSearch;