import React from 'react';
import AvailabilityCalendar from './availability/AvailabilityCalendar';

const VendorAvailability = () => {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Availability Management</h1>
        <p className="text-gray-600 mt-1">
          Click on dates to toggle between available (green) and unavailable (red)
        </p>
      </div>

      {/* Calendar Component */}
      <AvailabilityCalendar />
    </div>
  );
};

export default VendorAvailability;