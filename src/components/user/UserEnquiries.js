import React, { useState } from 'react';
import UserHeader from '../common/headers/UserHeader';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const UserEnquiries = () => {
  const [activeTab, setActiveTab] = useState('current');

  // Sample data - replace with API call
  const currentEnquiries = [
    {
      id: 1,
      title: 'Birthday Party for 10 people',
      venue: 'Private Dining Room at The Mandeville Hotel',
      date: 'Saturday, 22 November 2025 at 13:00 - 15:30',
      status: 'Ongoing',
      statusColor: 'orange',
      daysLeft: 4,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
    }
  ];

  const pastEnquiries = [];
  const additionalOffers = [];

  const tabs = [
    { key: 'current', label: 'Current', count: currentEnquiries.length },
    { key: 'past', label: 'Past', count: pastEnquiries.length },
    { key: 'additional', label: 'Additional offers', count: additionalOffers.length }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Manage your enquiries here
          </h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`
                    pb-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.key
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  {tab.label}
                  <span className={`
                    ml-2 py-0.5 px-2 rounded-full text-xs font-medium
                    ${activeTab === tab.key
                      ? 'bg-teal-100 text-teal-600'
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Current Enquiries */}
          {activeTab === 'current' && currentEnquiries.length > 0 && (
            <div className="space-y-6">
              {currentEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto">
                      <img
                        src={enquiry.image}
                        alt={enquiry.venue}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            {enquiry.title}
                          </h2>
                          <p className="text-gray-600 mb-3">{enquiry.venue}</p>
                          
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <FaCalendar className="mr-2 text-gray-400" size={14} />
                              <span>{enquiry.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="ml-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                            {enquiry.status}
                          </span>
                          <div className="text-xs text-gray-500 mt-1 text-right">
                            {enquiry.daysLeft} nov. 2025
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Venues Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  These venues want to host your event
                </h2>

                <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Exciting news! 1 venue manager have crafted exclusive offer for you
                      </h3>
                      <p className="text-gray-600 text-sm">
                        These popular venues are available and matching your event requirements
                      </p>
                    </div>
                    <div className="ml-6">
                      <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop"
                        alt="Venue managers"
                        className="w-32 h-32 rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Venue Offer Card */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto">
                      <img
                        src="https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=400&h=300&fit=crop"
                        alt="Venue"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Whole Space at The Boathouse London - Paddington E...
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Birthday Party for 30 guests
                      </p>

                      <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-1 text-gray-400" size={12} />
                          <span>Paddington Station</span>
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1 text-gray-400" size={12} />
                          <span>Paddington, London</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">Message from Cara Loukes</p>
                              <p className="text-xs text-gray-500">
                                Hi Zuber, I'd love to introduce you to our Paddington East space...
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="text-lg font-semibold text-teal-600 mb-1">
                            Quote: £180 per hour
                          </div>
                          <p className="text-xs text-gray-500 mb-3">
                            Available for your event
                          </p>
                          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                            See full offer details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Browse Last Searches */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Browse your last searches
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative rounded-lg overflow-hidden h-64 group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=400&h=300&fit=crop"
                      alt="Event Space"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-semibold mb-1">Event Space</h3>
                      <p className="text-sm">In United Kingdom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Past Enquiries */}
          {activeTab === 'past' && (
            <div className="text-center py-12">
              <p className="text-gray-500">No past enquiries</p>
            </div>
          )}

          {/* Additional Offers */}
          {activeTab === 'additional' && (
            <div className="text-center py-12">
              <p className="text-gray-500">No additional offers</p>
            </div>
          )}

          {/* Empty State for Current */}
          {activeTab === 'current' && currentEnquiries.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No current enquiries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEnquiries;
