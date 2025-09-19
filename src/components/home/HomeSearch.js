import React, { useState } from 'react';
import { 
  FaSearch, 
  FaUtensils, 
  FaBirthdayCake, 
  FaTree, 
  FaBuilding,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaUsers,
  FaCalendarAlt,
  FaFilter,
  FaChevronDown
} from 'react-icons/fa';

// Sample data
const categories = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: FaUtensils,
    color: 'from-orange-400 to-red-500',
    count: '1,200+',
  },
  {
    id: 'birthday',
    name: 'Birthday Packages',
    icon: FaBirthdayCake,
    color: 'from-pink-400 to-purple-500',
    count: '350+',
  },
  {
    id: 'farmhouses',
    name: 'Farmhouses',
    icon: FaTree,
    color: 'from-green-400 to-emerald-500',
    count: '180+',
  },
  {
    id: 'marquees',
    name: 'Marquees',
    icon: FaBuilding,
    color: 'from-blue-400 to-indigo-500',
    count: '95+',
  },
];

const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];

const budgetRanges = [
  { label: 'Under ₹5,000', value: '0-5000' },
  { label: '₹5,000 - ₹15,000', value: '5000-15000' },
  { label: '₹15,000 - ₹30,000', value: '15000-30000' },
  { label: '₹30,000 - ₹50,000', value: '30000-50000' },
  { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
  { label: 'Above ₹1,00,000', value: '100000-999999' },
];

const HomeSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    budget: '',
    capacity: '',
    date: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    setIsSearching(true);
    
    const searchFilters = {
      query: searchQuery,
      category: selectedCategory,
      ...filters
    };

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to listings page with search filters
      if (onSearch) {
        onSearch(searchFilters);
      } else {
        // Fallback for direct component usage
        console.log('Search initiated with filters:', searchFilters);
        alert(`Searching with filters: ${JSON.stringify(searchFilters, null, 2)}`);
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Get today's date in YYYY-MM-DD format for date input min value
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    selectedCategory === category.id 
                      ? 'ring-4 ring-primary-500 ring-opacity-50' 
                      : ''
                  }`}
                >
                  <div className={`bg-gradient-to-br ${category.color} p-6 text-white h-32 sm:h-40`}>
                    <div className="flex flex-col justify-between h-full">
                      <IconComponent className="h-8 w-8 sm:h-10 sm:w-10" />
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base mb-1">{category.name}</h3>
                        <p className="text-xs sm:text-sm opacity-90">{category.count}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <FaFilter className="mr-2" />
              Filters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* City Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2" />
                  City
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaRupeeSign className="inline mr-2" />
                  Budget Range
                </label>
                <select
                  value={filters.budget}
                  onChange={(e) => handleFilterChange('budget', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Budget</option>
                  {budgetRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Capacity Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUsers className="inline mr-2" />
                  Capacity (Guests)
                </label>
                <input
                  type="number"
                  placeholder="Number of guests"
                  min="1"
                  max="10000"
                  value={filters.capacity}
                  onChange={(e) => handleFilterChange('capacity', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaCalendarAlt className="inline mr-2" />
                  Event Date
                </label>
                <input
                  type="date"
                  min={today}
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => {
                  setFilters({
                    city: '',
                    budget: '',
                    capacity: '',
                    date: '',
                  });
                  setSelectedCategory('');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Clear All Filters
              </button>
              
              {/* Search Button */}
              <button
                onClick={handleSearchSubmit}
                disabled={isSearching}
                className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="mr-2" />
                    Search Venues
                  </>
                )}
              </button>
            </div>
          </div>



        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-primary-600">1,825+</div>
            <div className="text-sm text-gray-600">Total Venues</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">50+</div>
            <div className="text-sm text-gray-600">Cities</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">25k+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">4.8★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;