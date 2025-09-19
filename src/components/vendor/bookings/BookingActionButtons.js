import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaSpinner } from 'react-icons/fa';

const BookingActionButtons = ({ 
  booking, 
  onAccept, 
  onReject, 
  onView,
  isLoading = false,
  loadingAction = null
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(null);

  const handleAccept = () => {
    if (onAccept) {
      onAccept(booking.id);
    }
    setShowConfirmDialog(null);
  };

  const handleReject = () => {
    if (onReject) {
      onReject(booking.id);
    }
    setShowConfirmDialog(null);
  };

  const handleView = () => {
    if (onView) {
      onView(booking);
    }
  };

  const isActionLoading = (action) => {
    return isLoading && loadingAction === action;
  };

  // Don't show accept/reject for non-pending bookings
  const showStatusActions = booking.status?.toLowerCase() === 'pending';

  return (
    <div className="flex items-center gap-2">
      {/* View Button - Always visible */}
      <button
        onClick={handleView}
        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        title="View Details"
      >
        <FaEye className="w-4 h-4" />
      </button>

      {/* Accept/Reject Buttons - Only for pending bookings */}
      {showStatusActions && (
        <>
          {/* Accept Button */}
          <button
            onClick={() => setShowConfirmDialog('accept')}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Accept Booking"
          >
            {isActionLoading('accept') ? (
              <FaSpinner className="w-4 h-4 animate-spin" />
            ) : (
              <FaCheck className="w-4 h-4" />
            )}
          </button>

          {/* Reject Button */}
          <button
            onClick={() => setShowConfirmDialog('reject')}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Reject Booking"
          >
            {isActionLoading('reject') ? (
              <FaSpinner className="w-4 h-4 animate-spin" />
            ) : (
              <FaTimes className="w-4 h-4" />
            )}
          </button>
        </>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  showConfirmDialog === 'accept' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {showConfirmDialog === 'accept' ? (
                    <FaCheck className="w-5 h-5 text-green-600" />
                  ) : (
                    <FaTimes className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {showConfirmDialog === 'accept' ? 'Accept Booking' : 'Reject Booking'}
                  </h3>
                  <p className="text-gray-600">
                    Are you sure you want to {showConfirmDialog} this booking?
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <div className="font-medium text-gray-900">{booking.customerName}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <div className="font-medium text-gray-900">
                      {new Date(booking.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Package:</span>
                    <div className="font-medium text-gray-900">{booking.package}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Amount:</span>
                    <div className="font-medium text-gray-900">${booking.amount?.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Warning Message */}
              <div className={`p-3 rounded-lg mb-4 ${
                showConfirmDialog === 'accept' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <p className={`text-sm ${
                  showConfirmDialog === 'accept' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {showConfirmDialog === 'accept' 
                    ? 'Accepting this booking will confirm the venue for the selected date and send a confirmation to the customer.'
                    : 'Rejecting this booking will decline the request and notify the customer. This action cannot be undone.'
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirmDialog(null)}
                  disabled={isLoading}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={showConfirmDialog === 'accept' ? handleAccept : handleReject}
                  disabled={isLoading}
                  className={`px-4 py-2 text-white rounded-lg font-medium disabled:opacity-50 transition-colors duration-200 ${
                    showConfirmDialog === 'accept'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      {showConfirmDialog === 'accept' ? 'Accepting...' : 'Rejecting...'}
                    </div>
                  ) : (
                    showConfirmDialog === 'accept' ? 'Accept Booking' : 'Reject Booking'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingActionButtons;