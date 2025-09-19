import React, { useState } from 'react';
import { 
  FaTachometerAlt, 
  FaImages, 
  FaBox, 
  FaCalendarCheck, 
  FaBookOpen, 
  FaSignOutAlt, 
  FaBars, 
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const VendorSidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { 
      key: 'dashboard', 
      label: 'Dashboard', 
      icon: FaTachometerAlt, 
      color: 'text-blue-600' 
    },
    { 
      key: 'photos', 
      label: 'Photos', 
      icon: FaImages, 
      color: 'text-green-600' 
    },
    { 
      key: 'packages', 
      label: 'Packages', 
      icon: FaBox, 
      color: 'text-purple-600' 
    },
    { 
      key: 'availability', 
      label: 'Availability', 
      icon: FaCalendarCheck, 
      color: 'text-orange-600' 
    },
    { 
      key: 'bookings', 
      label: 'Bookings', 
      icon: FaBookOpen, 
      color: 'text-indigo-600' 
    }
  ];

  const handleNavigation = (key) => {
    setActiveTab(key);
    setIsOpen(false); // Close mobile menu after selection
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white p-2 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Vendor Panel</h2>
                <p className="text-xs text-gray-500">Manage your venue</p>
              </div>
            </div>
          )}
          
          {/* Collapse Button - Desktop Only */}
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <FaChevronRight size={14} className="text-gray-500" />
            ) : (
              <FaChevronLeft size={14} className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavigation(item.key)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left
                    transition-colors duration-200 group
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon 
                    size={20} 
                    className={`
                      flex-shrink-0 transition-colors duration-200
                      ${isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'}
                    `} 
                  />
                  {!isCollapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-2 right-2">
          <button
            onClick={onLogout}
            className={`
              w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left
              text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200
              group
            `}
          >
            <FaSignOutAlt 
              size={20} 
              className="flex-shrink-0 text-red-500 group-hover:text-red-600" 
            />
            {!isCollapsed && (
              <span className="font-medium">Logout</span>
            )}
          </button>
        </div>

        {/* Collapsed State Tooltip */}
        {isCollapsed && (
          <div className="hidden lg:block absolute top-16 left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Use collapse button to expand
          </div>
        )}
      </div>
    </>
  );
};

export default VendorSidebar;