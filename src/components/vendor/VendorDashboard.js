import React, { useState } from 'react';
import VendorSidebar from './VendorSidebar';
import VendorDashboardHome from './VendorDashboardHome';
import VendorPhotos from './VendorPhotos';
import VendorPackages from './VendorPackages';
import VendorAvailability from './VendorAvailability';
import VendorBookings from './VendorBookings';

const VendorDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback
      console.log('Vendor logout');
      alert('Logging out...');
    }
  };

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <VendorDashboardHome />;
      case 'photos':
        return <VendorPhotos />;
      case 'packages':
        return <VendorPackages />;
      case 'availability':
        return <VendorAvailability />;
      case 'bookings':
        return <VendorBookings />;
      default:
        return <VendorDashboardHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top padding for mobile to account for hamburger menu */}
        <div className="lg:hidden h-16"></div>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;