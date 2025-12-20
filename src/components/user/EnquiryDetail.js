import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserHeader from '../common/headers/UserHeader';
import EnquiryChat from '../common/chat/EnquiryChat';
import { FaArrowLeft, FaCalendar, FaClock, FaUsers, FaStar, FaPhone, FaCheckCircle } from 'react-icons/fa';
import { enquiryService } from '../../services';

const EnquiryDetail = () => {
  const { enquiryId } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load enquiry data from API
    const loadEnquiry = async () => {
      try {
        // Fetch enquiry details using service
        const response = await enquiryService.getEnquiryById(enquiryId);

        // Extract enquiry data from response structure
        const enquiryData = response.data?.enquiry || response.enquiry || response.data || response;
        
        // Format date for display
        const formattedDate = new Date(enquiryData.event_date).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        setEnquiry({
          id: enquiryData.id,
          title: `${enquiryData.event_type} at ${enquiryData.venue_name}`,
          venue: {
            name: enquiryData.venue_name,
            location: enquiryData.venue_location || '',
            image: enquiryData.venue_image || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
            rating: enquiryData.venue_rating || 4.7,
            reviews: enquiryData.venue_reviews || 43,
            contact: {
              name: enquiryData.vendor_name || 'Sales Team Events',
              phone: enquiryData.vendor_phone || '+44 0207 935 5599'
            }
          },
          event: {
            type: enquiryData.event_type,
            guests: enquiryData.guests || 10,
            date: formattedDate,
            time: enquiryData.event_time,
            layout: enquiryData.layout || 'Any layout',
            catering: enquiryData.catering || 'Not required',
            status: enquiryData.status
          },
          offer: {
            available: enquiryData.enquiry_type === 'request_to_book' && enquiryData.status === 'pending',
            message: enquiryData.enquiry_type === 'request_to_book' ? 'Book now to secure this date' : 'Contact venue for details',
            canBook: enquiryData.enquiry_type === 'request_to_book' && enquiryData.status === 'pending',
            canDecline: enquiryData.enquiry_type === 'request_to_book' && enquiryData.status === 'pending'
          }
        });

        setLoading(false);
      } catch (error) {
        console.error('Error loading enquiry:', error);
        alert('Failed to load enquiry details. Please try again.');
        navigate('/user/enquiries');
      }
    };

    loadEnquiry();
  }, [enquiryId, navigate]);

  if (loading || !enquiry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading enquiry details...</p>
        </div>
      </div>
    );
  }

  const handleRequestToBook = async () => {
    try {
      await enquiryService.updateEnquiryStatus(enquiryId, 'confirmed');

      // Update local state
      setEnquiry(prev => ({
        ...prev,
        event: { ...prev.event, status: 'confirmed' },
        offer: { ...prev.offer, available: false, canBook: false, canDecline: false }
      }));

      alert('Booking confirmed!');
    } catch (error) {
      console.error('Error confirming booking:', error);
      alert('Failed to confirm booking. Please try again.');
    }
  };

  const handleDecline = async () => {
    if (window.confirm('Are you sure you want to decline this offer?')) {
      try {
        await enquiryService.updateEnquiryStatus(enquiryId, 'declined');

        // Update local state
        setEnquiry(prev => ({
          ...prev,
          event: { ...prev.event, status: 'declined' },
          offer: { ...prev.offer, available: false, canBook: false, canDecline: false }
        }));

        alert('Offer declined');
      } catch (error) {
        console.error('Error declining offer:', error);
        alert('Failed to decline offer. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <UserHeader />
      
      <div className="flex-1 pt-16 pb-0 flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col overflow-hidden">
          {/* Back Button */}
          <button
            onClick={() => navigate('/user/enquiries')}
            className="flex items-center text-teal-600 hover:text-teal-700 mb-4 font-medium flex-shrink-0"
          >
            <FaArrowLeft className="mr-2" />
            All Enquiries
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
            {/* Left Column - Chat Section */}
            <div className="lg:col-span-2 flex flex-col min-h-0">
              {/* Action Banner */}
              {enquiry.offer.available && (
                <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex-shrink-0">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base font-semibold text-gray-900 flex items-center">
                        Book now to secure this date
                        <span className="ml-2 text-sm">ℹ️</span>
                      </h2>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={handleRequestToBook}
                        className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm"
                      >
                        Request to book
                      </button>
                      <button
                        onClick={handleDecline}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Independent Chat Component */}
              <EnquiryChat 
                enquiryId={enquiryId}
                userType="customer"
                enableFileUpload={true}
                className="flex-1"
                enquirySummary={
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-teal-600 text-sm">📋</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        Zubair Farooq sent an enquiry
                      </p>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <FaUsers className="mr-2 text-gray-400" size={12} />
                          {enquiry.event.type} • {enquiry.event.guests} guests • {enquiry.event.layout}
                        </div>
                        <div className="flex items-center">
                          <FaCalendar className="mr-2 text-gray-400" size={12} />
                          {enquiry.venue.name} at {enquiry.venue.location}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-2 text-gray-400" size={12} />
                          {enquiry.event.date} at {enquiry.event.time}
                        </div>
                        <div className="flex items-center">
                          <FaCheckCircle className="mr-2 text-gray-400" size={12} />
                          Catering {enquiry.event.catering.toLowerCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>

            {/* Right Column - Venue Details */}
            <div className="lg:col-span-1 min-h-0">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full flex flex-col">
                <div className="overflow-y-auto flex-1">
                  {/* Venue Image */}
                  <div className="relative h-40 flex-shrink-0">
                    <img
                      src={enquiry.venue.image}
                      alt={enquiry.venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md flex items-center shadow-sm">
                      <FaStar className="text-yellow-400 mr-1" size={14} />
                      <span className="font-medium text-sm">
                        {enquiry.venue.rating} ({enquiry.venue.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Venue Info */}
                  <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {enquiry.venue.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{enquiry.venue.location}</p>

                  {/* Contact */}
                  <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-600 font-medium">
                        {enquiry.venue.contact.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {enquiry.venue.contact.name}
                      </p>
                      <a
                        href={`tel:${enquiry.venue.contact.phone}`}
                        className="text-sm text-teal-600 hover:text-teal-700 flex items-center"
                      >
                        <FaPhone className="mr-1" size={12} />
                        {enquiry.venue.contact.phone}
                      </a>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      {enquiry.event.type} for {enquiry.event.guests} guests
                    </h4>
                    
                    <div className="flex items-start text-xs">
                      <FaCalendar className="mr-2 text-gray-400 mt-1 flex-shrink-0" size={12} />
                      <div>
                        <p className="font-medium text-gray-900">{enquiry.event.date}</p>
                        <p className="text-amber-600 text-xs mt-1 inline-flex items-center bg-amber-50 px-2 py-0.5 rounded">
                          Popular date
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-600">
                      <FaClock className="mr-2 text-gray-400 flex-shrink-0" size={12} />
                      <span>{enquiry.event.time}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Communication Warning */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <span className="text-base">💡</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-gray-900 mb-0.5">
                          Always communicate through Tagvenue
                        </p>
                        <p className="text-xs text-gray-600">
                          Keep all communication on Tagvenue until the booking is confirmed. This will allow us to easily help if needed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetail;
