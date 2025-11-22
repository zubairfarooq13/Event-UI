import React, { useState } from 'react';
import VendorHeader from '../VendorHeader';
import AccountDetailsTab from './AccountDetailsTab';
import NotificationsTab from '../Notifications/NotificationsTab';

const VendorAccount = () => {
  const [activeTab, setActiveTab] = useState('account-details');

  const tabs = [
    { id: 'account-details', label: 'Account details' },
    { id: 'notifications', label: 'Notifications' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account-details':
        return <AccountDetailsTab />;
      case 'notifications':
        return <NotificationsTab />;
      default:
        return <AccountDetailsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="pt-16">
        {/* Side Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Left Sidebar */}
            <div className="w-64 flex-shrink-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        w-full text-left px-4 py-2 text-sm font-medium rounded-lg
                        transition-colors duration-200
                        ${isActive
                          ? 'text-teal-600 bg-teal-50 border-l-4 border-teal-600'
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAccount;
