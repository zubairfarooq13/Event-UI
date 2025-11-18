import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaBuilding } from 'react-icons/fa';

const LandingHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 h-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="5" height="5" fill="#00C9A7" />
            <rect x="9" y="2" width="5" height="5" fill="#00C9A7" />
            <rect x="16" y="2" width="5" height="5" fill="#00C9A7" />
            <rect x="23" y="2" width="5" height="5" fill="#00C9A7" />
            <rect x="2" y="9" width="5" height="5" fill="#00C9A7" />
            <rect x="9" y="9" width="5" height="5" fill="#00C9A7" />
            <rect x="16" y="9" width="5" height="5" fill="#00C9A7" />
            <rect x="23" y="9" width="5" height="5" fill="#00C9A7" />
            <rect x="2" y="16" width="5" height="5" fill="#00C9A7" />
            <rect x="9" y="16" width="5" height="5" fill="#00C9A7" />
            <rect x="16" y="16" width="5" height="5" fill="#00C9A7" />
            <rect x="23" y="16" width="5" height="5" fill="#00C9A7" />
            <rect x="2" y="23" width="5" height="5" fill="#00C9A7" />
            <rect x="9" y="23" width="5" height="5" fill="#00C9A7" />
            <rect x="16" y="23" width="5" height="5" fill="#00C9A7" />
            <rect x="23" y="23" width="5" height="5" fill="#00C9A7" />
          </svg>
          <span className="text-xl font-bold text-gray-900">VenueBooker</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link 
            to="/login" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaUser className="w-4 h-4" />
            <span className="text-sm font-medium">Log in</span>
          </Link>
          <Link 
            to="/list-your-venue" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <FaBuilding className="w-4 h-4" />
            <span className="text-sm font-medium">List your venue</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
