import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import ROLES from '../../../constants/roles';
import { 
  FaBell, 
  FaCalendarCheck, 
  FaUsers, 
  FaBuilding, 
  FaChartBar,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUser,
  FaQuestionCircle
} from 'react-icons/fa';

const VendorHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  const navigationItems = [
    { 
      key: 'enquiries', 
      label: 'My Enquiries', 
      icon: FaBell, 
      path: '/vendor/enquiries' 
    },
    { 
      key: 'availability', 
      label: 'Availability', 
      icon: FaCalendarCheck, 
      path: '/vendor/availability' 
    },
    { 
      key: 'team', 
      label: 'Team Members', 
      icon: FaUsers, 
      path: '/vendor/team' 
    },
    { 
      key: 'venues', 
      label: 'Edit Venues', 
      icon: FaBuilding, 
      path: '/vendor/spaces' 
    },
    { 
      key: 'reports', 
      label: 'Reports', 
      icon: FaChartBar, 
      path: '/vendor/reports' 
    }
  ];

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSwitchToCustomer = async () => {
    setIsUserMenuOpen(false);
    
    try {
      const result = await switchRole(ROLES.CUSTOMER);
      
      if (result.success) {
        // Navigate to user dashboard
        navigate('/user/enquiries');
        // Reload to refresh the UI with new role
        window.location.reload();
      } else if (result.needsSignup) {
        // No customer account found, redirect to signup
        if (window.confirm(result.error || 'No customer account found. Would you like to create one?')) {
          navigate('/signup/user');
        }
      } else {
        alert(result.error || 'Failed to switch to customer dashboard.');
      }
    } catch (error) {
      console.error('Error switching to customer:', error);
      alert('Failed to switch to customer dashboard. Please try again.');
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getUserDisplayName = () => {
    return user?.name || user?.email || 'Vendor';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-1">
              {/* Tagvenue-style logo grid */}
              <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                <div className="bg-teal-500 rounded-sm"></div>
                <div className="bg-teal-600 rounded-sm"></div>
                <div className="bg-teal-400 rounded-sm"></div>
                <div className="bg-teal-500 rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-gray-800 ml-2">VenueBooker</span>
            </div>
          </div>

          {/* Navigation Items - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <button
                  key={item.key}
                  onClick={() => navigate(item.path)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
                    transition-colors duration-200
                    ${isActive 
                      ? 'text-teal-600 bg-teal-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon size={16} className={isActive ? 'text-teal-600' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="flex items-center">
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUserCircle size={36} className="text-gray-400" />
                </div>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200">
                  <div className="py-1">
                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        navigate('/vendor/settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaCog className="mr-3 text-gray-400" size={16} />
                      Settings
                    </button>

                    <button
                      onClick={() => {
                        navigate('/vendor/account');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaUser className="mr-3 text-gray-400" size={16} />
                      My account
                    </button>

                    <button
                      onClick={() => {
                        navigate('/vendor/help');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaQuestionCircle className="mr-3 text-gray-400" size={16} />
                      Help Centre
                    </button>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3 text-gray-400" size={16} />
                      Log out
                    </button>

                    <div className="border-t border-gray-200 my-2"></div>

                    {/* Switch to section */}
                    <div className="px-4 py-2">
                      <p className="text-xs text-gray-500 mb-2">Switch to</p>
                      
                      <button
                        onClick={handleSwitchToCustomer}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
                      >
                        <div className="w-4 h-4 mr-3 border-2 border-gray-300 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-transparent rounded-full"></div>
                        </div>
                        User Account
                      </button>

                      <button
                        className="flex items-center w-full px-3 py-2 text-sm text-teal-600 bg-teal-50 rounded-md mt-1"
                      >
                        <div className="w-4 h-4 mr-3 border-2 border-teal-600 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-teal-600 rounded-full"></div>
                        </div>
                        Venue Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Bottom Sheet Style */}
      <div className="lg:hidden border-t border-gray-200 overflow-x-auto">
        <nav className="flex space-x-1 px-2 py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActivePath(item.path);
            
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={`
                  flex flex-col items-center justify-center min-w-[80px] px-3 py-2 rounded-lg text-xs font-medium
                  transition-colors duration-200
                  ${isActive 
                    ? 'text-teal-600 bg-teal-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={18} className={`mb-1 ${isActive ? 'text-teal-600' : 'text-gray-400'}`} />
                <span className="truncate w-full text-center">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default VendorHeader;
