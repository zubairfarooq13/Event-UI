import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import UserHeader from '../common/headers/UserHeader';
import { FaArrowLeft, FaCalendar, FaClock, FaUsers, FaPaperclip, FaPaperPlane, FaStar, FaPhone, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { enquiryService } from '../../services';

const EnquiryDetail = () => {
  const { enquiryId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    // Load enquiry data from API
    const loadEnquiry = async () => {
      try {
        // Fetch enquiry details using service
        const enquiryData = await enquiryService.getEnquiryById(enquiryId);

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

        // Fetch messages using service
        try {
          const messagesData = await enquiryService.getEnquiryMessages(enquiryId);
          
          // Transform messages to match component format
          const formattedMessages = messagesData.messages?.map(msg => ({
            id: msg.id,
            sender: msg.sender_type, // 'user' or 'vendor'
            senderName: msg.sender_name,
            text: msg.message,
            timestamp: new Date(msg.created_at).toLocaleString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }),
            avatar: msg.sender_avatar || null,
            attachments: msg.attachments || []
          })) || [];

          setMessages(formattedMessages);

          // Mark messages as read
          if (formattedMessages.length > 0) {
            enquiryService.markMessagesAsRead(enquiryId)
              .catch(err => console.error('Error marking messages as read:', err));
          }
        } catch (msgError) {
          console.error('Error loading messages:', msgError);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading enquiry:', error);
        alert('Failed to load enquiry details. Please try again.');
        navigate('/user/enquiries');
      }
    };

    loadEnquiry();

    // Poll for new messages every 5 seconds
    const pollInterval = setInterval(async () => {
      try {
        const messagesData = await enquiryService.getEnquiryMessages(enquiryId);
          
        const formattedMessages = messagesData.messages?.map(msg => ({
          id: msg.id,
          sender: msg.sender_type,
          senderName: msg.sender_name,
          text: msg.message,
          timestamp: new Date(msg.created_at).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          avatar: msg.sender_avatar || null,
          attachments: msg.attachments || []
        })) || [];

        // Only update if there are new messages
        setMessages(prevMessages => {
          if (JSON.stringify(prevMessages) !== JSON.stringify(formattedMessages)) {
            // Mark new messages as read
            enquiryService.markMessagesAsRead(enquiryId)
              .catch(err => console.error('Error marking messages as read:', err));
            
            return formattedMessages;
          }
          return prevMessages;
        });
      } catch (error) {
        console.error('Error polling messages:', error);
      }
    }, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(pollInterval);
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

  const handleSendMessage = async (e, customMessage = null) => {
    e.preventDefault();
    const messageText = customMessage || message.trim();
    if (messageText) {
      try {
        const data = await enquiryService.sendMessage(enquiryId, messageText);

        // Add new message to UI
        const newMessage = {
          id: data.message_id || data.id,
          sender: 'user',
          senderName: 'You',
          text: messageText,
          timestamp: new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          avatar: null,
          attachments: []
        };
        
        setMessages([...messages, newMessage]);
        if (!customMessage) setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    }
  };

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
    // Handle decline
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const data = await enquiryService.uploadAttachment(enquiryId, file);

      // Send message with attachment info
      const attachmentMessage = `📎 ${file.name}`;
      await handleSendMessage({ preventDefault: () => {} }, attachmentMessage);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploadingFile(false);
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

              {/* Chat Container with messages and input */}
              <div className="bg-white rounded-lg border border-gray-200 flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Messages Container with scroll */}
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                  <div className="p-6 space-y-4 min-h-full">
                  {/* Initial Enquiry Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
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
                  </div>

                  {/* Chat Messages */}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        {msg.sender === 'vendor' && (
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                              <span className="text-gray-600 text-sm font-medium">
                                {msg.senderName.charAt(0)}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {msg.senderName}
                            </span>
                          </div>
                        )}
                        <div
                          className={`rounded-lg px-4 py-3 ${
                            msg.sender === 'user'
                              ? 'bg-teal-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input - Static at bottom */}
                <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-white">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingFile}
                      className="p-3 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                      title="Attach file"
                    >
                      <FaPaperclip size={20} />
                    </button>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message"
                      rows="2"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPaperPlane size={18} />
                    </button>
                  </form>
                  {uploadingFile && (
                    <p className="text-xs text-gray-500 mt-2">Uploading file...</p>
                  )}
                </div>
              </div>
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
