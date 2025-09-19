import React from 'react';
import { FaCalendarCheck, FaCalendarTimes, FaClock } from 'react-icons/fa';

const VendorAvailability = () => {
  // Dummy availability data
  const availableDates = [
    { date: '2025-09-25', status: 'available' },
    { date: '2025-09-26', status: 'booked' },
    { date: '2025-09-27', status: 'available' },
    { date: '2025-09-28', status: 'maintenance' },
    { date: '2025-09-29', status: 'available' },
    { date: '2025-09-30', status: 'booked' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'booked': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <FaCalendarCheck className="text-green-600" />;
      case 'booked': return <FaCalendarTimes className="text-red-600" />;
      case 'maintenance': return <FaClock className="text-yellow-600" />;
      default: return <FaCalendarCheck className="text-gray-600" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
          <p className="text-gray-600 mt-1">Manage your venue availability</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          Update Calendar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Dates</h3>
        <div className="space-y-3">
          {availableDates.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                {getStatusIcon(item.status)}
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(item.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorAvailability;