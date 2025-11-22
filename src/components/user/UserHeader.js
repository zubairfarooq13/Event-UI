import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaBell, FaHeart, FaUserCircle, FaSignOutAlt, FaCog } from 'react-icons/fa';

const UserHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);

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
    return user?.name || user?.email || 'User';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/user/enquiries" className="flex items-center">
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
                className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={isUserMenuOpen}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUserCircle size={32} className="text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:inline">
                  {getUserDisplayName()}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200">
                  <div className="py-1">
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaUserCircle className="mr-3 text-gray-400" size={16} />
                      My Profile
                    </Link>

                    <Link
                      to="/user/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaCog className="mr-3 text-gray-400" size={16} />
                      Settings
                    </Link>

                    <div className="border-t border-gray-200 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3 text-gray-400" size={16} />
                      Log out
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
