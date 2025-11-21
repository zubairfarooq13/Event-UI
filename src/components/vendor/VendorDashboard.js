import React from 'react';
import VendorHeader from './VendorHeader';
import VendorDashboardHome from './VendorDashboardHome';

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vendor Header */}
      <VendorHeader />

      <div className="pt-16">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <VendorDashboardHome />
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;