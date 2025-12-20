import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from '../common/headers/UserHeader';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { enquiryService } from '../../services';

const UserEnquiries = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Load enquiries from API
  useEffect(() => {
    const loadEnquiries = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          per_page: 20
        };

        // Add status filter based on active tab
        if (activeTab === 'current') {
          params.status = 'pending,ongoing,responded';
        } else if (activeTab === 'past') {
          params.status = 'completed,cancelled,declined';
        }

        const response = await enquiryService.getCustomerEnquiries(params);
        setEnquiries(response.data?.enquiries || []);
        setPagination(response.data?.pagination || null);
      } catch (error) {
        console.error('Error loading enquiries:', error);
        alert('Failed to load enquiries. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
  }, [activeTab, currentPage]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      ongoing: 'bg-blue-100 text-blue-800',
      responded: 'bg-green-100 text-green-800',
      confirmed: 'bg-teal-100 text-teal-800',
      declined: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const currentEnquiries = activeTab === 'current' ? enquiries : [];
  const pastEnquiries = activeTab === 'past' ? enquiries : [];
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
          {activeTab === 'current' && (
            <>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                </div>
              ) : currentEnquiries.length > 0 ? (
                <div className="space-y-6">
                  {currentEnquiries.map((enquiry) => (
                    <div 
                      key={enquiry.id} 
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/user/enquiries/${enquiry.id}`)}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image - Use default if not available */}
                        <div className="md:w-64 h-48 md:h-auto">
                          <img
                            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
                            alt={enquiry.space?.venue_name || 'Venue'}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {enquiry.subject}
                              </h2>
                              <p className="text-gray-600 mb-3">
                                {enquiry.space?.venue_name || 'Venue'} • {enquiry.vendor?.company_name || enquiry.vendor?.name}
                              </p>
                              
                              <div className="flex items-center text-sm text-gray-500 space-x-4 mb-2">
                                <div className="flex items-center">
                                  <FaCalendar className="mr-2 text-gray-400" size={14} />
                                  <span>{formatDate(enquiry.event_date)}</span>
                                </div>
                              </div>

                              {enquiry.guest_count && (
                                <p className="text-sm text-gray-500">
                                  {enquiry.guest_count} guests
                                </p>
                              )}

                              {/* Message preview */}
                              {enquiry.last_message && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {enquiry.last_message.message_text}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(enquiry.last_message.created_at).toLocaleString('en-GB', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Status Badge and Stats */}
                            <div className="ml-4 text-right">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(enquiry.status)}`}>
                                {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                              </span>
                              <div className="text-xs text-gray-500 mt-2">
                                {enquiry.message_count || 0} messages
                              </div>
                              {enquiry.unread_messages > 0 && (
                                <div className="mt-1">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                                    {enquiry.unread_messages} new
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {pagination && pagination.pages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {pagination.pages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                        disabled={currentPage === pagination.pages}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No current enquiries</p>
                </div>
              )}
            </>
          )}

          {/* Past Enquiries */}
          {activeTab === 'past' && (
            <>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
                </div>
              ) : pastEnquiries.length > 0 ? (
                <div className="space-y-6">
                  {pastEnquiries.map((enquiry) => (
                    <div 
                      key={enquiry.id} 
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/user/enquiries/${enquiry.id}`)}
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto">
                          <img
                            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
                            alt={enquiry.space?.venue_name || 'Venue'}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                {enquiry.subject}
                              </h2>
                              <p className="text-gray-600 mb-3">
                                {enquiry.space?.venue_name || 'Venue'} • {enquiry.vendor?.company_name || enquiry.vendor?.name}
                              </p>
                              <div className="flex items-center text-sm text-gray-500">
                                <FaCalendar className="mr-2 text-gray-400" size={14} />
                                <span>{formatDate(enquiry.event_date)}</span>
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(enquiry.status)}`}>
                              {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination */}
                  {pagination && pagination.pages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-8">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {pagination.pages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                        disabled={currentPage === pagination.pages}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No past enquiries</p>
                </div>
              )}
            </>
          )}

          {/* Additional Offers */}
          {activeTab === 'additional' && (
            <div className="text-center py-12">
              <p className="text-gray-500">No additional offers</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEnquiries;
