import React, { useState } from 'react';
import VendorHeader from '../../common/headers/VendorHeader';
import { FaUsers, FaBuilding, FaTag, FaCrown } from 'react-icons/fa';
import TeamMembersTab from './TeamMembersTab';
import CompanyDetailsTab from './CompanyDetailsTab';
import EnquiryLabelsTab from './EnquiryLabelsTab';
import ProPlansTab from './ProPlansTab';

const VendorSettings = () => {
  const [activeTab, setActiveTab] = useState('team-members');

  const tabs = [
    { id: 'team-members', label: 'Team members', icon: FaUsers },
    { id: 'company-details', label: 'Company details', icon: FaBuilding },
    { id: 'enquiry-labels', label: 'Enquiry labels', icon: FaTag },
    { id: 'pro-plans', label: 'Pro Plans', icon: FaCrown, isPro: true }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'team-members':
        return <TeamMembersTab />;
      case 'company-details':
        return <CompanyDetailsTab />;
      case 'enquiry-labels':
        return <EnquiryLabelsTab />;
      case 'pro-plans':
        return <ProPlansTab />;
      default:
        return <TeamMembersTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <VendorHeader />
      
      <div className="pt-16">
        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm
                      transition-colors duration-200
                      ${isActive
                        ? 'border-teal-600 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon size={16} className={isActive ? 'text-teal-600' : 'text-gray-400'} />
                    <span>{tab.label}</span>
                    {tab.isPro && (
                      <span className="ml-1 px-2 py-0.5 text-xs font-semibold text-teal-700 bg-teal-100 rounded">
                        PRO
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default VendorSettings;
