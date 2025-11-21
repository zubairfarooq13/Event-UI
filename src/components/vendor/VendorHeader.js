import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaBell, 
  FaCalendarCheck, 
  FaUsers, 
  FaBuilding, 
  FaChartBar,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUser
} from 'react-icons/fa';

const VendorHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
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
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div className="py-2">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {user?.email || 'Vendor Account'}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <button
                      onClick={() => {
                        navigate('/vendor/profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaUser className="mr-3 text-gray-400" size={14} />
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate('/vendor/settings');
                        setIsUserMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaCog className="mr-3 text-gray-400" size={14} />
                      Settings
                    </button>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3 text-red-500" size={14} />
                      Logout
                    </button>
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
