import React from 'react';
import { FaUser, FaCalendarAlt, FaDollarSign, FaUsers } from 'react-icons/fa';
import BookingStatusBadge from './BookingStatusBadge';
import BookingActionButtons from './BookingActionButtons';

const BookingTable = ({ 
  bookings, 
  onAcceptBooking, 
  onRejectBooking, 
  onViewBooking,
  isLoading = false,
  loadingBookingId = null,
  loadingAction = null
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FaCalendarAlt className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600">
            You don't have any bookings yet. When customers book your venue, they'll appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Customer</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Package</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Guests</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                {/* Customer */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaUser className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{booking.customerName}</p>
                      <p className="text-sm text-gray-600 truncate">{booking.customerEmail}</p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">{formatDate(booking.date)}</p>
                      <p className="text-xs text-gray-600">{booking.eventType}</p>
                    </div>
                  </div>
                </td>

                {/* Package */}
                <td className="py-4 px-6">
                  <p className="font-medium text-gray-900">{booking.package}</p>
                  <p className="text-sm text-gray-600">{booking.duration} hours</p>
                </td>

                {/* Guests */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <FaUsers className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-gray-900">{booking.guests}</span>
                  </div>
                </td>

                {/* Amount */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="w-3 h-3 text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(booking.amount)}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-4 px-6">
                  <BookingStatusBadge status={booking.status} />
                </td>

                {/* Actions */}
                <td className="py-4 px-6">
                  <BookingActionButtons
                    booking={booking}
                    onAccept={onAcceptBooking}
                    onReject={onRejectBooking}
                    onView={onViewBooking}
                    isLoading={isLoading && loadingBookingId === booking.id}
                    loadingAction={loadingAction}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden">
        <div className="divide-y divide-gray-200">
          {bookings.map((booking) => (
            <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 truncate">{booking.customerName}</p>
                    <p className="text-sm text-gray-600 truncate">{booking.customerEmail}</p>
                  </div>
                </div>
                <BookingStatusBadge status={booking.status} size="small" />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendarAlt className="w-3 h-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">Date</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatDate(booking.date)}</p>
                  <p className="text-xs text-gray-600">{booking.eventType}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaDollarSign className="w-3 h-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">Amount</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(booking.amount)}</p>
                </div>

                <div>
                  <span className="text-xs font-medium text-gray-600">Package</span>
                  <p className="text-sm font-medium text-gray-900">{booking.package}</p>
                  <p className="text-xs text-gray-600">{booking.duration} hours</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FaUsers className="w-3 h-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">Guests</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{booking.guests}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end pt-3 border-t border-gray-100">
                <BookingActionButtons
                  booking={booking}
                  onAccept={onAcceptBooking}
                  onReject={onRejectBooking}
                  onView={onViewBooking}
                  isLoading={isLoading && loadingBookingId === booking.id}
                  loadingAction={loadingAction}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingTable;