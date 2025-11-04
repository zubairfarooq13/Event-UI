import React, { useState } from 'react';

const BookingSidebar = ({ 
  host = {},
  responseRate = '99%',
  responseTime = '1 hour',
  onRequestBooking
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const hostData = {
    name: host.name || 'James D.',
    initials: host.initials || 'JD',
    avatar: host.avatar,
    ...host
  };

  return (
    <div className="sticky top-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        {/* Host Information */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
            {hostData.avatar ? (
              <img src={hostData.avatar} alt={hostData.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-teal-700 font-semibold">{hostData.initials}</span>
            )}
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">Hosted by</div>
            <div className="text-gray-600">{hostData.name}</div>
          </div>
        </div>

        {/* Response Stats */}
        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Response rate</span>
            <span className="font-semibold text-gray-900">{responseRate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Response time</span>
            <span className="font-semibold text-gray-900">~ {responseTime}</span>
          </div>
        </div>

        {/* Quick Booking Form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Choose a time slot</option>
              <option value="morning">Morning (8:00 - 12:00)</option>
              <option value="afternoon">Afternoon (12:00 - 18:00)</option>
              <option value="evening">Evening (18:00 - 23:00)</option>
              <option value="fullday">Full Day (8:00 - 23:00)</option>
            </select>
          </div>
        </div>

        {/* Request to Book Button */}
        <button
          onClick={onRequestBooking}
          className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold mb-3"
        >
          Request to book
        </button>

        {/* Contact Button */}
        <button
          className="w-full border border-teal-600 text-teal-600 py-3 rounded-lg hover:bg-teal-50 transition-colors font-semibold"
        >
          Contact venue
        </button>

        {/* Info Text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          You won't be charged yet
        </p>
      </div>

      {/* Safety Notice */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mt-4">
        <h4 className="font-semibold text-gray-900 mb-2">Important Notice</h4>
        <p className="text-xs text-gray-600">
          To protect your payment, always communicate and pay through TagVenue platform. 
          Never transfer money or communicate outside of the platform.
        </p>
      </div>
    </div>
  );
};

export default BookingSidebar;
