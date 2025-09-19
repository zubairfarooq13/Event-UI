import React from 'react';
import { 
  FaBookOpen, 
  FaUser, 
  FaCalendarAlt, 
  FaRupeeSign, 
  FaEye,
  FaCheck,
  FaTimes,
  FaClock
} from 'react-icons/fa';

const VendorBookings = () => {
  // Dummy bookings data
  const bookings = [
    {
      id: 1,
      customerName: 'Ahmed Khan',
      eventType: 'Wedding',
      date: '2025-10-15',
      guests: 500,
      amount: 500000,
      status: 'confirmed',
      package: 'Wedding Premium'
    },
    {
      id: 2,
      customerName: 'Sara Ali',
      eventType: 'Birthday Party',
      date: '2025-09-28',
      guests: 100,
      amount: 75000,
      status: 'pending',
      package: 'Birthday Special'
    },
    {
      id: 3,
      customerName: 'Tech Corp Ltd',
      eventType: 'Corporate Event',
      date: '2025-10-05',
      guests: 200,
      amount: 150000,
      status: 'confirmed',
      package: 'Corporate Event'
    },
    {
      id: 4,
      customerName: 'Fatima Sheikh',
      eventType: 'Anniversary',
      date: '2025-09-22',
      guests: 150,
      amount: 120000,
      status: 'rejected',
      package: 'Custom Package'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <FaCheck className="text-green-600" />;
      case 'pending': return <FaClock className="text-yellow-600" />;
      case 'rejected': return <FaTimes className="text-red-600" />;
      default: return <FaClock className="text-gray-600" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage your venue bookings</p>
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>All Status</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Event</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Guests</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-6 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <FaUser className="text-primary-600" size={14} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.package}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">{booking.eventType}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" size={14} />
                      <span className="text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900">{booking.guests}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <FaRupeeSign className="text-gray-400" size={12} />
                      <span className="font-semibold text-gray-900">
                        {booking.amount.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(booking.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
                        <FaEye size={14} />
                      </button>
                      {booking.status === 'pending' && (
                        <>
                          <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                            <FaCheck size={14} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <FaTimes size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorBookings;