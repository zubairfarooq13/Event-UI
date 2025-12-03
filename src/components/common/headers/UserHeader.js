import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import ROLES from '../../../constants/roles';
import { FaBell, FaHeart, FaUserCircle, FaSignOutAlt, FaExchangeAlt, FaUser, FaChevronDown } from 'react-icons/fa';

const UserHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSwitchToVendor = async () => {
    setIsUserMenuOpen(false);
    
    try {
      const result = await switchRole(ROLES.VENDOR);
      
      if (result.success) {
        // Navigate to vendor dashboard
        navigate('/vendor/dashboard');
        // Reload to refresh the UI with new role
        window.location.reload();
      } else if (result.needsSignup) {
        // No vendor account found, redirect to signup
        if (window.confirm(result.error || 'No vendor account found. Would you like to create one?')) {
          navigate('/vendor/add-space');
        }
      } else {
        alert(result.error || 'Failed to switch to vendor dashboard.');
      }
    } catch (error) {
      console.error('Error switching to vendor:', error);
      alert('Failed to switch to vendor dashboard. Please try again.');
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
    return user?.name || user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = user?.name || user?.email || 'U';
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              <div className="bg-teal-500 rounded-sm"></div>
              <div className="bg-teal-600 rounded-sm"></div>
              <div className="bg-teal-400 rounded-sm"></div>
              <div className="bg-teal-500 rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-800 ml-2">tagvenue</span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-6">
            {/* My enquiries link */}
            <Link
              to="/user/enquiries"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaBell size={18} />
              <span className="text-sm font-medium hidden sm:inline">My enquiries</span>
            </Link>

            {/* Favourites link */}
            <Link
              to="/user/favourites"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaHeart size={18} />
              <span className="text-sm font-medium hidden sm:inline">Favourites</span>
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {getUserInitials()}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  {getUserDisplayName()}
                </span>
                <FaChevronDown className="text-gray-400 text-xs hidden md:inline" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <Link
                    to="/user/account"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaUser className="mr-3 text-gray-400" size={16} />
                    My Account
                  </Link>

                  <div className="border-t border-gray-200 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FaSignOutAlt className="mr-3 text-gray-400" size={16} />
                    Logout
                  </button>

                  <div className="border-t border-gray-200 my-1"></div>

                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500 mb-2">Switch to</p>
                    <button
                      onClick={handleSwitchToVendor}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <FaExchangeAlt className="mr-2 text-gray-400" size={14} />
                      Vendor Dashboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
