import React, { useState } from 'react';
import VendorHeader from '../VendorHeader';
import { FaSearch } from 'react-icons/fa';

const VendorHelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: 'Users FAQ',
      description: 'Everything Tagvenue Users need to know about how to use our marketplace while booking Venues listed on our platform.',
      color: 'border-teal-500'
    },
    {
      title: 'Online payments for Venues Managers',
      description: 'Everything Venue Managers need to know about the Online Payment Method available on the Tagvenue platform.',
      color: 'border-teal-500'
    },
    {
      title: 'How to create and edit a Venue Profile (Venues)',
      description: 'Information for Venue Managers about first steps on the Tagvenue platform.',
      color: 'border-teal-500'
    },
    {
      title: 'How to handle Booking Enquiries on Tagvenue (Venues)',
      description: 'Everything Venue Managers need to know about the booking process on Tagvenue.',
      color: 'border-teal-500'
    },
    {
      title: 'How to manage your account and calendar on Tagvenue (Venues)',
      description: 'Information for Venue Managers on how to effectively use our platform.',
      color: 'border-teal-500'
    },
    {
      title: 'Reviews and Stats (Venues)',
      description: 'View statistics and above reviews live in a nutshell.',
      color: 'border-teal-600 bg-teal-600'
    }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="pt-16">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="grid grid-cols-2 gap-0.5 w-8 h-8">
                  <div className="bg-white rounded-sm"></div>
                  <div className="bg-white/80 rounded-sm"></div>
                  <div className="bg-white/60 rounded-sm"></div>
                  <div className="bg-white rounded-sm"></div>
                </div>
                <span className="text-2xl font-bold text-white ml-3">tagvenue</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full pl-12 pr-4 py-4 rounded-lg text-lg focus:ring-2 focus:ring-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Help Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg border-2 ${category.color} p-6 hover:shadow-lg transition-shadow cursor-pointer ${
                  category.color.includes('bg-teal-600') ? 'text-white' : 'text-gray-900'
                }`}
              >
                <h3 className={`text-lg font-semibold mb-3 ${
                  category.color.includes('bg-teal-600') ? 'text-white' : 'text-gray-900'
                }`}>
                  {category.title}
                </h3>
                <p className={`text-sm ${
                  category.color.includes('bg-teal-600') ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* General Information Section */}
          <div className="mt-8">
            <div className="bg-white rounded-lg border-2 border-teal-500 p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                General Information
              </h3>
              <p className="text-sm text-gray-600">
                General information for every Tagvenue User
              </p>
            </div>
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No help articles found matching your search.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-sm text-gray-500">Tagvenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHelpCenter;
